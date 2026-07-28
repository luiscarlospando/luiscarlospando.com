// Top albums from Last.fm in the past month

let allAlbums = [];

// Function to display Last.fm top albums
function displayLastFmTopAlbums() {
    const container = document.getElementById("lastfm-albums-grid");
    if (!container) {
        console.log("❌ #lastfm-albums-grid does not exist in DOM");
        return;
    }

    // Set loading state
    container.innerHTML = `
        <div class="col-12 text-center py-5">
            <i class="fas fa-spinner fa-spin"></i> Cargando álbumes...
        </div>`;

    fetch("https://luiscarlospando.com/api/lastfmTopAlbums")
        .then((response) => response.json())
        .then((data) => {
            console.log(
                "✅ #lastfm-albums-grid exists in DOM. Loading albums..."
            );

            // Get the list of albums from the JSON response
            allAlbums = data.topalbums.album;

            // Clear container
            container.innerHTML = "";

            // Create a document fragment for better performance
            const fragment = document.createDocumentFragment();

            // Iterate over each album to build the HTML
            allAlbums.forEach((album, index) => {
                const artistName = album.artist.name;
                const albumTitle = album.name;
                // The API returns several images. The 3rd one (index 3) is usually 'extralarge', which is ideal for this.
                const albumArtUrl = album.image[3]["#text"];
                const fullTitle = `${artistName} - ${albumTitle}`;

                // Use placeholder if album art URL is empty
                const finalImageUrl =
                    albumArtUrl ||
                    "https://placehold.co/300x300?text=Portada+no+encontrada";

                // Load first 6 images immediately, lazy load the rest
                const loadingAttr =
                    index < 6 ? 'loading="eager"' : 'loading="lazy"';

                // Create container element for the grid column
                const columnDiv = document.createElement("div");
                // Add Bootstrap column classes
                columnDiv.className = "col-6 col-md-4";

                // Create inner HTML
                columnDiv.innerHTML = `
                      <a href="#" data-toggle="modal" data-target="#albumModal" data-album-index="${index}" role="button" aria-label="Ver opciones para escuchar: ${fullTitle}">
                        <figure class="figure">
                            <div class="album-cover-wrapper">
                                <img
                                    src="${finalImageUrl}"
                                    class="thumb-album rounded img-fluid"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="${fullTitle}"
                                    alt="${fullTitle}"
                                    ${loadingAttr}
                                    onerror="this.onerror=null; this.src='https://placehold.co/300x300?text=Portada+no+encontrada'"
                                />
                                <div class="album-cover-indicator"><i class="fa-solid fa-headphones" aria-hidden="true"></i></div>
                            </div>
                            <figcaption class="figure-caption text-center">
                                ${fullTitle}
                            </figcaption>
                        </figure>
                      </a>
                `;

                // Add the new column to the fragment
                fragment.appendChild(columnDiv);
            });

            // Append all elements at once (single DOM update)
            container.appendChild(fragment);

            setupAlbumClickHandlers();

            // Use requestIdleCallback for tooltip initialization to not block rendering
            if ("requestIdleCallback" in window) {
                requestIdleCallback(() => {
                    initializeAlbumsTooltips();
                });
            } else {
                // Fallback for browsers that don't support requestIdleCallback
                setTimeout(() => {
                    initializeAlbumsTooltips();
                }, 100);
            }
        })
        .catch((error) => {
            console.error("Error fetching data from Last.fm:", error);
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p>No se pudieron cargar los álbumes. Por favor, actualiza la página.</p>
                </div>`;
        });
}

// Build streaming service links (Apple Music, Spotify, Last.fm) for an album
function buildAlbumStreamingLinksHTML(album) {
    const artistName = album.artist.name;
    const albumTitle = album.name;
    const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(`${artistName} ${albumTitle}`)}`;

    return `
        ${album.apple_music_url ? `<li><a class="btn btn-primary btn-sm" href="${album.apple_music_url}" target="_blank" rel="noopener"><i class="fa-brands fa-apple" aria-hidden="true"></i> Abrir en Apple Music</a></li>` : ""}
        <li>
          <a class="btn btn-primary btn-sm" href="${spotifyUrl}" target="_blank" rel="noopener"><i class="fa-brands fa-spotify" aria-hidden="true"></i> Abrir en Spotify</a>
        </li>
        <li>
          <a class="btn btn-primary btn-sm" href="${album.url}" target="_blank" rel="noopener"><i class="fa-brands fa-lastfm" aria-hidden="true"></i> Abrir en Last.fm</a>
        </li>`;
}

// Populate and show the album modal for the given album index
function openAlbumModal(index) {
    const album = allAlbums[index];
    if (!album) return;

    const artistName = album.artist.name;
    const albumTitle = album.name;
    const albumArtUrl = album.image[3]?.["#text"];
    const finalImageUrl =
        albumArtUrl || "https://placehold.co/300x300?text=Portada+no+encontrada";

    document.getElementById("albumModalLabel").textContent = albumTitle;
    document.getElementById("albumModalArtist").textContent = artistName;

    const modalArt = document.getElementById("albumModalArt");
    modalArt.setAttribute("src", finalImageUrl);
    modalArt.setAttribute("alt", `${artistName} - ${albumTitle}`);

    document.getElementById("albumModalLinks").innerHTML =
        buildAlbumStreamingLinksHTML(album);
}

// Setup click handlers on album covers to open the album modal
function setupAlbumClickHandlers() {
    const container = document.getElementById("lastfm-albums-grid");
    if (!container) return;

    container.querySelectorAll("[data-album-index]").forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            const index = parseInt(trigger.dataset.albumIndex, 10);
            openAlbumModal(index);
        });
    });
}

// Separate function for tooltip initialization
function initializeAlbumsTooltips() {
    if (typeof $ !== "undefined" && $.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Only run if container exists
    if (document.getElementById("lastfm-albums-grid")) {
        displayLastFmTopAlbums();
    }
});
