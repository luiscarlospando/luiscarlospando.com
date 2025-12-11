// Most recent loved tracks from Last.fm

// Function to display Last.fm loved tracks
function displayLastFmLovedTracks() {
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

            // LOG: Ver toda la respuesta de la API
            console.log("📦 Respuesta completa de la API:", data);

            // Get the list of tracks from the JSON response
            const tracks = data.lovedtracks.track;

            // LOG: Ver cuántas canciones hay
            console.log("🎵 Número de canciones:", tracks.length);

            // Clear container in case of re-run
            container.innerHTML = "";

            // Iterate over each track to build the HTML
            tracks.forEach((track, index) => {
                const artistName = track.artist.name;
                const trackTitle = track.name;

                // LOG: Ver las imágenes disponibles para cada canción
                if (index < 3) {
                    // Solo loguear las primeras 3 para no saturar
                    console.log(
                        `\n🖼️ Canción ${index + 1}: ${artistName} - ${trackTitle}`
                    );
                    console.log("Imágenes disponibles:", track.image);
                }

                // The API returns several images. The 3rd one (index 3) is usually 'extralarge'
                const albumArtUrl = track.image[3]["#text"];

                // LOG: Ver la URL seleccionada
                if (index < 3) {
                    console.log("URL seleccionada (índice 3):", albumArtUrl);
                }

                const fullTitle = `${artistName} - ${trackTitle}`;
                const trackUrl = track.url;

                // Use placeholder if album art URL is empty
                const finalImageUrl =
                    albumArtUrl ||
                    "https://placehold.co/300x300?text=Portada+no+encontrada";

                // LOG: Ver la URL final
                if (index < 3) {
                    console.log("URL final a usar:", finalImageUrl);
                }

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
                `;

                // Add the new column directly to the row container
                container.appendChild(columnDiv);
            });

            console.log("\n✅ Todas las canciones han sido agregadas al DOM");

            // Tooltips initialization
            if (typeof $ !== "undefined" && $.fn.tooltip) {
                $('[data-toggle="tooltip"]').tooltip();
            }
        })
        .catch((error) =>
            console.error("❌ Error fetching data from Last.fm:", error)
        );
}

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", displayLastFmLovedTracks);
