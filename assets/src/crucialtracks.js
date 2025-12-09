// Import and configure dayjs with Spanish (Mexico) locale
const locale_es_mx = require("dayjs/locale/es-mx");
const dayjs = require("dayjs");
dayjs.locale("es-mx");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// Import marked.js and DOMPurify
const { marked } = require("marked");
const DOMPurify = require("dompurify");

// Config
const TRACKS_API = "/api/getCrucialTracks"; // API endpoint
const ITEMS_PER_PAGE = 10; // items per page for pagination

let currentPage = 1;
let allItems = [];

// Function to get page number from URL
function getPageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get("page"), 10);
    return page && page > 0 ? page : 1;
}

// Function to update URL with current page
function updateURL(page) {
    const url = new URL(window.location);
    if (page === 1) {
        url.searchParams.delete("page");
    } else {
        url.searchParams.set("page", page);
    }
    window.history.pushState({ page }, "", url);
}

// Audio player management
let audioPlayers = [];

// Function to extract domain from URL
function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace("www.", "");
    } catch {
        return "link";
    }
}

// Function to get root domain URL
function getRootDomainURL(url) {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}`;
    } catch {
        return url;
    }
}

// Set loading state while fetching
function setLoadingState(isLoading) {
    const element = document.getElementById("tracks");
    if (element && isLoading) {
        element.innerHTML = `
      <li class="loading-state">
        <i class="fas fa-spinner fa-spin"></i> Cargando Crucial Tracks...
      </li>`;
    }
}

// Helper function to decode HTML entities like "&gt;" back to ">"
function decodeHTMLEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}

// Function to check if item has YouTube embed
function hasYouTubeEmbed(item) {
    // Check if note contains YouTube embed
    if (item.note && item.note.includes("youtube.com/embed")) {
        return true;
    }
    // Check if Apple Music fields are missing (indicates non-Apple Music source)
    if (!item.preview_url && !item.artwork_url) {
        return true;
    }
    return false;
}

// Function to extract YouTube embed from note HTML
function extractYouTubeEmbed(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Find the div with the YouTube iframe
    const embedDiv = doc.querySelector('div[style*="position: relative"]');

    if (embedDiv) {
        // Configure DOMPurify to allow iframes and necessary attributes
        const cleanHTML = DOMPurify.sanitize(embedDiv.outerHTML, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: [
                "allow",
                "allowfullscreen",
                "frameborder",
                "scrolling",
                "src",
                "style",
            ],
        });
        return cleanHTML;
    }

    // Fallback: try to find any iframe with youtube.com
    const iframe = doc.querySelector('iframe[src*="youtube.com"]');
    if (iframe) {
        // Create a wrapper div with responsive styling
        const wrapper = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">${iframe.outerHTML}</div>`;
        const cleanHTML = DOMPurify.sanitize(wrapper, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: [
                "allow",
                "allowfullscreen",
                "frameborder",
                "scrolling",
                "src",
                "style",
            ],
        });
        return cleanHTML;
    }

    return null;
}

function extractQuestionContent(html) {
    // Create a DOM parser to read the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // For YouTube posts, skip the first div (which contains the iframe)
    // and look for the second div which contains the content
    const allDivs = doc.querySelectorAll("div");
    let contentDiv = null;

    // Find the div that doesn't contain an iframe (that's our content div)
    for (const div of allDivs) {
        if (!div.querySelector("iframe")) {
            contentDiv = div;
            break;
        }
    }

    // If no content div found, fall back to the original logic
    if (!contentDiv) {
        contentDiv = doc.querySelector("div");
    }

    // If no div is found, search in the main body
    const mainContainer = contentDiv || doc.body;
    const paragraphs = mainContainer.querySelectorAll("p");

    // If paragraphs are found, use a refined logic
    if (paragraphs.length > 0) {
        let questionHTML = "";
        let answerParagraphs = Array.from(paragraphs);

        if (contentDiv) {
            // Question/Answer format
            const questionParagraph = paragraphs[0];
            questionHTML = `<h3>${DOMPurify.sanitize(
                questionParagraph.innerHTML
            )}</h3>`;
            answerParagraphs = answerParagraphs.slice(1);
        }

        let answerHTML = "";
        answerParagraphs.forEach((p) => {
            const encodedContent = p.innerHTML;
            const decodedContent = decodeHTMLEntities(encodedContent);
            const dirtyParsedHTML = marked.parse(decodedContent);
            const cleanParsedHTML = DOMPurify.sanitize(dirtyParsedHTML);
            answerHTML += cleanParsedHTML;
        });

        const finalAnswerHTML = `<div class="crucial-tracks-answer">${answerHTML}</div>`;
        return questionHTML + finalAnswerHTML;
    }
    // If there are NO paragraphs, process the entire container's content
    else {
        const rawContent = mainContainer.innerHTML;

        // If there's no content, show nothing
        if (!rawContent.trim()) {
            return "";
        }

        // Since there are no paragraphs, treat everything as the "answer"
        const decodedContent = decodeHTMLEntities(rawContent);
        const dirtyParsedHTML = marked.parse(decodedContent);
        const cleanParsedHTML = DOMPurify.sanitize(dirtyParsedHTML);

        // Avoid showing an empty paragraph if the content was only whitespace
        if (cleanParsedHTML.trim() === "<p></p>" || !cleanParsedHTML.trim()) {
            return "";
        }

        return `<div class="crucial-tracks-answer">${cleanParsedHTML}</div>`;
    }
}

