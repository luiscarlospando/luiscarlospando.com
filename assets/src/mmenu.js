(function () {
    let ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    };

    ready(() => {
        /* Do things after DOM has fully loaded */

        // Define random facts about me
        const randomFacts = [
            "Me encanta y apasiona la geografía 🌎",
            "Me gusta mucho experimentar con nuevas apps para mejorar mi workflow 📱",
            "Mi ciudad favorita es Austin, Texas",
            "Aprendí a hablar inglés sin tomar clases formales 🗣️",
            "Me falta un cacho en la oreja izquierda 👂",
            "Mi banda favorita es Funeral for a Friend 👨‍🎤",
            "Me encanta todo lo que tenga que ver con las estrellas y el espacio exterior 🧑‍🚀",
            "Me dediqué un buen rato de mi vida a organizar toquines en mi ciudad 🎸",
            "Mi bebida favorita es la cerveza 🍺",
            "No me encanta el chocolate 🍫, te lo como, pero no nace de mi",
            "Mi esposa y yo coleccionamos vinilos 🔈",
            "Soy un grammar snob",
            "Mi videojuego favorito es Star Fox 64 🦊",
            "A los 16 años lancé mi primer página de Internet 🌐",
            "Mi marca favorita de autos es Volkswagen/Audi 🚗",
            "Soy #TeamVans 👟",
            "Batallo mucho para decirle No a la gente (people pleaser)",
            "Me encanta estar en mi computadora y hacerle al hacker ⌨️",
            "Una vez me canastearon en un bar 💊",
            "Una vez me agarraon a golpes unos cholos montoneros a mi y a un compa 💥",
            "La primera vez que fui a Las Vegas fue el año que cumplía 21 años pero no entré a ningún casino por ser todavía menor de edad",
            "Me gusta sacar canciones en la guitarra de oído 👂🎸",
            "No sabía que me gustaba tanto el cine hasta que conocí a mi esposa 🎬",
            "No me metí a nadar a el mar sino hasta los 38 años 🌊",
            "Mi comida favorita son los tacos 🌮",
            "Si hay un juego que pueda presumir que soy bueno jugando, es en Splatoon 🐙",
            "Para mi no existe videojuego más perfecto que The Legend of Zelda: A Link to the Past 🧚",
            "Mi consola favorita ever es el Nintendo Switch",
            "Me gustan mucho las rutinas, me ondea cuando algo se sale de lo rutinario",
            "#TeamFrío por siempre perros ⛄",
            "Desde que acepté a Jesús, todo cambió para bien en mi vida ✝️",
            "A mi esposa y a mi nos encanta viajar y conocer lugares juntos ✈️",
            "Tengo dos hermanas gemelas 👬",
            "Amo codear ⌨️",
            "No tomaba agua hasta que el Liquid Death llegó a mi vida 🥤🤘",
            "Una vez entrando a un Oxxo llegó un don a hacérmela de pedo de la nada, unos cholos que estaban cerca tiraron paro 🫶",
            "Toda mi vida he gozado de muy buena salud (misteriosamente 🤨)",
            "Admito que me gusta Taylor Swift 🎤",
            "No me gusta tomarme ni que me tomen fotos 📸",
            "Contrario a la creencia popular: soy muy introvertido 😩",
            "Podría vivir comiendo Chips fuego por siempre 🍟",
            "Me gusta mucho Space Ghost: Coast to Coast y el Adult Swim de los '90s '2000s",
            "Extraño los días de MySpace 🧑‍💻",
            "Extraño los días de Limewire 🎧",
            "Extraño los días de SoulSeek 🎧🧑‍💻",
            "Extraño los días de Tumblr 🧑‍💻",
            "Extraño los días de PureVolume 🎧🧑‍💻",
            "Extraño los días de Vans Warped Tour 🎸",
            "Nunca cargo dinero físico, todo con tarjeta o Apple Pay 💳",
            "Amo automatizar todo en mi casa y a mi esposa no tanto 😂",
            "De niño me gustaba ir a pescar con mi papá 🎣",
            "Como buen chihuahuita, me mama ir a El Paso, Texas 🇺🇸",
            "La neta a mi si me gusta Chihuahua para vivir 🏡",
            "La neta de morrito era buenón jugando basket 🏀",
            "Tengo una bici que me gusta mucho pero no uso como quisiera 🚲",
            "Tengo tres tatuajes ✌️",
            "La mera neta si me gusta la weed, pa' qué me hago tonto 🚬",
            "Tengo un Color TV-Game de Nintendo 🕹️",
            "Soy emo y siempre seré emo 👨‍🎤",
            "Me considero audiófilo 🙂‍↕️🎧",
            "Extraño los días de la NBA de los '90s 🏀",
            "Me enamoré a primera vista de mi esposa ❤️",
            "La comida mexicana no tiene comparación 🇲🇽",
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
