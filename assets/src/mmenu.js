(function () {
    let ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    };

    ready(() => {
        /* Do things after DOM has fully loaded */

        // Variable para almacenar los facts
        let randomFacts = [];

        // Function to get a random text from the randomFacts array
        function getRandomFact() {
            if (randomFacts.length === 0) {
                return "Cargando...";
            }
            return randomFacts[Math.floor(Math.random() * randomFacts.length)];
        }

        // Función para cargar los facts desde el JSON
        async function loadRandomFacts() {
            try {
                const response = await fetch("/assets/data/random-facts.json");
                const data = await response.json();
                randomFacts = data.facts;

                // Actualizar el footer del menú después de cargar los datos
                const footerElement = document.querySelector(
                    "#mm-1 .mm-footer span"
                );
                if (footerElement) {
                    footerElement.textContent = getRandomFact();
                }
            } catch (error) {
                console.error("Error al cargar random facts:", error);
                randomFacts = ["Error cargando facts 😕"];
            }
        }

        // Cargar los facts antes de inicializar el menú
        loadRandomFacts();

        // Enable nav menu
        $("#navigation").mmenu({
            classes: "mm-slide",
            slidingSubmenus: true,
            header: {
                title: "Luis Carlos Pando",
                add: true,
                update: true,
            },
            footer: {
                add: true,
                title: getRandomFact(),
            },
            searchfield: {
                placeholder: "Buscar",
                noResults: "No se encontraron resultados.",
                add: true,
                search: false,
            },
            dragOpen: {
                open: true,
            },
        });

        // Search input
        document
            .querySelector("#navigation .mm-search input")
            .addEventListener("keyup", function (e) {
                if (e.keyCode === 13) {
                    window.location.href =
                        "https://blog.luiscarlospando.com/?s=" + this.value;
                }
            });
    });
})();