// Function to pause all other audio players except the current one
function pauseOtherPlayers(currentPlayer) {
    audioPlayers.forEach((player) => {
        if (player !== currentPlayer && !player.paused) {
            player.pause();
        }
    });
}

// Function to setup audio player event listeners
function setupAudioPlayers() {
    // Clear previous references
    audioPlayers = [];

    // Find all audio elements and add event listeners
    const audioElements = document.querySelectorAll("#tracks audio");
    audioElements.forEach((audio) => {
        audioPlayers.push(audio);

        // Remove existing listeners to prevent duplicates
        audio.removeEventListener("play", handleAudioPlay);

        // Add play event listener
        audio.addEventListener("play", handleAudioPlay);
    });
}

// Handle audio play event
function handleAudioPlay(event) {
    pauseOtherPlayers(event.target);
}

// Main function to fetch and display tracks
async function displayTracks() {
    const listContainer = document.getElementById("tracks");
    if (!listContainer) return;

    // Get current page from URL
    currentPage = getPageFromURL();

    setLoadingState(true);

    try {
        const data = await fetchTracksJSON();

        if (!Array.isArray(data)) {
            throw new Error("La respuesta del API no es un arreglo.");
        }

        allItems = data;

        // Validate page number after we know total items
        const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages) {
            currentPage = 1;
            updateURL(currentPage);
        }

        renderPaginatedTracks();
        setupPagination();
        setupAudioPlayers(); // Setup audio player management
    } catch (error) {
        handleError(error);
    }
}

// Fetch tracks JSON from API
async function fetchTracksJSON() {
    const response = await fetch(TRACKS_API);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // The API already returns the transformed data, so just return it
    if (!Array.isArray(data)) {
        console.error("Unexpected API response structure:", data);
        throw new Error("Invalid API response structure");
    }

    return data;
}

// Format date using dayjs
function formatDate(dateString) {
    const date = dayjs(dateString);
    return date.isValid()
        ? date.format("DD MMM, YYYY").toLowerCase()
        : "unknown date";
}

// Render paginated tracks
function renderPaginatedTracks() {
    const list = document.getElementById("tracks");
    if (!list) return;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const items = allItems.slice(startIndex, endIndex);

    const newestItemId = allItems[0]?.id;

    list.innerHTML = items
        .map((item, index) => {
            const machineDate = dayjs(item.created).format("YYYY-MM-DD");
            const isYouTube = hasYouTubeEmbed(item);

            let newBadgeHTML = "";
            if (item.id === newestItemId) {
                newBadgeHTML = `
          <li class="list-inline-item">
            <span class="badge badge-success">
              Canción más reciente
            </span>
          </li>`;
            }

            const separator = index < items.length - 1 ? "<hr>" : "";

            // Render YouTube embed version
            if (isYouTube) {
                const youtubeEmbed = extractYouTubeEmbed(item.note);
                const questionAnswer = extractQuestionContent(item.note);

                return `
        <li class="mb-4">
          <ul class="list-inline mb-3">
            <li class="list-inline-item">
              <a class="post-date badge badge-dark" href="${item.link}" target="_blank" rel="noopener">
                <time datetime="${machineDate}">${formatDate(item.created)}</time>
              </a>
            </li>
            ${newBadgeHTML}
          </ul>
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  ${youtubeEmbed || ""}
                </div>
                <div class="col-12 mt-3">
                  <div class="info">
                    <h2 style="margin: 0 0 0.13em !important;">${item.song}</h2>
                    <p>${item.artist}</p>
                    <p><a href="${item.link}" target="_blank" rel="noopener">Abrir en Crucial Tracks <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8em; margin-left: 0.2em; opacity: 0.7; vertical-align: middle;"></i></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ${questionAnswer}
        </li>
        ${separator}`;
            }

            // Render standard Apple Music version
            const artworkHTML = item.artwork_url
                ? `<img src="${item.artwork_url}" data-toggle="tooltip" data-placement="top" alt="${item.song}" title="${item.song}" class="track-artwork rounded mb-4 mb-md-0 img-fluid">`
                : "";

            const audioHTML = item.preview_url
                ? `<audio controls><source src="${item.preview_url}" type="audio/mp4">Your browser does not support the audio element.</audio>`
                : "";

            return `
        <li class="mb-4">
          <ul class="list-inline mb-3">
            <li class="list-inline-item">
              <a class="post-date badge badge-dark" href="${item.link}" target="_blank" rel="noopener">
                <time datetime="${machineDate}">${formatDate(item.created)}</time>
              </a>
            </li>
            ${newBadgeHTML}
          </ul>
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 col-lg-3">
                  <div class="artwork">
                    <a href="${item.link}" target="_blank" rel="noopener">
                      ${artworkHTML}
                    </a>
                  </div>
                </div>
                <div class="col-md-8 col-lg-9">
                  <div class="info">
                    <h2 style="margin: 0 0 0.13em !important;">${item.song}</h2>
                    <p>${item.artist}</p>
                    ${audioHTML}
                    <p><a href="${item.link}" target="_blank" rel="noopener">Abrir en Crucial Tracks <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8em; margin-left: 0.2em; opacity: 0.7; vertical-align: middle;"></i></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ${extractQuestionContent(item.note)}
        </li>
        ${separator}`;
        })
        .join("");
}

