import { getAlbumByIndex } from "./lastfm-albums-fetch";

// Helper functions for nav container visibility
function hideNavContainer() {
    const navContainer = document.querySelector(".nav-container");
    if (navContainer) {
        navContainer.style.display = "none";
    }
}

function showNavContainer() {
    const navContainer = document.querySelector(".nav-container");
    if (navContainer) {
        navContainer.style.display = "";
    }
}

// General modal
document.addEventListener("DOMContentLoaded", function () {
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');

    modalTriggers.forEach((trigger) => {
        trigger.addEventListener("click", function () {
            // Hide nav container when modal opens
            hideNavContainer();

            // Try to get the img element inside the clicked trigger
            const imgElement = this.querySelector("img");
            let imgSrc = "";

            if (imgElement) {
                // If there's an img inside, use its src
                imgSrc = imgElement.getAttribute("src");
            } else if (this.hasAttribute("data-img-src")) {
                // Else if there's a data-img-src attribute, use it
                imgSrc = this.getAttribute("data-img-src");
            }

            // If we got an imgSrc value, update the modal image
            if (imgSrc) {
                const modalImg = document.querySelector(
                    "#modal .modal-body img"
                );
                modalImg.setAttribute("src", imgSrc);
            }
        });
    });

    // Add event listeners to show nav container when modal closes
    const modalCloseButtons = document.querySelectorAll(
        '[data-dismiss="modal"]'
    );
    modalCloseButtons.forEach((btn) => {
        btn.addEventListener("click", showNavContainer);
    });

    // Show nav container when clicking on modal backdrop
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                showNavContainer();
            }
        });
    });

    // Show nav container when pressing Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            const openModals = document.querySelectorAll(".modal.show");
            if (openModals.length > 0) {
                showNavContainer();
            }
        }
    });
});

// Video modal
document.addEventListener("DOMContentLoaded", function () {
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
    const videoModal = document.getElementById("videoModal");
    const modalIframe = videoModal.querySelector("iframe");
    const modalCloseButtons = videoModal.querySelectorAll(
        '[data-dismiss="modal"]'
    );

    // When a trigger is clicked, set video src
    modalTriggers.forEach((trigger) => {
        trigger.addEventListener("click", function () {
            const videoUrl = this.getAttribute("data-video");
            if (!videoUrl) return;

            // Hide nav container when video modal opens
            hideNavContainer();
            modalIframe.setAttribute("src", videoUrl + "?autoplay=1");
        });
    });

    // Stop video when the modal is closed
    const stopVideo = () => {
        modalIframe.setAttribute("src", "");
        showNavContainer();
    };

    // Close button(s)
    modalCloseButtons.forEach((btn) => {
        btn.addEventListener("click", stopVideo);
    });

    // Close when clicking on the backdrop
    videoModal.addEventListener("click", function (e) {
        if (e.target === videoModal) stopVideo();
    });

    // Optional: stop video when pressing Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && videoModal.classList.contains("show")) {
            stopVideo();
        }
    });
});

// WP blog modal — auto-clickable post images
document.addEventListener("DOMContentLoaded", function () {
    if (!window.location.hostname.startsWith("blog.")) return;

    const postImages = document.querySelectorAll(".e-content img");

    postImages.forEach((img) => {
        // Skip images already wrapped in a modal trigger
        if (img.closest('[data-toggle="modal"]')) return;

        // Skip images that are part of a Jetpack gallery
        if (
            img.closest(
                ".tiled-gallery, .wp-block-jetpack-tiled-gallery, " +
                    ".gallery, .wp-block-gallery, " +
                    ".jetpack-gallery"
            )
        )
            return;

        img.style.cursor = "pointer";

        img.addEventListener("click", function () {
            const modalImg = document.querySelector("#modal .modal-body img");
            const modalCaption = document.querySelector("#modal-caption");

            if (modalImg) {
                modalImg.setAttribute("src", this.getAttribute("src"));
                modalImg.setAttribute("alt", this.getAttribute("alt") || "");
            }

            if (modalCaption) {
                const figcaption =
                    this.closest("figure")?.querySelector("figcaption");
                modalCaption.textContent = figcaption
                    ? figcaption.textContent
                    : "";
            }

            hideNavContainer();
            $("#modal").modal("show");
        });
    });
});

// Webmention reply images — open in the shared image modal.
// Replies are fetched via AJAX and injected after DOMContentLoaded, so this
// listener is delegated on document instead of bound to individual images.
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (e) {
        const img = e.target.closest(
            "#webmentions-comments .reply-attachment-img"
        );
        if (!img) return;

        const modalImg = document.querySelector("#modal .modal-body img");
        if (modalImg) {
            modalImg.setAttribute("src", img.getAttribute("src"));
            modalImg.setAttribute("alt", img.getAttribute("alt") || "");
        }

        const modalCaption = document.querySelector("#modal-caption");
        if (modalCaption) modalCaption.textContent = "";

        hideNavContainer();
        $("#modal").modal("show");
    });
});

// Album modal — populated with data from lastfm-albums-fetch.js
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

function openAlbumModal(index) {
    const album = getAlbumByIndex(index);
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

    const modalAmbient = document.getElementById("albumModalAmbient");
    if (modalAmbient) {
        modalAmbient.style.backgroundImage = `url("${finalImageUrl}")`;
    }

    document.getElementById("albumModalLinks").innerHTML =
        buildAlbumStreamingLinksHTML(album);
}

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

// Album covers render asynchronously after the Last.fm fetch resolves,
// so wait for lastfm-albums-fetch.js to signal the grid is in the DOM.
document.addEventListener("lastfmAlbumsRendered", setupAlbumClickHandlers);

// #stuff-i-like modal
/*
document.addEventListener("DOMContentLoaded", function () {
    // Button that opens up the modal
    const stuffILikeBtn = document.getElementById("stuff-i-like");

    stuffILikeBtn.addEventListener("click", function () {
        // Hide nav container when stuff-i-like modal opens
        hideNavContainer();

        const modalBody = document.querySelector("#modal .modal-body");

        // Clear previous content
        modalBody.innerHTML = "";

        // Add description text
        const description = document.createElement("p");
        description.textContent =
            "Cierra este modal y vuélvelo a abrir para ver una recomendación diferente.";
        modalBody.appendChild(description);

        // Creating the Shoutouts widget
        const script = document.createElement("script");
        script.src = "https://shoutouts.page/embed/TiXVUqxaKaDqToHwFjQU.js";
        script.defer = true;

        // Insert the Shoutouts script tag
        modalBody.appendChild(script);
    });
});
*/
