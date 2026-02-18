// Playlist (Crucial Tracks) - With YouTube/Audio Player Sync

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
const TRACKS_API = "/api/getCrucialTracks";
const ITEMS_PER_PAGE = 10;

let currentPage = 1;
let allItems = [];
let originalTitle = document.title;

// Audio and YouTube player management
let audioPlayers = [];
let youtubePlayers = [];
let isChangingTrack = false;
let youtubeAPIReady = false;

// Load YouTube IFrame API
function loadYouTubeAPI() {
    if (window.YT) {
        youtubeAPIReady = true;
        return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// This function is called automatically by YouTube API when ready
window.onYouTubeIframeAPIReady = function () {
    youtubeAPIReady = true;
    console.log("YouTube API ready");
    // Initialize any existing YouTube players
    initializeYouTubePlayers();
};

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
    if (item.note && item.note.includes("youtube.com/embed")) {
        return true;
    }
    if (!item.preview_url && !item.artwork_url) {
        return true;
    }
    return false;
}

// Extract YouTube video ID from iframe src
function extractYouTubeVideoId(iframeSrc) {
    const match = iframeSrc.match(/youtube\.com\/embed\/([^?&]+)/);
    return match ? match[1] : null;
}

// Function to extract YouTube embed from note HTML and make it API-compatible
function extractYouTubeEmbed(html, itemIndex) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const embedDiv = doc.querySelector('div[style*="position: relative"]');
    let iframe = embedDiv ? embedDiv.querySelector("iframe") : null;

    if (!iframe) {
        iframe = doc.querySelector('iframe[src*="youtube.com"]');
    }

    if (iframe) {
        const videoId = extractYouTubeVideoId(iframe.src);
        if (videoId) {
            // Create a unique ID for this player
            const playerId = `youtube-player-${itemIndex}`;

            // Create wrapper with player div
            const wrapper = `
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
                    <div id="${playerId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
                </div>
            `;

            return { html: wrapper, playerId, videoId };
        }
    }

    return null;
}

// Extract the question title. Uses item.content (clean markdown) when available,
// falls back to parsing item.note (raw HTML) if content is empty.
function extractQuestionTitleFromContent(content, noteFallback) {
    // Try clean markdown first
    if (content && content.trim()) {
        const firstLine = content.split("\n")[0].trim();
        const match = firstLine.match(/^_(.+?)_\s*$/);
        if (match) {
            return `<h3><em>${DOMPurify.sanitize(match[1])}</em></h3>`;
        }
    }
    // Fallback: parse note HTML for italic-only first paragraph in content div
    if (noteFallback) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(noteFallback, "text/html");
        // Find the text content div (not an embed wrapper)
        let contentDiv = null;
        for (const div of doc.querySelectorAll("body > div")) {
            if (!div.querySelector("iframe") && !div.style.paddingBottom) {
                contentDiv = div;
                break;
            }
        }
        if (contentDiv) {
            const paras = contentDiv.querySelectorAll("p");
            if (paras.length > 0) {
                const first = paras[0];
                const em = first.querySelector("em");
                if (em && first.textContent.trim() === em.textContent.trim()) {
                    return `<h3><em>${DOMPurify.sanitize(em.innerHTML)}</em></h3>`;
                }
            }
        }
    }
    return "";
}

// Extract the answer body. Uses item.content (clean markdown) when available,
// falls back to parsing item.note (raw HTML) if content is empty.
// Handles: question+answer, question only, answer only, no content at all.
function extractAnswerContentFromContent(content, noteFallback) {
    // Try clean markdown first
    if (content && content.trim()) {
        const lines = content.split("\n");
        const firstLine = lines[0].trim();
        const firstIsQuestion = /^_.+?_\s*$/.test(firstLine);
        const bodyLines = firstIsQuestion ? lines.slice(1) : lines;
        const body = bodyLines.join("\n").trim();
        if (body) {
            const dirty = marked.parse(body);
            const clean = DOMPurify.sanitize(dirty);
            if (clean.trim() && clean.trim() !== "<p></p>") {
                return `<div class="crucial-tracks-answer">${clean}</div>`;
            }
        }
        return "";
    }
    // Fallback: parse note HTML
    if (noteFallback) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(noteFallback, "text/html");
        let contentDiv = null;
        for (const div of doc.querySelectorAll("body > div")) {
            if (!div.querySelector("iframe") && !div.style.paddingBottom) {
                contentDiv = div;
                break;
            }
        }
        if (!contentDiv) return "";
        const paras = Array.from(contentDiv.querySelectorAll("p"));
        if (paras.length === 0) return "";
        const first = paras[0];
        const em = first.querySelector("em");
        const firstIsQuestion =
            em && first.textContent.trim() === em.textContent.trim();
        const answerParas = firstIsQuestion ? paras.slice(1) : paras;
        if (answerParas.length === 0) return "";
        let answerHTML = "";
        answerParas.forEach((p) => {
            const decoded = decodeHTMLEntities(p.innerHTML);
            answerHTML += DOMPurify.sanitize(marked.parse(decoded));
        });
        if (!answerHTML.trim()) return "";
        return `<div class="crucial-tracks-answer">${answerHTML}</div>`;
    }
    return "";
}

function extractQuestionContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const allDivs = doc.querySelectorAll("div");
    let contentDiv = null;

    for (const div of allDivs) {
        if (!div.querySelector("iframe")) {
            contentDiv = div;
            break;
        }
    }

    if (!contentDiv) {
        contentDiv = doc.querySelector("div");
    }

    const mainContainer = contentDiv || doc.body;
    const paragraphs = mainContainer.querySelectorAll("p");

    if (paragraphs.length > 0) {
        let questionHTML = "";
        let answerParagraphs = Array.from(paragraphs);

        if (contentDiv) {
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
    } else {
        const rawContent = mainContainer.innerHTML;

        if (!rawContent.trim()) {
            return "";
        }

        const decodedContent = decodeHTMLEntities(rawContent);
        const dirtyParsedHTML = marked.parse(decodedContent);
        const cleanParsedHTML = DOMPurify.sanitize(dirtyParsedHTML);

        if (cleanParsedHTML.trim() === "<p></p>" || !cleanParsedHTML.trim()) {
            return "";
        }

        return `<div class="crucial-tracks-answer">${cleanParsedHTML}</div>`;
    }
}

// Pause all audio players
function pauseAllAudioPlayers() {
    audioPlayers.forEach((player) => {
        if (!player.paused) {
            player.pause();
        }
    });
}

// Pause all YouTube players
function pauseAllYouTubePlayers() {
    youtubePlayers.forEach((player) => {
        if (
            player &&
            player.getPlayerState &&
            player.getPlayerState() === YT.PlayerState.PLAYING
        ) {
            player.pauseVideo();
        }
    });
}

// Pause all players except the current audio player
function pauseOtherPlayers(currentPlayer) {
    audioPlayers.forEach((player) => {
        if (player !== currentPlayer && !player.paused) {
            player.pause();
        }
    });
    pauseAllYouTubePlayers();
}

// Initialize YouTube players
function initializeYouTubePlayers() {
    if (!youtubeAPIReady || !window.YT) {
        return;
    }

    // Clear previous players
    youtubePlayers = [];

    // Find all YouTube player divs
    const playerDivs = document.querySelectorAll('[id^="youtube-player-"]');

    playerDivs.forEach((div) => {
        const videoId = div.dataset.videoId;
        if (!videoId) return;

        try {
            const player = new YT.Player(div.id, {
                videoId: videoId,
                playerVars: {
                    enablejsapi: 1,
                    origin: window.location.origin,
                },
                events: {
                    onStateChange: onYouTubePlayerStateChange,
                },
            });

            youtubePlayers.push(player);
        } catch (error) {
            console.error("Error creating YouTube player:", error);
        }
    });
}

// Handle YouTube player state changes
function onYouTubePlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isChangingTrack = true;

        // Pause all audio players
        pauseAllAudioPlayers();

        // Pause other YouTube players
        youtubePlayers.forEach((player) => {
            if (
                player !== event.target &&
                player.getPlayerState &&
                player.getPlayerState() === YT.PlayerState.PLAYING
            ) {
                player.pauseVideo();
            }
        });

        // Update page title
        const playerDiv = document.getElementById(event.target.getIframe().id);
        if (playerDiv) {
            const trackItem = playerDiv.closest("li");
            if (trackItem) {
                const songTitle = trackItem.querySelector("h2")?.textContent;
                const artist = trackItem.querySelector(".info p")?.textContent;
                if (songTitle && artist) {
                    document.title = `"${songTitle}" de ${artist} - Luis Carlos Pando`;
                }
            }
        }

        setTimeout(() => {
            isChangingTrack = false;
        }, 100);
    } else if (
        event.data === YT.PlayerState.PAUSED ||
        event.data === YT.PlayerState.ENDED
    ) {
        if (!isChangingTrack) {
            document.title = originalTitle;
        }
    }
}

