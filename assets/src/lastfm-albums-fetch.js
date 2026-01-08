// Top albums from Last.fm in the past month

// Function to display Last.fm top albums
function displayLastFmTopAlbums() {
    const container = document.getElementById("lastfm-albums-grid");
    if (!container) {
        console.log("❌ #lastfm-albums-grid no existe en el DOM");
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
                "✅ #lastfm-albums-grid existe en el DOM. Cargando álbumes..."
            );

            // Get the list of albums from the JSON response
            const albums = data.topalbums.album;

            // Clear container
            container.innerHTML = "";

            // Create a document fragment for better performance
            const fragment = document.createDocumentFragment();

            // Iterate over each album to build the HTML
            albums.forEach((album, index) => {
                const artistName = album.artist.name;
                const albumTitle = album.name;
                // The API returns several images. The 3rd one (index 3) is usually 'extralarge', which is ideal for this.
                const albumArtUrl = album.image[3]["#text"];
                const fullTitle = `${artistName} - ${albumTitle}`;
                const albumUrl = album.url;

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
                      <a href="${albumUrl}" target="_blank" rel="noopener noreferrer">
                        <figure class="figure">
                            <img
                                src="${finalImageUrl}"
                                class="thumb-album rounded img-fluid"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="${fullTitle}"
                                alt="${fullTitle}"
                                ${loadingAttr}
                            />
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

// Separate function for tooltip initialization
function initializeAlbumsTooltips() {
    if (typeof $ !== "undefined" && $.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", displayLastFmTopAlbums);
