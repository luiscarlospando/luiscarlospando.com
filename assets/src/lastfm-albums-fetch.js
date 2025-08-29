// Top 10 albums from Last.fm in the past month

// Function to display Last.fm top albums
function displayLastFmTopAlbums() {
  fetch("https://luiscarlospando.com/api/lastfmTopAlbums")
    .then((response) => response.json())
    .then((data) => {
      // Check if the container exists on the page (now targeting the new ID)
      const container = document.getElementById("lastfm-albums-grid");
      if (!container) {
        console.log("❌ #lastfm-albums-grid no exisre en el DOM");
        return;
      }

      console.log(
        "✅ #lastfm-albums-grid existe en el DOM. Cargando álbumes...",
      );

      // Get the list of albums from the JSON response
      const albums = data.topalbums.album;

      // Clear container in case of re-run
      container.innerHTML = "";

      // Iterate over each album to build the HTML
      albums.forEach((album) => {
        const artistName = album.artist.name;
        const albumTitle = album.name;
        // The API returns several images. The 3rd one (index 3) is usually 'extralarge', which is ideal for this.
        const albumArtUrl = album.image[3]["#text"];
        const fullTitle = `${artistName} - ${albumTitle}`;

        // Create container element for the grid column
        const columnDiv = document.createElement("div");
        // Add Bootstrap column classes
        columnDiv.className = "col-6 col-md-4 mb-4";

        // Create inner HTML
        columnDiv.innerHTML = `
                    <figure class="figure">
                        <img
                            src="${albumArtUrl}"
                            class="rounded img-fluid"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="${fullTitle}"
                            alt="${fullTitle}"
                        />
                        <figcaption class="figure-caption text-center">
                            ${fullTitle}
                        </figcaption>
                    </figure>
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
      console.error("Error fetching data from Last.fm:", error),
    );
}

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", displayLastFmTopAlbums);
