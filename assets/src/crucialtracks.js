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

function extractQuestionContent(html) {
  // Create a DOM parser to read the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Check for the specific div used in Q&A posts
  const contentDiv = doc.querySelector("div");
  // If no div is found, search in the main body, this handles both cases
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
        questionParagraph.innerHTML,
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

// Main function to fetch and display tracks
async function displayTracks() {
  const listContainer = document.getElementById("tracks");
  if (!listContainer) return;

  setLoadingState(true);

  try {
    const data = await fetchTracksJSON();

    if (!Array.isArray(data)) {
      throw new Error("La respuesta del API no es un arreglo.");
    }

    allItems = data;

    renderPaginatedTracks();
    setupPagination();
  } catch (error) {
    handleError(error);
  }
}

// Fetch tracks JSON from API
async function fetchTracksJSON() {
  const response = await fetch(TRACKS_API);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
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

  list.innerHTML = items
    .map((item, index) => {
      const machineDate = dayjs(item.created).format("YYYY-MM-DD");

      const artworkHTML = item.artwork_url
        ? `<img src="${item.artwork_url}" data-toggle="tooltip" data-placement="top" alt="${item.song}" title="${item.song}" class="track-artwork rounded mb-4 mb-md-0 img-fluid">`
        : "";

      const audioHTML = item.preview_url
        ? `<audio controls><source src="${item.preview_url}" type="audio/mp4">Your browser does not support the audio element.</audio>`
        : "";

      const separator = index < items.length - 1 ? "<hr>" : "";

      return `
        <li class="mb-4">
          <a class="post-date badge badge-dark mb-3" href="${item.link}" target="_blank" rel="noopener">
            <time datetime="${machineDate}">${formatDate(item.created)}</time>
          </a>
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
  currentPage = newPage;
  renderPaginatedTracks();
  setupPagination();
  document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" });
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

  container.innerHTML = `
    <hr>
    <div class="pagination-info" style="margin-bottom: 1rem;">
      Página ${currentPage} de ${totalPages} (${allItems.length} canciones)
    </div>
    <div class="pagination-controls" style="display: flex; justify-content: center; gap: 0.5rem;">
      <button id="prevPage" class="btn btn-primary" aria-label="Anterior" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>
      <button id="nextPage" class="btn btn-primary" aria-label="Siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
    </div>
  `;

  list.parentNode.insertBefore(container, list.nextSibling);

  document.getElementById("prevPage")?.addEventListener("click", () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  });
  document.getElementById("nextPage")?.addEventListener("click", () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  });
}

// Error handling
function handleError(error) {
  console.error("Error:", error);
  const el = document.getElementById("tracks");
  if (el)
    el.innerHTML = `<li>No se pudieron cargar las canciones. Por favor, actualiza la página.</li>`;
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", displayTracks);
