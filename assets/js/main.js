/*!
* LuisCarlosPando.com
* © 2022 Luis Carlos Pando
* Made with love in Chihuahua, Mexico.
*/

(function() {
    $(document).ready(function () {
        // Enable nav menu
        $("#menu").mmenu({
            classes: "mm-slide",
            "slidingSubmenus": true,
            "header": {
                "title": "Menú",
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

        $("#menu .mm-search input").keyup(function (e) {
            if (e.keyCode == 13) {
                window.location.href = 'https://blog.luiscarlospando.com/?s=' + $(this).val();
            }
        });

        // Add Animate.css
        const header = document.querySelector('header');
        const siteBody = document.querySelector('.site-body');
        const footer = document.querySelector('footer');

        setTimeout(function () {
            header.classList.add('animated', 'fadeInUp');
        }, 800);
        siteBody.classList.add('animated', 'fadeIn');
        footer.classList.add('animated', 'fadeIn');

        // Enable Last.fm last played song
        $('#lastfm').lastplayed({
            apikey: '0665c6724df040e8c33e44b1eb1ba888',
            username: 'luiscarlospando',
            refresh: 30
        });

        $(window).scroll(function () {
            let scroll = $(window).scrollTop();
            if (scroll >= 1) {
                $(".nav-container").addClass("scrolled-position");
            } else if (scroll <= 0) {
                $(".nav-container").removeClass("scrolled-position");
            }
        });

        // Browser window scroll (in pixels) after which the "back to top" link is shown
        const offset = 300,
            // Browser window scroll (in pixels) after which the "back to top" link opacity is reduced
            offset_opacity = 1200,
            // Duration of the top scrolling animation (in ms)
            scroll_top_duration = 700,
            // Grab the "back to top" link
            $back_to_top = $('.cd-top');

        // Hide or show the "back to top" link
        $(window).scroll(function () {
            ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
            if ($(this).scrollTop() > offset_opacity) {
                $back_to_top.addClass('cd-fade-out');
            }
        });

        // Smooth scroll to top
        $back_to_top.on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration
            );
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
        const youtubePlayer = document.querySelector(".youtube-player");
        const embedResponsiveWrapper = document.createElement("div");

        embedResponsiveWrapper.classList.add("embed-responsive", "embed-responsive-16by9");
        youtubePlayer.parentNode.insertBefore(embedResponsiveWrapper, youtubePlayer);
        embedResponsiveWrapper.appendChild(youtubePlayer);


        // WP REST API actions
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

        // RSS Feed
        jQuery(function ($) {
            $("#splatlog").rss("https://stat.ink/@mijo.2.en-US.rss", {
                limit: 1,
                ssl: true,
                layoutTemplate: "<div style='display: inline;'>{entries}</div>",
                entryTemplate: '<a href="{url}" target="_blank">{title} <i class="fas fa-external-link-alt" data-toggle="tooltip" data-placement="top" title="Abrir en nueva pestaña"></i></a>'
            });

            $("#splatlog-timestamp").rss("https://stat.ink/@mijo.2.en-US.rss", {
                limit: 1,
                ssl: true,
                layoutTemplate: "<div style='display: inline;'>{entries}</div>",
                entryTemplate: '<a href="https://stat.ink/@mijo/spl2" target="_blank"><code>Última actualización: {date}</code></a>'
            });
        });

        // Retrieve latest post timestamp from stat.ink via API and fetch link
        $.get('https://stat.ink/api/v2/user-stats?screen_name=mijo', function (data) {
            // Last update
            $('#last-updated').append(data.updated_at.iso8601);

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
    let dt = DateTime.now().setZone("America/Chihuahua");
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
})();