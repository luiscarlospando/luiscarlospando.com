(function () {
    let ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    };

    ready(() => {
        /* Do things after DOM has fully loaded */

        // Variable to store the facts
        let randomFacts = [];
        let menuAPI = null;

        // Function to get a random text from the randomFacts array
        function getRandomFact() {
            if (randomFacts.length === 0) {
                return "Cargando...";
            }
            return randomFacts[Math.floor(Math.random() * randomFacts.length)];
        }

        // Function to update the menu footer
        function updateMenuFooter() {
            // Try different common mmenu selectors
            const footerSelectors = [
                ".mm-footer",
                "#mm-1 .mm-footer",
                ".mm-menu .mm-footer",
            ];

            for (const selector of footerSelectors) {
                const footerElement = document.querySelector(selector);
                if (footerElement) {
                    // Look for the span or text container
                    const textElement =
                        footerElement.querySelector("span") || footerElement;
                    textElement.textContent = getRandomFact();
                    console.log(
                        "Footer updated with:",
                        textElement.textContent
                    );
                    return;
                }
            }
            console.warn("Menu footer element not found");
        }

        // Function to load facts from JSON
        async function loadRandomFacts() {
            try {
                const response = await fetch("/assets/data/random-facts.json");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                randomFacts = data.facts;

                console.log("Facts loaded:", randomFacts.length);

                // Update the footer after loading data
                updateMenuFooter();
            } catch (error) {
                console.error("Error loading random facts:", error);
                randomFacts = ["Error loading facts 😕"];
                updateMenuFooter();
            }
        }

        // Enable nav menu
        menuAPI = $("#navigation").mmenu({
            classes: "mm-slide",
            slidingSubmenus: true,
            header: {
                title: "Luis Carlos Pando",
                add: true,
                update: true,
            },
            footer: {
                add: true,
                title: "Loading...",
            },
            searchfield: {
                placeholder: "Search",
                noResults: "No results found.",
                add: true,
                search: false,
            },
            dragOpen: {
                open: true,
            },
        });

        // Load facts after initializing the menu
        // Wait a bit to ensure the menu is fully rendered
        setTimeout(() => {
            loadRandomFacts();
        }, 100);

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
