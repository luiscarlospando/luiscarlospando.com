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
                "title": "Random fact about me: I love Geography 🌎"
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
    });
})();