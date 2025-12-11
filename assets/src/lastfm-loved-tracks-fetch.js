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
    const audioElements = document.querySelectorAll(
        "#lastfm-loved-tracks-grid audio"
    );
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

    fetch("https://luiscarlospando.com/api/lastfmLovedTracks")
        .then((response) => response.json())
        .then((data) => {
            // Check if the container exists on the page
            const container = document.getElementById(
                "lastfm-loved-tracks-grid"
            );
            if (!container) {
                console.log("❌ #lastfm-loved-tracks-grid no existe en el DOM");
                return;
            }

            console.log(
                "✅ #lastfm-loved-tracks-grid existe en el DOM. Cargando canciones..."
            );

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
        .catch((error) =>
            console.error("Error fetching data from Last.fm:", error)
        );
}

// Render paginated tracks
function renderPaginatedTracks() {
    const container = document.getElementById("lastfm-loved-tracks-grid");
    if (!container) return;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const tracks = allTracks.slice(startIndex, endIndex);

    // Clear container
    container.innerHTML = "";

    // Iterate over each track to build the HTML
    tracks.forEach((track) => {
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

        const fullTitle = `${artistName} - ${trackTitle}`;
        const trackUrl = track.url;
        const previewUrl = track.preview_url;

        // Use custom placeholder if album art URL is empty
        const finalImageUrl =
            albumArtUrl ||
            "https://placehold.co/300x300/1a1a2e/ffffff?text=" +
                encodeURIComponent(artistName.substring(0, 1));

        // Create audio element if preview is available
        const audioHTML = previewUrl
            ? `<audio controls class="w-100 mt-2">
                 <source src="${previewUrl}" type="audio/mp4">
                 Tu navegador no soporta el elemento de audio.
               </audio>`
            : "";

        // Create container element for the grid column
        const columnDiv = document.createElement("div");
        // Add Bootstrap column classes
        columnDiv.className = "col-6 col-md-4";

        // Create inner HTML
        columnDiv.innerHTML = `
              <a href="${trackUrl}" target="_blank" rel="noopener noreferrer">
                <figure class="figure">
                    <img
                        src="${finalImageUrl}"
                        class="thumb-album rounded img-fluid"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="${fullTitle}"
                        alt="${fullTitle}"
                        loading="lazy"
                    />
                    <figcaption class="figure-caption text-center">
                        ${fullTitle}
                    </figcaption>
                </figure>
              </a>
              ${audioHTML}
        `;

        // Add the new column directly to the row container
        container.appendChild(columnDiv);
    });

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

    // Scroll to top of the grid
    document
        .getElementById("lastfm-loved-tracks-grid")
        ?.scrollIntoView({ behavior: "smooth" });
}

// Handle page jump from input
function handlePageJump() {
    const input = document.getElementById("lovedTracksPageJumpInput");
    const page = parseInt(input.value, 10);

    if (!isNaN(page) && page > 0) {
        handlePageChange(page);
    }
}

// Setup pagination buttons
function setupPagination() {
    const totalPages = Math.ceil(allTracks.length / ITEMS_PER_PAGE);
    const container = document.getElementById("lastfm-loved-tracks-grid");
    if (!container) return;

    const existing = document.querySelector(".loved-tracks-pagination");
    if (existing) existing.remove();

    const paginationContainer = document.createElement("div");
    paginationContainer.className = "loved-tracks-pagination col-12";
    paginationContainer.style.textAlign = "center";
    paginationContainer.style.marginTop = "2rem";

    paginationContainer.innerHTML = `
    <hr>
    <div class="pagination-info" style="margin-bottom: 1rem;">
      Página ${currentPage} de ${totalPages} (${allTracks.length} canciones)
    </div>
    <div class="pagination-controls" style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
      <button id="lovedTracksPrevPage" class="btn btn-primary" aria-label="Anterior" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>

      <div style="display: flex; align-items: center; gap: 0.5rem; margin: 0 0.5rem;">
        <label for="lovedTracksPageJumpInput" style="margin: 0; white-space: nowrap;">Ir a página:</label>
        <input
          type="number"
          id="lovedTracksPageJumpInput"
          min="1"
          max="${totalPages}"
          value="${currentPage}"
          style="width: 70px; padding: 0.375rem 0.5rem; border: 1px solid #ced4da; border-radius: 0.25rem;"
          aria-label="Número de página"
        >
        <button id="lovedTracksPageJumpBtn" class="btn btn-primary" aria-label="Ir">Ir</button>
      </div>

      <button id="lovedTracksNextPage" class="btn btn-primary" aria-label="Siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
    </div>
  `;

    container.parentNode.insertBefore(
        paginationContainer,
        container.nextSibling
    );

    document
        .getElementById("lovedTracksPrevPage")
        ?.addEventListener("click", () => {
            if (currentPage > 1) handlePageChange(currentPage - 1);
        });

    document
        .getElementById("lovedTracksNextPage")
        ?.addEventListener("click", () => {
            if (currentPage < totalPages) handlePageChange(currentPage + 1);
        });

    document
        .getElementById("lovedTracksPageJumpBtn")
        ?.addEventListener("click", handlePageJump);

    document
        .getElementById("lovedTracksPageJumpInput")
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
