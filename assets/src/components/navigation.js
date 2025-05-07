import React from "react";
import { createRoot } from "react-dom/client";

function Navigation() {
    const siteButtons = [
        {
            id: "1",
            url: "https://luiscarlospando.com/",
            icon: "fa-solid fa-house",
            text: "Inicio",
            subButtons: [],
        },
        {
            id: "2",
            url: "https://blog.luiscarlospando.com/",
            icon: "fa-solid fa-file-pen",
            text: "Blog",
            subButtons: [
                {
                    id: "2-1",
                    url: "https://blog.luiscarlospando.com/personal/",
                    icon: "fa-solid fa-user",
                    text: "Personal",
                },
                {
                    id: "2-2",
                    url: "https://blog.luiscarlospando.com/musica/",
                    icon: "fa-solid fa-music",
                    text: "Música",
                },
                {
                    id: "2-3",
                    url: "https://blog.luiscarlospando.com/gaming/",
                    icon: "fa-solid fa-gamepad",
                    text: "Gaming",
                },
                {
                    id: "2-4",
                    url: "https://blog.luiscarlospando.com/photos/",
                    icon: "fa-solid fa-images",
                    text: "Fotos",
                },
                {
                    id: "2-5",
                    url: "https://blog.luiscarlospando.com/tech/",
                    icon: "fa-solid fa-computer",
                    text: "Tech",
                },
                {
                    id: "2-6",
                    url: "https://blog.luiscarlospando.com/coding/",
                    icon: "fa-solid fa-code",
                    text: "Coding",
                },
                {
                    id: "2-7",
                    url: "https://blog.luiscarlospando.com/diseno/",
                    icon: "fa-solid fa-pen-ruler",
                    text: "Diseño",
                },
                {
                    id: "2-8",
                    url: "https://blog.luiscarlospando.com/todo-lo-demas/",
                    icon: "fa-solid fa-arrow-pointer",
                    text: "Todo lo demás",
                },
                {
                    id: "2-9",
                    url: "https://blog.luiscarlospando.com/author/me/",
                    icon: "fa-solid fa-folder-open",
                    text: "Archivos del blog",
                },
                {
                    id: "2-10",
                    url: "https://blog.luiscarlospando.com/hashtags/",
                    icon: "fa-solid fa-hashtag",
                    text: "Explorar por hashtag",
                },
            ],
        },
        {
            id: "3",
            url: "https://luiscarlospando.com/links/",
            icon: "fa-solid fa-link",
            text: "Links",
            subButtons: [],
        },
        {
            id: "4",
            url: "https://luiscarlospando.com/contacto/",
            icon: "fa-solid fa-address-card",
            text: "Contacto",
            subButtons: [],
        },
        {
            id: "5",
            url: "https://luiscarlospando.com/photos/",
            icon: "fa-solid fa-images",
            text: "Fotos",
            subButtons: [],
        },
        {
            id: "6",
            url: "https://luiscarlospando.com/developer/",
            icon: "fa-solid fa-code",
            text: "Development Stuff",
            subButtons: [
                {
                    id: "6-1",
                    url: "https://luiscarlospando.com/keys/",
                    icon: "fa-solid fa-key",
                    text: "Llaves públicas",
                    subButtons: [],
                },
            ],
        },
        {
            id: "7",
            url: "https://luiscarlospando.com/now/",
            icon: "fa-solid fa-clock",
            text: "Now",
            subButtons: [],
        },
        {
            id: "8",
            url: "https://luiscarlospando.com/uses/",
            icon: "fa-solid fa-wrench",
            text: "Uses",
            subButtons: [],
        },
        {
            id: "9",
            url: "https://luiscarlospando.com/projects/",
            icon: "fa-solid fa-box",
            text: "Proyectos",
            subButtons: [],
        },
        {
            id: "10",
            url: "https://luiscarlospando.com/guestbook/",
            icon: "fa-solid fa-file-signature",
            text: "Guestbook",
            subButtons: [],
        },
        {
            id: "11",
            url: "https://luiscarlospando.com/discord/",
            icon: "fa-brands fa-discord",
            text: "Discord (Mode 7)",
            subButtons: [
                {
                    id: "11-1",
                    url: "https://blog.luiscarlospando.com/hashtag/mode-7-podcast/",
                    icon: "fa-solid fa-podcast",
                    text: "Mode 7 Podcast",
                },
            ],
        },
        {
            id: "12",
            url: "https://luiscarlospando.com/games/",
            icon: "fa-solid fa-gamepad",
            text: "Games",
            subButtons: [
                {
                    id: "12-1",
                    url: "https://luiscarlospando.com/games/mario-kart/",
                    icon: "fa-solid fa-gamepad",
                    text: "Mario Kart 8 Deluxe (Mode 7 Grand Prix)",
                },
                {
                    id: "12-2",
                    url: "https://luiscarlospando.com/games/splatoon/",
                    icon: "fa-solid fa-gamepad",
                    text: "Splatoon 3",
                },
            ],
        },
        {
            id: "13",
            url: "https://luiscarlospando.com/live/",
            icon: "fa-solid fa-video",
            text: "Live",
            subButtons: [],
        },
        {
            id: "14",
            url: "https://luiscarlospando.com/rss/",
            icon: "fa-solid fa-square-rss",
            text: "RSS",
            subButtons: [
                {
                    id: "14-1",
                    url: "https://blog.luiscarlospando.com/rss/",
                    icon: "fa-solid fa-square-rss",
                    text: "Blog",
                },
                {
                    id: "14-2",
                    url: "https://blog.luiscarlospando.com/photos/rss",
                    icon: "fa-solid fa-square-rss",
                    text: "Fotos",
                },
                {
                    id: "14-3",
                    url: "https://bg.raindrop.io/rss/public/50598757",
                    icon: "fa-solid fa-square-rss",
                    text: "Links",
                },
            ],
        },
        {
            id: "15",
            url: "https://luiscarlospando.com/acerca-de/",
            icon: "fa-solid fa-circle-info",
            text: "Acerca de",
            subButtons: [],
        },
    ];

    return (
        <ul>
            {siteButtons.map((siteButton, i) => {
                if (siteButton.subButtons.length === 0) {
                    return (
                        <li key={i}>
                            <a href={siteButton.url}>
                                <i className={siteButton.icon}></i>{" "}
                                {siteButton.text}
                            </a>
                        </li>
                    );
                } else {
                    return (
                        <li key={i}>
                            <a href={siteButton.url}>
                                <i className={siteButton.icon}></i>{" "}
                                {siteButton.text}
                            </a>
                            <ul>
                                {siteButton.subButtons.map((subButton, i) => (
                                    <li key={i}>
                                        <a href={subButton.url}>
                                            <i className={subButton.icon}></i>{" "}
                                            {subButton.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                }
            })}
        </ul>
    );
}

const container = document.querySelector("#navigation");
const root = createRoot(container);
root.render(<Navigation />);
