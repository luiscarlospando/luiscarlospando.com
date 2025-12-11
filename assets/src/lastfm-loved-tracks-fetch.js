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

            // Get the list of tracks from the JSON response
            const tracks = data.lovedtracks.track;

            // Clear container in case of re-run
            container.innerHTML = "";

            // Iterate over each track to build the HTML
            tracks.forEach((track) => {
                const artistName = track.artist.name;
                const trackTitle = track.name;

                // Get the largest available image
                let albumArtUrl = track.image[track.image.length - 1]["#text"];

                // If the URL is empty or contains the placeholder, try other sizes
                if (
                    !albumArtUrl ||
                    albumArtUrl.includes("2a96cbd8b46e442fc41c2b86b821562f")
                ) {
                    // Try to find any non-empty image
                    for (let i = track.image.length - 1; i >= 0; i--) {
                        if (
                            track.image[i]["#text"] &&
                            !track.image[i]["#text"].includes(
                                "2a96cbd8b46e442fc41c2b86b821562f"
                            )
                        ) {
                            albumArtUrl = track.image[i]["#text"];
                            break;
                        }
                    }
                }

                const fullTitle = `${artistName} - ${trackTitle}`;
                const trackUrl = track.url;

                // Use placeholder if album art URL is empty or is Last.fm's default placeholder
                const finalImageUrl =
                    albumArtUrl &&
                    !albumArtUrl.includes("2a96cbd8b46e442fc41c2b86b821562f")
                        ? albumArtUrl
                        : "https://placehold.co/300x300?text=Portada+no+encontrada";

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

            // Tooltips initialization
            if (typeof $ !== "undefined" && $.fn.tooltip) {
                $('[data-toggle="tooltip"]').tooltip();
            }
        })
        .catch((error) =>
            console.error("Error fetching data from Last.fm:", error)
        );
}

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", displayLastFmLovedTracks);
