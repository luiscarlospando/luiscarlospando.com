(function() {
    let ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    }
  
    ready(() => { 
        /* Do things after DOM has fully loaded */
        
        // Enable nav menu
        $('#navigation').mmenu({
            classes: "mm-slide",
            "slidingSubmenus": true,
            "header": {
                "title": "LuisCarlosPando.com",
                "add": true,
                "update": true
            },
            "footer": {
                "add": true,
                "title": "Hi, how are you? 🖖"
            },
            "searchfield": {
                "placeholder": "Buscar",
                "noResults": "No se encontraron resultados.",
                "add": true,
                "search": false
            },
            dragOpen: {
                open: true
            }
        });

        // Search input
        $("#navigation .mm-search input").keyup(function (e) {
            if (e.keyCode == 13) {
                window.location.href = 'https://blog.luiscarlospando.com/?s=' + $(this).val();
            }
        });

        // Remove the focus on burger button
        const btnBurger = document.getElementById("btn-burger");

        btnBurger.addEventListener("click", () => {
            btnBurger.blur(); // Removes the focus
        })

        // Add Animate.css
        const header = document.querySelector('header');
        const twitchLiveHeader = document.getElementById('twitch-livestream-alert');
        const m7gpLiveHeader = document.getElementById('m7gp-livestream-alert');
        const siteBody = document.querySelector('.site-body');
        const footer = document.querySelector('footer');

        setTimeout(() => {
            header.classList.add('animated', 'fadeInDown');
        }, 800);

        setTimeout(() => {
            twitchLiveHeader.classList.add('animated', 'fadeIn');
            m7gpLiveHeader.classList.add('animated', 'fadeIn');
        }, 1800);

        siteBody.classList.add('animated', 'fadeIn');
        footer.classList.add('animated', 'fadeIn');

        // Enable Last.fm now playing song
        $('#lastfm').lastplayed({
            apikey: '28dd68a56fe0bebb7db5a287d6fdb4bc',
            username: 'luiscarlospando',
            refresh: 30
        });

        // On scroll events
        window.onscroll = function() {
            // Show/hide navbar
            if (window.scrollY >= 20) {
                $(".nav-container").addClass("scrolled-position");
            } else {
                $(".nav-container").removeClass("scrolled-position");
            }

            // Show/hide the "back to top" link and animate the "now playing" notification
            if (window.scrollY >= 300) {
                $('.cd-top').addClass("cd-is-visible");
                $('.nowplaying').addClass("positionate-nowplaying");
            } else {
                $('.cd-top').removeClass("cd-is-visible");
                $('.nowplaying').removeClass("positionate-nowplaying");
            }
        };

        // Smooth scroll to top
        $('#back-to-top').on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, 700);
        });

        // Read more button
        $('#collapseIntro').on('show.bs.collapse', function () {
            $('#btn-read-more').html('<i class="fa-solid fa-minus"></i> Leer menos');
        });

        $('#collapseIntro').on('hidden.bs.collapse', function () {
            $('#btn-read-more.collapsed').html('<i class="fa-solid fa-plus"></i> Leer más');
        });

        // Tooltips
        $('[data-toggle="tooltip"]').tooltip();

        // Progress bar
        $(window).scroll(function () {
            let s = $(window).scrollTop(),
                d = $(document).height(),
                c = $(window).height();
                scrollPercent = (s / (d-c)) * 100;
            let position = scrollPercent;

            $("#progress-bar").attr('value', position);
        });

        // Responsive YouTube embeds
        const youtubePlayers = document.querySelectorAll(".youtube-player");

        if (youtubePlayers) {
            const embedResponsiveWrapper = document.createElement("div");
            embedResponsiveWrapper.classList.add("embed-responsive", "embed-responsive-16by9");

            for (let i = 0; i < youtubePlayers.length; i++) {
                const embedResponsiveWrapper = document.createElement("div");
                embedResponsiveWrapper.classList.add("embed-responsive", "embed-responsive-16by9");

                youtubePlayers[i].parentNode.insertBefore(embedResponsiveWrapper, youtubePlayers[i]);
                embedResponsiveWrapper.appendChild(youtubePlayers[i]);
            }
        }

        // Add lazy loading to all images
        let images = document.querySelectorAll('img');

        images.forEach((img) => {
            img.setAttribute("loading", "lazy");
        });

        // Retrieve system status via Instatus API
        $.get('https://luiscarlospando.instatus.com/summary.json', function (data) {
            let btnSiteVersion = document.getElementById("site-version");
            let status = data.page.status;
            let systemStatus = "";

            switch(status) {
                case "UP":
                    btnSiteVersion.classList.add("badge-success");
                    systemStatus = '<i class="fa-solid fa-circle-check"></i> En funcionamiento';
                    break;
                case "HASISSUES":
                    btnSiteVersion.classList.add("badge-danger");
                    systemStatus = '<i class="fa-solid fa-circle-exclamation"></i> Hay problemas';
                    break;
                case "UNDERMAINTENANCE":
                    btnSiteVersion.classList.add("badge-warning");
                    systemStatus = '<i class="fa-solid fa-wrench"></i> En mantenimiento';
                    break;
                default:
                    btnSiteVersion.classList.add("badge-info");
                    systemStatus = '<i class="fa-solid fa-circle-minus"></i> Sin información';
            }

            $('#system-status').append(systemStatus);
        });

        // Enabling Font Awesome Pseudo Elements
        window.FontAwesomeConfig = {
            searchPseudoElements: true
        }

        // Copy to clipboard instantiation
        new ClipboardJS('.btn');

        // Add button classes to elements in pagination
        $(window).on('load', function () {
            $(".page-numbers").addClass("btn btn-primary");
        });
    });
})();