(function () {
    let ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    };

    ready(() => {
        /* Do things after DOM has fully loaded */

        // Define random facts about me
        const randomFacts = [
            "Me causa fascinación la geografía 🌎",
            "Me la paso calando apps y probando cosas nuevas 📱",
            "Mi ciudad favorita (aparte de Chihuahua) es Austin, Texas 🤠",
            "Aprendí solillo a hablar inglés, meramente por gusto 🗣️",
            "Me falta un cacho en la oreja izquierda 👂",
            "Mi banda favorita es Touché Amoré 👨‍🎤",
            "Me causa fascinación la astronomía 🧑‍🚀",
            "Dediqué un buen rato de mi vida a organizar toquines en mi ciudad 🎸",
            "Soy bien cervecero 🍺",
            "No me encanta el chocolate 🍫, te lo como, pero no nace de mi",
            "Colecciono vinilos 🔈",
            "Soy un grammar snob",
            "Mi videojuego favorito es Star Fox 64 🦊",
            "A los 16 años desarrollé mi primer página de Internet 🌐",
            "Mi marca favorita de autos es Volkswagen/Audi 🚗",
            "Puro #TeamVans 👟",
            "Batallo mucho para decir que NO",
            "Si por mi fuera me la pasaba todo el día en mi computadora ⌨️",
            "Una vez me canastearon en un bar 💊",
            "Una vez me agarraon a golpes unos cholos montoneros a mi y a un compa 💥",
            "La primera vez que fui a Las Vegas fue el año que cumplía 21 años pero no entré a ningún casino por ser todavía menor de edad",
            "Medio puedo sacar canciones en la guitarra solo de oído 👂🎸",
            "Puro cine de arte de preferencia 🎬",
            "No me metí a nadar a el mar sino hasta los 38 años 🌊",
            "Los tacos 🌮 es mi comida favorita",
            "Si hay un juego que pueda presumir que soy bueno jugando, es Splatoon 🐙",
            "Para mi no existe videojuego más perfecto que The Legend of Zelda: A Link to the Past 🧚",
            "Mi consola favorita ever es el Nintendo Switch",
            "Me gustan mucho las rutinas, me ondea cuando algo se sale de lo rutinario",
            "#TeamFrío por siempre perros ⛄",
            "Desde que acepté a Jesús, todo cambió para bien en mi vida ✝️",
            "Tengo dos hermanas gemelas 👬",
            "Amo codear y regarla ⌨️",
            "No tomaba agua hasta que el Liquid Death llegó a mi vida 🥤🤘",
            "Una vez entrando a un Oxxo llegó un don a hacérmela de pedo de la nada, unos cholos que estaban cerca tiraron paro 🫶",
            "Toda mi vida he gozado de muy buena salud (misteriosamente 🤨)",
            "No me gusta tomarme ni que me tomen fotos 📸",
            "Contrario a la creencia popular: soy turbo introvertido 😩",
            "Podría vivir comiendo Chips fuego por siempre 🍟",
            "Me gusta mucho Space Ghost: Coast to Coast y el Adult Swim de los '90s '2000s",
            "Extraño los días de MySpace 🧑‍💻",
            "Extraño los días de Limewire 🎧",
            "Extraño los días de SoulSeek 🎧🧑‍💻",
            "Extraño los días de Tumblr 🧑‍💻",
            "Extraño los días de PureVolume 🎧🧑‍💻",
            "Extraño los días de Vans Warped Tour 🎸",
            "Nunca cargo dinero físico, todo con tarjeta o Apple Pay 💳",
            "Amo automatizar todo en mi casa",
            "De niño me gustaba ir a pescar con mi papá 🎣",
            "Como buen chihuahuita, me mama ir a El Paso, Texas 🇺🇸",
            "La neta a mi si me gusta Chihuahua para vivir 🏡",
            "La neta de morrillo era buenerón jugando basket 🏀",
            "Tengo una bici que me gusta mucho pero no uso como quisiera 🚲",
            "Tengo tres tatuajes ✌️",
            "La mera neta si me gusta la weed, pa' qué me hago tonto 🚬",
            "Tengo un Color TV-Game de Nintendo 🕹️",
            "Soy emo and always will be 👨‍🎤",
            "Soy dos-tres audiófilo 🙂‍↕️🎧",
            "La NBA de los '90s 🏀 fue lo mejor",
            "La comida mexa no tiene comparación 🇲🇽",
        ];

        // Function to get a random text from the randomFacts array
        function getRandomFact() {
            return randomFacts[Math.floor(Math.random() * randomFacts.length)];
        }

        // Enable nav menu
        $("#navigation").mmenu({
            classes: "mm-slide",
            slidingSubmenus: true,
            header: {
                title: "LuisCarlosPando.com",
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
