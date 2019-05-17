/*!
* LuisCarlosPando.com
* Copyright © 2014-2019 Luis Carlos Pando.
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

        // Enable Last.fm last played song
        $('#lastfm').lastplayed({
            apikey: '0665c6724df040e8c33e44b1eb1ba888',
            username: 'hmstarlight',
            refresh: 30
        });

        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 1) {
                $(".nav-container").addClass("scrolled-position");
            } else if (scroll <= 0) {
                $(".nav-container").removeClass("scrolled-position");
            }
        });

        // Browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
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
        var winHeight = $(window).height(),
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

        // RSS Feed
        jQuery(function ($) {
            $("#blog").rss("https://blog.luiscarlospando.com/feed", {
                limit: 1,
                ssl: true,
                layoutTemplate: "<div style='display: inline;'>{entries}</div>",
                entryTemplate: '<a href="{url}">{title}</a>'
            });
        });
    });

    // Enabling Font Awesome Pseudo Elements
    window.FontAwesomeConfig = {
        searchPseudoElements: true
    }
    
})();