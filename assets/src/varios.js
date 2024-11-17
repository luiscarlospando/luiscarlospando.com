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
        $("#collapseIntro").on("show.bs.collapse", function () {
            $("#btn-read-more").html(
                '<i class="fa-solid fa-minus"></i> Leer menos'
            );
        });

        $("#collapseIntro").on("hidden.bs.collapse", function () {
            $("#btn-read-more.collapsed").html(
                '<i class="fa-solid fa-plus"></i> Leer más'
            );
        });

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
        $(window).on("load", function () {
            $(".page-numbers").addClass("btn btn-primary");
        });
    });
})();
