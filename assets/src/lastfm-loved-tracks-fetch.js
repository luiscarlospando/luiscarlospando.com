// Most recent loved tracks from Last.fm

// Config
const ITEMS_PER_PAGE = 10; // items per page for pagination

let currentPage = 1;
let allTracks = [];
let audioPlayers = [];
let originalTitle = document.title; // Store original title
let isChangingTrack = false; // Flag to prevent title restoration during track change

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
    // Set flag to prevent title restoration when pausing other tracks
    isChangingTrack = true;

    // Pause other players
    pauseOtherPlayers(event.target);

    // Update page title with currently playing track
    const audioElement = event.target;
    const trackItem = audioElement.closest("li");
    if (trackItem) {
        const songTitle = trackItem.querySelector("h2")?.textContent;
        const artist = trackItem.querySelector(".info p")?.textContent;
        if (songTitle && artist) {
            document.title = `🔉 "${songTitle}" de ${artist} - Luis Carlos Pando`;
        }
    }

    // Reset flag after a short delay
    setTimeout(() => {
        isChangingTrack = false;
    }, 100);
}

// Handle audio pause/end event
function handleAudioPause(event) {
    // Only restore title if we're not changing tracks
    if (!isChangingTrack) {
        document.title = originalTitle;
    }
}

// Function to update play/pause indicator
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

// Function to setup album artwork click handlers
function setupAlbumArtworkClickHandlers() {
    const artworkElements = document.querySelectorAll(
        "#loved-tracks .artwork a"
    );

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

// Function to setup audio player event listeners
function setupAudioPlayers() {
    // Clear previous references
    audioPlayers = [];

    // Find all audio elements and add event listeners
    const audioElements = document.querySelectorAll("#loved-tracks audio");
    audioElements.forEach((audio) => {
        audioPlayers.push(audio);

        // Remove existing listeners to prevent duplicates
        audio.removeEventListener("play", handleAudioPlay);
        audio.removeEventListener("pause", handleAudioPause);
        audio.removeEventListener("ended", handleAudioPause);

        // Add event listeners
        audio.addEventListener("play", handleAudioPlay);
        audio.addEventListener("pause", handleAudioPause);
        audio.addEventListener("ended", handleAudioPause);
    });
}

// Function to format date in YYYY-MM-DD HH:MM:SS format
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to update the "last updated" notice
function updateLastModifiedNotice(mostRecentTrack) {
    const lastUpdatedElement = document.getElementById("last-updated-at");

    if (lastUpdatedElement && mostRecentTrack && mostRecentTrack.date) {
        const timestamp = mostRecentTrack.date.uts;
        const formattedDate = formatDate(timestamp);

        // Insert just the plain date string
        lastUpdatedElement.textContent = formattedDate;

        // Dispatch a custom event to notify that the date has been updated
        const event = new CustomEvent("lastUpdatedDateReady");
        document.dispatchEvent(event);
    }
}

// Function to display Last.fm loved tracks
function displayLastFmLovedTracks() {
    // Get current page from URL
    currentPage = getPageFromURL();

    const container = document.getElementById("loved-tracks");
    if (!container) {
        console.log("❌ #loved-tracks does not exist in DOM");
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
            console.log("✅ #loved-tracks exists in DOM. Loading tracks...");

            // Get the list of tracks from the JSON response
            allTracks = data.lovedtracks.track;

            // Update the "last updated" notice with the most recent track's date
            if (allTracks.length > 0) {
                updateLastModifiedNotice(allTracks[0]);
            }

            // Validate page number after we know total items
            const totalPages = Math.ceil(allTracks.length / ITEMS_PER_PAGE);
            if (currentPage > totalPages) {
                currentPage = 1;
                updateURL(currentPage);
            }

            renderPaginatedTracks();
            setupPagination();
            setupAudioPlayers();
            setupAlbumArtworkClickHandlers();
        })
        .catch((error) => {
            console.error("Error fetching data from Last.fm:", error);
            container.innerHTML = `<li>No se pudieron cargar las canciones. Por favor, actualiza la página.</li>`;
        });
}

// Render paginated tracks
function renderPaginatedTracks() {
    const list = document.getElementById("loved-tracks");
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

            // Use lazy loading for images - load immediately for first 3 items, lazy load the rest
            const loadingAttr =
                index < 3 ? 'loading="eager"' : 'loading="lazy"';

            const artworkHTML = `<img src="${finalImageUrl}" ${loadingAttr} data-toggle="tooltip" data-placement="top" alt="${artistName} - ${trackTitle}" title="${artistName} - ${trackTitle}" class="track-artwork rounded w-100 mb-4 mb-md-0 img-fluid">`;

            const audioHTML = previewUrl
                ? `<audio preload="none" controls><source src="${previewUrl}" type="audio/mp4">Tu navegador no soporta el elemento de audio.</audio>`
                : '<p class="text-muted"><em>Preview no disponible para esta canción.</em></p>';

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

    // Use requestIdleCallback for tooltip initialization to not block rendering
    if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
            initializeTooltips();
        });
    } else {
        // Fallback for browsers that don't support requestIdleCallback
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
    setupAlbumArtworkClickHandlers();

    // Scroll to top of the list
    document
        .getElementById("loved-tracks")
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
    const list = document.getElementById("loved-tracks");
    if (!list) return;

    const existing = document.querySelector(".loved-tracks-pagination");
    if (existing) existing.remove();

    const container = document.createElement("div");
    container.className = "loved-tracks-pagination";
    container.style.textAlign = "center";

    container.innerHTML = `
    <hr>
    <div class="pagination-info" style="margin-bottom: 1rem;">
      Página ${currentPage} de ${totalPages} (${allTracks.length} canciones)
    </div>
    <div class="pagination-controls" style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <button id="lovedTracksPrevPage" class="btn btn-primary" aria-label="Anterior" ${currentPage === 1 ? "disabled" : ""}>« Anterior</button>
      <button id="lovedTracksNextPage" class="btn btn-primary" aria-label="Siguiente" ${currentPage === totalPages ? "disabled" : ""}>Siguiente »</button>
    </div>
    <hr>
    <div class="pagination-go-to" style="margin-bottom: 1rem;">
      <div>
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
    </div>
  `;

    list.parentNode.insertBefore(container, list.nextSibling);

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
        setupAlbumArtworkClickHandlers();
    }
});

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Only run if container exists
    if (document.getElementById("loved-tracks")) {
        displayLastFmLovedTracks();
    }
});
