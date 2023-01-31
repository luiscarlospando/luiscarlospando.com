(function() {
    let ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    }
  
    ready(() => { 
        /* Do things after DOM has fully loaded */
        
        // Enable nav menu
        $("#menu").mmenu({
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
                open: false
            }
        });

        // Search input
        $("#menu .mm-search input").keyup(function (e) {
            if (e.keyCode == 13) {
                window.location.href = 'https://blog.luiscarlospando.com/?s=' + $(this).val();
            }
        });

        // Add Animate.css
        const header = document.querySelector('header');
        const m7gpLiveHeader = document.getElementById('m7gp-livestream-alert');
        const siteBody = document.querySelector('.site-body');
        const footer = document.querySelector('footer');

        setTimeout(() => {
            header.classList.add('animated', 'fadeInDown');
        }, 800);

        setTimeout(() => {
            m7gpLiveHeader.classList.add('animated', 'fadeIn');
        }, 1800);

        siteBody.classList.add('animated', 'fadeIn');
        footer.classList.add('animated', 'fadeIn');

        // Enable Last.fm last played song
        $('#lastfm').lastplayed({
            apikey: '0665c6724df040e8c33e44b1eb1ba888',
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
        $('.cd-top').on('click', function (event) {
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
        let winHeight = $(window).height(),
            docHeight = $(document).height(),
            progressBar = $('progress'),
            max, value;

        // Set the max scrollable area
        max = docHeight - winHeight;
        progressBar.attr('max', max);

        $(document).on('scroll', function () {
            value = $(window).scrollTop();
            progressBar.attr('value', value);
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

        // WP REST API actions
        // Retrieve latest posts via API and fetch link to show in homepage
        $.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=5', function (data) {
            // console.log(data);
            for (let i = 0; i < data.length; i++) {
                $('#latest-posts').append('<li><a href="' + data[i].link + '" data-toggle="tooltip" data-placement="top" title="' + data[i].title.rendered + '">' + data[i].title.rendered + '</a></li>');
            }
        });

        // Retrieve latest post via API and fetch link
        $.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1', function (data) {
            // console.log(data);
            $('#blog').append('<a href="' + data[0].link + '" data-toggle="tooltip" data-placement="top" title="' + data[0].title.rendered + '">' + data[0].title.rendered + '</a>');
        });

        // Retrieve latest post from tag 'Mode 7 Podcast' via API and fetch link
        $.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1&tags=778', function (data) {
            // console.log(data);
            $('#mode-7-podcast-latest-episode').append('<a href="' + data[0].link + '" data-toggle="tooltip" data-placement="top" title="' + data[0].title.rendered + '">' + data[0].title.rendered + '</a>');
        });

        // Retrieve latest post timestamp from tag 'Mode 7 Podcast' via API and fetch link
        $.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts?per_page=1&tags=778', function (data) {
            // console.log(data);
            $('#mode-7-podcast-latest-episode-timestamp').append('<a href="' + data[0].link + '"><code>Última actualización: ' + data[0].date + '</code></a>');
        });

        // Append total post count to element #contador-posts in "Acerca de" page
        $.get('https://blog.luiscarlospando.com/wp-json/wp/v2/posts', function (data, status, request) {
            postCount = request.getResponseHeader('x-wp-total');
            $('#contador-posts').append(postCount);
        });

        // Splatnet RSS Feed
        jQuery(function ($) {
            $("#splatlog").rss("https://stat.ink/@mijo.2.en-US.rss", {
                limit: 1,
                ssl: true,
                layoutTemplate: "<div style='display: inline;'>{entries}</div>",
                entryTemplate: '<a href="{url}" target="_blank">{title} <i class="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" data-placement="top" title="Abrir en nueva pestaña"></i></a>'
            });

            $("#splatlog-3").rss("https://stat.ink/@mijo/spl3.en-US.rss", {
                limit: 1,
                ssl: true,
                layoutTemplate: "<div style='display: inline;'>{entries}</div>",
                entryTemplate: '<a href="{url}" target="_blank">{title} <i class="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" data-placement="top" title="Abrir en nueva pestaña"></i></a>'
            });

            $("#splatlog-timestamp").rss("https://stat.ink/@mijo.2.en-US.rss", {
                limit: 1,
                ssl: true,
                layoutTemplate: "<div style='display: inline;'>{entries}</div>",
                entryTemplate: '<a href="https://stat.ink/@mijo/spl2" target="_blank"><code>Última actualización: {date}</code></a>'
            });

            $("#splatlog-3-timestamp").rss("https://stat.ink/@mijo.3.en-US.rss", {
                limit: 1,
                ssl: true,
                layoutTemplate: "<div style='display: inline;'>{entries}</div>",
                entryTemplate: '<a href="https://stat.ink/@mijo/spl3" target="_blank"><code>Última actualización: {date}</code></a>'
            });
        });

        // Retrieve latest post timestamp from stat.ink via API and fetch link (Splatoon 2)
        $.get('https://stat.ink/api/v2/user-stats?screen_name=mijo', function (data) {
            // Last update
            $('#last-updated').append(data.updated_at.iso8601);
            $('#last-updated-3').append(data.updated_at.iso8601);

            // Function to truncate percentages
            function truncate(value) {
                let result = Math.trunc(value * Math.pow(10, 2)) / Math.pow(10, 2);
                return result;
            }

            // Turf War
            $('#turf-battles').append(data.nawabari.battles);
            $('#turf-win_pct').append(truncate(data.nawabari.win_pct));
            $('#turf-kill_ratio').append(data.nawabari.kill_ratio);
            $('#turf-kill_total').append(data.nawabari.kill_total);
            $('#turf-kill_avg').append(truncate(data.nawabari.kill_avg));
            $('#turf-kill_per_min').append(truncate(data.nawabari.kill_per_min));
            $('#turf-death_total').append(data.nawabari.death_total);
            $('#turf-death_avg').append(truncate(data.nawabari.death_avg));
            $('#turf-death_per_min').append(truncate(data.nawabari.death_per_min));

            // Ranked Battle
            $('#ranked-battles').append(data.gachi.battles);
            $('#ranked-win_pct').append(truncate(data.gachi.win_pct));
            $('#ranked-kill_ratio').append(data.gachi.kill_ratio);
            $('#ranked-kill_total').append(data.gachi.kill_total);
            $('#ranked-kill_avg').append(truncate(data.gachi.kill_avg));
            $('#ranked-kill_per_min').append(truncate(data.gachi.kill_per_min));
            $('#ranked-death_total').append(data.gachi.death_total);
            $('#ranked-death_avg').append(truncate(data.gachi.death_avg));
            $('#ranked-death_per_min').append(truncate(data.gachi.death_per_min));

            // Current ranks
            $('#ranked-rainmaker').append(data.gachi.rules.hoko.rank_current);
            $('#ranked-splat-zones').append(data.gachi.rules.area.rank_current);
            $('#ranked-tower-control').append(data.gachi.rules.yagura.rank_current);
            $('#ranked-clam-blitz').append(data.gachi.rules.asari.rank_current);
        });

        // Retrieve latest post timestamp from stat.ink via API and fetch link (Splatoon 3)
        $.get('https://stat.ink/@mijo/spl3/index.json', function (data) {
            // Last update
            $('#last-updated-3').append(data.updated_at.iso8601);

            // Function to truncate percentages
            function truncate(value) {
                let result = Math.trunc(value * Math.pow(10, 2)) / Math.pow(10, 2);
                return result;
            }

            // Turf War
            $('#turf-battles-3').append(data.nawabari.battles);
            $('#turf-win_pct-3').append(truncate(data.nawabari.win_pct));
            $('#turf-kill_ratio-3').append(data.nawabari.kill_ratio);
            $('#turf-kill_total-3').append(data.nawabari.kill_total);
            $('#turf-kill_avg-3').append(truncate(data.nawabari.kill_avg));
            $('#turf-kill_per_min-3').append(truncate(data.nawabari.kill_per_min));
            $('#turf-death_total-3').append(data.nawabari.death_total);
            $('#turf-death_avg-3').append(truncate(data.nawabari.death_avg));
            $('#turf-death_per_min-3').append(truncate(data.nawabari.death_per_min));

            // Ranked Battle
            $('#ranked-battles-3').append(data.gachi.battles);
            $('#ranked-win_pct-3').append(truncate(data.gachi.win_pct));
            $('#ranked-kill_ratio-3').append(data.gachi.kill_ratio);
            $('#ranked-kill_total-3').append(data.gachi.kill_total);
            $('#ranked-kill_avg-3').append(truncate(data.gachi.kill_avg));
            $('#ranked-kill_per_min-3').append(truncate(data.gachi.kill_per_min));
            $('#ranked-death_total-3').append(data.gachi.death_total);
            $('#ranked-death_avg-3').append(truncate(data.gachi.death_avg));
            $('#ranked-death_per_min-3').append(truncate(data.gachi.death_per_min));

            // Current rank
            $('#ranked-3').append(data[0].rank_before.name.en_US);
            console.log(data[0]);
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

        // Show/Hide Mode 7 Grand Prix Livestream
        let DateTime = luxon.DateTime; // Initialization
        let dt = DateTime.now().setZone("America/Mexico_City");
        let dayOfTheWeek = dt.weekday;
        let time = dt.toFormat('HH');
        const m7gpLivestreamAlert = document.getElementById("m7gp-livestream-alert");
        const m7gpLivestream = document.getElementById("m7gp-livestream");
        const btnM7GP = document.getElementById("btn-m7gp");
        const luisCarlosPandoLivestream = document.getElementById("luiscarlospando-livestream");
        const luisCarlosPandoChat = document.getElementById("luiscarlospando-chat");
        const btnLuisCarlosPando = document.getElementById("btn-luiscarlospando");

        // Display livestream and livestream alert only on Thursday nights
        if (dayOfTheWeek == 4 && (time >= 21 && time < 23)) {
            if (m7gpLivestream && btnM7GP && luisCarlosPandoLivestream && luisCarlosPandoChat && btnLuisCarlosPando) {
                m7gpLivestream.style.display = "block";
                btnM7GP.style.display = "inline-block";

                luisCarlosPandoLivestream.style.display = "none";
                luisCarlosPandoChat.style.display = "none";
                btnLuisCarlosPando.style.display = "none";
            }

            m7gpLivestreamAlert.style.display = "block";
        } else {
            if (m7gpLivestream && btnM7GP) {
                m7gpLivestream.style.display = "none";
                btnM7GP.style.display = "none";
            }

            m7gpLivestreamAlert.style.display = "none";
        }
    });
})();