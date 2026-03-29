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
    // Only run on the WP blog (subdomain: blog.*)
    if (!window.location.hostname.startsWith("blog.")) return;

    const postImages = document.querySelectorAll(".e-content img");

    postImages.forEach((img) => {
        // Skip images that are already wrapped in a modal trigger
        if (img.closest('[data-toggle="modal"]')) return;

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
