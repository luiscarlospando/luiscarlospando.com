// Most recent loved tracks from Last.fm

// Config
const ITEMS_PER_PAGE = 10; // items per page for pagination

let currentPage = 1;
let allTracks = [];
let audioPlayers = [];

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

// Function to pause all other audio players except the current one
function pauseOtherPlayers(currentPlayer) {
    audioPlayers.forEach((player) => {
        if (player !== currentPlayer && !player.paused) {
            player.pause();
        }
    });
}

// Handle audio play event
function handleAudioPlay(event) {
    pauseOtherPlayers(event.target);
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

// Function to display Last.fm loved tracks
function displayLastFmLovedTracks() {
    // Get current page from URL
    currentPage = getPageFromURL();

    const container = document.getElementById("tracks");
    if (!container) {
        console.log("❌ #tracks no existe en el DOM");
        return;
    }

    // Set loading state
    container.innerHTML = `
        <li class="loading-state">
            <i class="fas fa-spinner fa-spin"></i> Cargando canciones favoritas...
        </li>`;

    fetch("https://luiscarlospando.com/api/lastfmLovedTracks")
        .then((response) => response.json())
        .then((data) => {
            console.log("✅ #tracks existe en el DOM. Cargando canciones...");

            // Get the list of tracks from the JSON response
            allTracks = data.lovedtracks.track;

            // Validate page number after we know total items
            const totalPages = Math.ceil(allTracks.length / ITEMS_PER_PAGE);
            if (currentPage > totalPages) {
                currentPage = 1;
                updateURL(currentPage);
            }

            renderPaginatedTracks();
            setupPagination();
            setupAudioPlayers();
        })
        .catch((error) => {
            console.error("Error fetching data from Last.fm:", error);
            container.innerHTML = `<li>No se pudieron cargar las canciones. Por favor, actualiza la página.</li>`;
        });
}

// Render paginated tracks
function renderPaginatedTracks() {
    const list = document.getElementById("tracks");
    if (!list) return;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const tracks = allTracks.slice(startIndex, endIndex);

    list.innerHTML = tracks
        .map((track, index) => {
            const artistName = track.artist.name;
            const trackTitle = track.name;

            // Check if any image is available and not the placeholder
            let albumArtUrl = "";
            const hasRealImage = track.image.some(
                (img) =>
                    img["#text"] &&
                    !img["#text"].includes("2a96cbd8b46e442fc41c2b86b821562f")
            );

            if (hasRealImage) {
                // Get the extralarge image (index 3)
                albumArtUrl = track.image[3]["#text"];
            }

            const trackUrl = track.url;
            const previewUrl = track.preview_url;

            // Use custom placeholder if album art URL is empty
            const finalImageUrl =
                albumArtUrl ||
                "https://placehold.co/300x300?text=Portada+no+encontrada";

            const artworkHTML = `<img src="${finalImageUrl}" data-toggle="tooltip" data-placement="top" alt="${trackTitle}" title="${trackTitle}" class="track-artwork rounded mb-4 mb-md-0 img-fluid">`;

            const audioHTML = previewUrl
                ? `<audio controls><source src="${previewUrl}" type="audio/mp4">Tu navegador no soporta el elemento de audio.</audio>`
                : '<p class="text-muted"><em>Preview no disponible para esta canción</em></p>';

            const separator = index < tracks.length - 1 ? "<hr>" : "";

            return `
                <li class="mb-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4 col-lg-3">
                                    <div class="artwork">
                                        <a href="${trackUrl}" target="_blank" rel="noopener">
                                            ${artworkHTML}
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-8 col-lg-9">
                                    <div class="info">
                                        <h2 style="margin: 0 0 0.13em !important;">${trackTitle}</h2>
                                        <p>${artistName}</p>
                                        ${audioHTML}
                                        <p><a href="${trackUrl}" target="_blank" rel="noopener">Abrir en Last.fm <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8em; margin-left: 0.2em; opacity: 0.7; vertical-align: middle;"></i></a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                ${separator}`;
        })
        .join("");

    // Tooltips initialization
    if (typeof $ !== "undefined" && $.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

// Handle page navigation
function handlePageChange(newPage) {
    const totalPages = Math.ceil(allTracks.length / ITEMS_PER_PAGE);

    // Validate page number
    if (newPage < 1 || newPage > totalPages) {
        return;
    }

    currentPage = newPage;
    updateURL(currentPage);
    renderPaginatedTracks();
    setupPagination();
    setupAudioPlayers();

    // Scroll to top of the list
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
    const totalPages = Math.ceil(allTracks.length / ITEMS_PER_PAGE);
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
      Página ${currentPage} de ${totalPages} (${allTracks.length} canciones)
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

// Handle browser back/forward navigation
window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
        currentPage = event.state.page;
    } else {
        currentPage = getPageFromURL();
    }

    // Only re-render if we have data loaded
    if (allTracks.length > 0) {
        renderPaginatedTracks();
        setupPagination();
        setupAudioPlayers();
    }
});

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", displayLastFmLovedTracks);