// Handle page navigation
function handlePageChange(newPage) {
    const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);

    // Validate page number
    if (newPage < 1 || newPage > totalPages) {
        return;
    }

    currentPage = newPage;
    updateURL(currentPage);
    renderPaginatedTracks();
    setupPagination();
    setupAudioPlayers(); // Re-setup audio players after pagination
    document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" });
}

// Handle page jump from input
function handlePageJump() {
    const input = document.getElementById("pageJumpInput");
    const page = parseInt(input.value, 10);

    if (!isNaN(page) && page > 0) {
        handlePageChange(page);
    }
}

// Setup pagination buttons
function setupPagination() {
    const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
    const list = document.getElementById("tracks");
    if (!list) return;

    const existing = document.querySelector(".pagination");
    if (existing) existing.remove();

    const container = document.createElement("div");
    container.className = "pagination";
    container.style.textAlign = "center";

    // Check if we're on the last page (page 5)
    const isLastPage = currentPage === totalPages;
    const ctProfileMessage = isLastPage
        ? `
      <div class="card my-4">
        <div class="card-body text-center">
          <p>
            ¡Parece que llegaste al final! Aquí solo muestro las últimas 50 canciones, pero te invito a ir a
            <a href="https://app.crucialtracks.org/profile/mijo?page=6" target="_blank" rel="noopener">mi perfil de Crucial Tracks</a>
            para ver todas las canciones que he compartido.
          </p>
        </div>
      </div>
    `
        : "";

    container.innerHTML = `
    <hr>
    <div class="pagination-info" style="margin-bottom: 1rem;">
      Página ${currentPage} de ${totalPages} (${allItems.length} canciones)
    </div>
    <div class="pagination-controls" style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
      <button id="prevPage" class="btn btn-primary" aria-label="Anterior" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>

      <div style="display: flex; align-items: center; gap: 0.5rem; margin: 0 0.5rem;">
        <label for="pageJumpInput" style="margin: 0; white-space: nowrap;">Ir a página:</label>
        <input
          type="number"
          id="pageJumpInput"
          min="1"
          max="${totalPages}"
          value="${currentPage}"
          style="width: 70px; padding: 0.375rem 0.5rem; border: 1px solid #ced4da; border-radius: 0.25rem;"
          aria-label="Número de página"
        >
        <button id="pageJumpBtn" class="btn btn-primary" aria-label="Ir">Ir</button>
      </div>

      <button id="nextPage" class="btn btn-primary" aria-label="Siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
    </div>
    ${ctProfileMessage}
  `;

    list.parentNode.insertBefore(container, list.nextSibling);

    document.getElementById("prevPage")?.addEventListener("click", () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    });

    document.getElementById("nextPage")?.addEventListener("click", () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    });

    // Page jump button
    document
        .getElementById("pageJumpBtn")
        ?.addEventListener("click", handlePageJump);

    // Allow Enter key in input
    document
        .getElementById("pageJumpInput")
        ?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handlePageJump();
            }
        });
}

// Error handling
function handleError(error) {
    console.error("Error:", error);
    const el = document.getElementById("tracks");
    if (el)
        el.innerHTML = `<li>No se pudieron cargar las canciones. Por favor, actualiza la página.</li>`;
}

// Handle browser back/forward navigation
window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
        currentPage = event.state.page;
    } else {
        currentPage = getPageFromURL();
    }

    // Only re-render if we have data loaded
    if (allItems.length > 0) {
        renderPaginatedTracks();
        setupPagination();
        setupAudioPlayers();
    }
});

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", displayTracks);