// Function to setup audio player event listeners
function setupAudioPlayers() {
    audioPlayers = [];

    const audioElements = document.querySelectorAll("#tracks audio");
    audioElements.forEach((audio) => {
        audioPlayers.push(audio);

        audio.removeEventListener("play", handleAudioPlay);
        audio.removeEventListener("pause", handleAudioPause);
        audio.removeEventListener("ended", handleAudioPause);

        audio.addEventListener("play", handleAudioPlay);
        audio.addEventListener("pause", handleAudioPause);
        audio.addEventListener("ended", handleAudioPause);
    });
}

// Handle audio play event
function handleAudioPlay(event) {
    isChangingTrack = true;

    pauseOtherPlayers(event.target);

    const audioElement = event.target;
    const trackItem = audioElement.closest("li");
    if (trackItem) {
        const songTitle = trackItem.querySelector("h2")?.textContent;
        const artist = trackItem.querySelector(".info p")?.textContent;
        if (songTitle && artist) {
            document.title = `"${songTitle}" de ${artist} - Luis Carlos Pando`;
        }
    }

    setTimeout(() => {
        isChangingTrack = false;
    }, 100);
}

// Handle audio pause/end event
function handleAudioPause(event) {
    if (!isChangingTrack) {
        document.title = originalTitle;
    }
}

// NEW: Function to update play/pause indicator
function updatePlayPauseIndicator(artworkWrapper, isPlaying) {
    const indicator = artworkWrapper.querySelector(".artwork-play-indicator");
    const icon = indicator?.querySelector("i");

    if (!indicator || !icon) return;

    if (isPlaying) {
        artworkWrapper.classList.add("is-playing");
        indicator.classList.add("pause-icon");
        icon.className = "fas fa-pause";
    } else {
        artworkWrapper.classList.remove("is-playing");
        indicator.classList.remove("pause-icon");
        icon.className = "fas fa-play";
    }
}

// NEW: Function to setup album artwork click handlers
function setupAlbumArtworkClickHandlers() {
    const artworkElements = document.querySelectorAll("#tracks .artwork a");

    artworkElements.forEach((artworkLink) => {
        // Find the associated audio element in the same track item
        const trackItem = artworkLink.closest("li");
        const audioElement = trackItem?.querySelector("audio");

        // Only add click handler if there's an audio element
        if (audioElement) {
            // Wrap the link content in a positioned container if not already wrapped
            if (!artworkLink.querySelector(".artwork-wrapper")) {
                const img = artworkLink.querySelector("img");
                if (img) {
                    const wrapper = document.createElement("div");
                    wrapper.className = "artwork-wrapper";

                    // Create play/pause indicator
                    const indicator = document.createElement("div");
                    indicator.className = "artwork-play-indicator";
                    indicator.innerHTML = '<i class="fas fa-play"></i>';

                    // Wrap the image
                    img.parentNode.insertBefore(wrapper, img);
                    wrapper.appendChild(img);
                    wrapper.appendChild(indicator);

                    // Set initial state
                    updatePlayPauseIndicator(wrapper, !audioElement.paused);
                }
            }

            // Remove default link behavior
            artworkLink.addEventListener("click", (event) => {
                event.preventDefault();

                // Toggle play/pause
                if (audioElement.paused) {
                    audioElement.play();
                } else {
                    audioElement.pause();
                }
            });

            // Add visual feedback - change cursor to pointer
            artworkLink.style.cursor = "pointer";

            // Update indicator when audio state changes
            const wrapper = artworkLink.querySelector(".artwork-wrapper");
            if (wrapper) {
                audioElement.addEventListener("play", () => {
                    updatePlayPauseIndicator(wrapper, true);
                });

                audioElement.addEventListener("pause", () => {
                    updatePlayPauseIndicator(wrapper, false);
                });

                audioElement.addEventListener("ended", () => {
                    updatePlayPauseIndicator(wrapper, false);
                });
            }
        }
        // If no audio element, leave the link as-is (goes to Last.fm)
    });
}

