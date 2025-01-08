import { initStatusManager } from "./statuslog.js";

(function () {
    let ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    };

    ready(() => {
        /* Do things after DOM has fully loaded */

        // Run Statuslog main function
        initStatusManager();

        // Remove the focus on burger button
        const btnBurger = document.getElementById("btn-burger");

        btnBurger.addEventListener("click", () => {
            btnBurger.blur(); // Removes the focus
        });

        // Add Animate.css
        const header = document.querySelector("header");
        const heymijotvLiveHeader = document.getElementById(
            "heymijotv-live-alert"
        );
        const siteBody = document.querySelector(".site-body");
        const footer = document.querySelector("footer");

        setTimeout(() => {
            header.classList.add("animated", "fadeInDown");
        }, 800);

        setTimeout(() => {
            heymijotvLiveHeader.classList.add("animated", "fadeIn");
        }, 1800);

        siteBody.classList.add("animated", "fadeIn");
        footer.classList.add("animated", "fadeIn");

        // Enable Last.fm now playing song
        $("#lastfm").lastplayed({
            apikey: "28dd68a56fe0bebb7db5a287d6fdb4bc",
            username: "luiscarlospando",
            refresh: 30,
        });

        // Read more button
        const collapseIntro = document.getElementById("collapseIntro");
        const btnReadMore = document.querySelector("#btn-read-more");

        if (collapseIntro && btnReadMore) {
            // Handle the change of the state of the collapse event
            $(collapseIntro).on(
                "show.bs.collapse hide.bs.collapse",
                function (e) {
                    const isExpanding = e.type === "show";
                    btnReadMore.innerHTML = isExpanding
                        ? '<i class="fa-solid fa-minus"></i> Leer menos'
                        : '<i class="fa-solid fa-plus"></i> Leer más';
                }
            );

            // Handle the click on the Font Awesome icon
            btnReadMore.addEventListener("click", (e) => {
                if (e.target.tagName.toLowerCase() === "i") {
                    e.preventDefault();
                    e.stopPropagation();
                    $(collapseIntro).collapse("toggle");
                }
            });
        }

        // Tooltips
        $('[data-toggle="tooltip"]').tooltip();

        // Progress bar
        function updateProgressBar() {
            const progressBar = document.getElementById("progress-bar");
            if (!progressBar) return;

            window.addEventListener(
                "scroll",
                () => {
                    // Total page height minus total window height
                    const totalHeight =
                        document.documentElement.scrollHeight -
                        window.innerHeight;
                    // Current scroll position
                    const scrollPosition = window.scrollY;
                    // Percentage calculation
                    const scrollPercent = (scrollPosition / totalHeight) * 100;

                    // Updates the progress bar value
                    progressBar.value = scrollPercent;
                },
                { passive: true }
            ); // Passive: true improves scroll performance
        }

        // Run progress bar function
        updateProgressBar();

        // Responsive YouTube embeds
        const youtubePlayers = document.querySelectorAll(".youtube-player");

        if (youtubePlayers) {
            const embedResponsiveWrapper = document.createElement("div");
            embedResponsiveWrapper.classList.add(
                "embed-responsive",
                "embed-responsive-16by9"
            );

            for (let i = 0; i < youtubePlayers.length; i++) {
                const embedResponsiveWrapper = document.createElement("div");
                embedResponsiveWrapper.classList.add(
                    "embed-responsive",
                    "embed-responsive-16by9"
                );

                youtubePlayers[i].parentNode.insertBefore(
                    embedResponsiveWrapper,
                    youtubePlayers[i]
                );
                embedResponsiveWrapper.appendChild(youtubePlayers[i]);
            }
        }

        // Add lazy loading to all images
        let images = document.querySelectorAll("img");

        images.forEach((img) => {
            img.setAttribute("loading", "lazy");
        });

        // Enabling Font Awesome Pseudo Elements
        window.FontAwesomeConfig = {
            searchPseudoElements: true,
        };

        // Copy to clipboard instantiation
        new ClipboardJS(".btn");

        // Add button classes to elements in pagination
        const pageNumbers = document.querySelectorAll(".page-numbers");
        pageNumbers.forEach((element) => {
            element.classList.add("btn", "btn-primary");
        });

        // Add Font Awesome external links icon to external links
        // This code:
        // 1. Links containing target="_blank"
        // 2. It doesn't select links inside the header and footer
        // 3. It doesn't select links with the class of .btn
        // 4. It doesn't select links inside elements with the class of .mastodon
        // 5. It doesn't select links with the class of .btn-app-icon
        const links = document.querySelectorAll('a[target="_blank"]');

        links.forEach((link, index) => {
            // Add check for img tag inside the link
            const hasImage = link.querySelector("img");

            // Verify that the link is NOT in any of the exclusion conditions
            if (
                !link.closest("header") &&
                !link.closest("footer") &&
                !link.classList.contains("btn") &&
                !link.closest(".mastodon") &&
                !link.classList.contains("btn-app-icon") &&
                !hasImage
            ) {
                console.log(`Link ${index}:`, {
                    href: link.href,
                    target: link.target,
                    hasBtn: link.classList.contains("btn"),
                    inHeader: link.closest("header"),
                    inFooter: link.closest("footer"),
                    inMastodon: link.closest(".mastodon"),
                    hasBtnAppIcon: link.classList.contains("btn-app-icon"),
                    hasImage: hasImage,
                });

                const icon = document.createElement("i");
                icon.className = "fa-solid fa-arrow-up-right-from-square";
                link.appendChild(icon);

                console.log(`Ícono añadido al link ${index}`);
            }
        });
    });
})();
