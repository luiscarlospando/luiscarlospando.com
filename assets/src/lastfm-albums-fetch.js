// Top 10 albums from Last.fm in the past month

// Function to display Last.fm top albums
function displayLastFmTopAlbums() {
  // Point to the new endpoint we created
  fetch("https://luiscarlospando.com/api/lastfmTopAlbums")
    .then((response) => response.json())
    .then((data) => {
      // Check if the container exists on the page
      const container = document.getElementById("lastfm-top-albums");
      if (!container) {
        console.log("❌ #lastfm-top-albums no existe en el DOM");
        return;
      }

      console.log(
        "✅ #lastfm-top-albums existe en el DOM. Cargando álbumes...",
      );

      // Get the list of albums from the JSON response
      const albums = data.topalbums.album;

      // Iterate over each album to build the HTML
      albums.forEach((album) => {
        const artistName = album.artist.name;
        const albumTitle = album.name;
        // The API returns several images. The 3rd one (index 3) is usually 'extralarge', which is ideal for this.
        const albumArtUrl = album.image[3]["#text"];
        const fullTitle = `${artistName} - ${albumTitle}`;

        // Create the container element for the grid item
        const gridItem = document.createElement("div");
        // Add the column classes that Masonry needs
        gridItem.className = "grid-item col-6 col-md-4 mb-4";

        // Create the inner HTML using the structure you defined
        gridItem.innerHTML = `
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

        // Add the new element to the container
        container.appendChild(gridItem);
      });

      // Masonry layout update
      var msnry = new Masonry(container, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });
    })
    .catch((error) =>
      console.error("Error fetching data from Last.fm:", error),
    );
}

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", displayLastFmTopAlbums);