// Main function to fetch and display tracks
async function displayTracks() {
    const listContainer = document.getElementById("tracks");
    if (!listContainer) {
        console.log("❌ #tracks does not exist in DOM");
        return;
    }

    currentPage = getPageFromURL();

    setLoadingState(true);

    try {
        const data = await fetchTracksJSON();

        if (!Array.isArray(data)) {
            throw new Error("API response is not an array.");
        }

        console.log("✅ #tracks exists in DOM. Loading tracks...");

        allItems = data;

        const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages) {
            currentPage = 1;
            updateURL(currentPage);
        }

        renderPaginatedTracks();
        setupPagination();
        setupAudioPlayers();
        setupAlbumArtworkClickHandlers();

        // Initialize YouTube players after a short delay to ensure DOM is ready
        setTimeout(() => {
            initializeYouTubePlayers();
        }, 500);
    } catch (error) {
        handleError(error);
    }
}

// Fetch tracks JSON from API
async function fetchTracksJSON() {
    const response = await fetch(TRACKS_API);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

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
            const globalIndex = startIndex + index; // For unique YouTube player IDs
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
                const youtubeData = extractYouTubeEmbed(item.note, globalIndex);
                const questionTitle = extractQuestionTitleFromContent(
                    item.content,
                    item.note
                );
                const questionAnswer = extractAnswerContentFromContent(
                    item.content,
                    item.note
                );

                if (youtubeData) {
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
          ${questionTitle}
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div data-video-id="${youtubeData.videoId}">
                    ${youtubeData.html}
                  </div>
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
            }

            // Render standard Apple Music version
            const loadingAttr =
                index < 3 ? 'loading="eager"' : 'loading="lazy"';

            const artworkHTML = item.artwork_url
                ? `<img src="${item.artwork_url}" ${loadingAttr} data-toggle="tooltip" data-placement="top" alt="${item.artist} - ${item.song}" title="${item.artist} - ${item.song}" class="track-artwork rounded mb-4 mb-md-0 img-fluid" onerror="this.onerror=null; this.src='https://placehold.co/300x300?text=Portada+no+encontrada'">`
                : "";

            const audioHTML = item.preview_url
                ? `<audio preload="none" controls><source src="${item.preview_url}" type="audio/mp4">Your browser does not support the audio element.</audio>`
                : "";

            const questionTitle = extractQuestionTitleFromContent(
                item.content,
                item.note
            );
            const questionAnswer = extractAnswerContentFromContent(
                item.content,
                item.note
            );

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
          ${questionTitle}
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
          ${questionAnswer}
        </li>
        ${separator}`;
        })
        .join("");

    // Store video IDs in the DOM for later initialization
    const playerDivs = list.querySelectorAll("[data-video-id]");
    playerDivs.forEach((div) => {
        const videoId = div.dataset.videoId;
        const playerDiv = div.querySelector('[id^="youtube-player-"]');
        if (playerDiv) {
            playerDiv.dataset.videoId = videoId;
        }
    });

    if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
            initializeTooltips();
        });
    } else {
        setTimeout(() => {
            initializeTooltips();
        }, 100);
    }
}

// Separate function for tooltip initialization
function initializeTooltips() {
    if (typeof $ !== "undefined" && $.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

// Handle page navigation
function handlePageChange(newPage) {
    const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);

    if (newPage < 1 || newPage > totalPages) {
        return;
    }

    currentPage = newPage;
    updateURL(currentPage);
    renderPaginatedTracks();
    setupPagination();
    setupAudioPlayers();
    setupAlbumArtworkClickHandlers();

    setTimeout(() => {
        initializeYouTubePlayers();
    }, 500);

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

    const isLastPage = currentPage === totalPages;
    const ctProfileMessage = isLastPage
        ? `
      <div class="card my-4">
        <div class="card-body text-center">
          <p>
            ¡Parece que llegaste al final! Aquí solo muestro las últimas 50 canciones, pero te invito a ir a
            <a href="https://app.crucialtracks.org/profile/mijo?page=6" target="_blank" rel="noopener">mi perfil de Crucial Tracks</a>
            para ver el resto de las canciones que he compartido.
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
    <div class="pagination-controls" style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <button id="prevPage" class="btn btn-primary" aria-label="Anterior" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>
      <button id="nextPage" class="btn btn-primary" aria-label="Siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
    </div>
    <hr>
    <div class="pagination-go-to" margin-bottom: 1rem;>
      <div>
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

    document
        .getElementById("pageJumpBtn")
        ?.addEventListener("click", handlePageJump);

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

    if (allItems.length > 0) {
        renderPaginatedTracks();
        setupPagination();
        setupAudioPlayers();
        setupAlbumArtworkClickHandlers();
        setTimeout(() => {
            initializeYouTubePlayers();
        }, 500);
    }
});

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("tracks")) {
        loadYouTubeAPI();
        displayTracks();
    }
});
