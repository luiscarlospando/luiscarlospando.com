(function () {
    let ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    };

    ready(() => {
        /* Do things after DOM has fully loaded */

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

        // Using Intersection Observer API to detect when the element is expanded
        if (collapseIntro && btnReadMore) {
            collapseIntro.addEventListener("show.bs.collapse", () => {
                btnReadMore.innerHTML =
                    '<i class="fa-solid fa-minus"></i> Leer menos';
            });

            collapseIntro.addEventListener("hidden.bs.collapse", () => {
                if (btnReadMore.classList.contains("collapsed")) {
                    btnReadMore.innerHTML =
                        '<i class="fa-solid fa-plus"></i> Leer más';
                }
            });
        }

        // Tooltips
        $('[data-toggle="tooltip"]').tooltip();

        // Progress bar
        $(window).scroll(function () {
            let s = $(window).scrollTop(),
                d = $(document).height(),
                c = $(window).height();
            scrollPercent = (s / (d - c)) * 100;
            let position = scrollPercent;

            $("#progress-bar").attr("value", position);
        });

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
        // 5. It doesn't select links inside elements with the class of .uses
        const links = document.querySelectorAll('a[target="_blank"]');

        links.forEach((link, index) => {
            // Verify that the link is NOT in any of the exclusion conditions
            if (
                !link.closest("header") &&
                !link.closest("footer") &&
                !link.classList.contains("btn") &&
                !link.closest(".mastodon") &&
                !link.closest(".uses")
            ) {
                console.log(`Link ${index}:`, {
                    href: link.href,
                    target: link.target,
                    hasBtn: link.classList.contains("btn"),
                    inHeader: link.closest("header"),
                    inFooter: link.closest("footer"),
                    inMastodon: link.closest(".mastodon"),
                    inUses: link.closest(".uses"),
                });

                const icon = document.createElement("i");
                icon.className = "fa-solid fa-arrow-up-right-from-square";
                link.appendChild(icon);

                console.log(`Ícono añadido al link ${index}`);
            }
        });
    });
})();
