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

                // Check if any image is available and not the placeholder
                let albumArtUrl = "";
                const hasRealImage = track.image.some(
                    (img) =>
                        img["#text"] &&
                        !img["#text"].includes(
                            "2a96cbd8b46e442fc41c2b86b821562f"
                        )
                );

                if (hasRealImage) {
                    // Get the extralarge image (index 3)
                    albumArtUrl = track.image[3]["#text"];
                } else {
                    // Use custom placeholder if no real image is available
                    albumArtUrl = "";
                }

                const fullTitle = `${artistName} - ${trackTitle}`;
                const trackUrl = track.url;

                // Use custom placeholder if album art URL is empty
                const finalImageUrl =
                    albumArtUrl ||
                    "https://placehold.co/300x300/1a1a2e/ffffff?text=" +
                        encodeURIComponent(artistName.substring(0, 1));

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
