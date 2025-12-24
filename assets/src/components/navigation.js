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
            url: "https://luiscarlospando.com/about/",
            icon: "fa-solid fa-circle-info",
            text: "Acerca de",
            subButtons: [],
        },
        {
            id: "3",
            url: "https://luiscarlospando.com/now/",
            icon: "fa-solid fa-clock",
            text: "Now",
            subButtons: [],
        },
        {
            id: "4",
            url: "https://blog.luiscarlospando.com/",
            icon: "fa-solid fa-message",
            text: "Blog",
            subButtons: [
                {
                    id: "4-1",
                    url: "https://blog.luiscarlospando.com/personal/",
                    icon: "fa-solid fa-user",
                    text: "Personal",
                },
                {
                    id: "4-2",
                    url: "https://blog.luiscarlospando.com/musica/",
                    icon: "fa-solid fa-music",
                    text: "Música",
                },
                {
                    id: "4-3",
                    url: "https://blog.luiscarlospando.com/gaming/",
                    icon: "fa-solid fa-gamepad",
                    text: "Gaming",
                },
                {
                    id: "4-4",
                    url: "https://blog.luiscarlospando.com/tech/",
                    icon: "fa-solid fa-computer",
                    text: "Tech",
                },
                {
                    id: "4-5",
                    url: "https://blog.luiscarlospando.com/coding/",
                    icon: "fa-solid fa-code",
                    text: "Coding",
                },
                {
                    id: "4-6",
                    url: "https://blog.luiscarlospando.com/diseno/",
                    icon: "fa-solid fa-pen-ruler",
                    text: "Diseño",
                },
                {
                    id: "4-7",
                    url: "https://blog.luiscarlospando.com/todo-lo-demas/",
                    icon: "fa-solid fa-arrow-pointer",
                    text: "Todo lo demás",
                },
                {
                    id: "4-8",
                    url: "https://blog.luiscarlospando.com/author/me/",
                    icon: "fa-solid fa-folder-open",
                    text: "Archivos del blog",
                },
                {
                    id: "4-9",
                    url: "https://blog.luiscarlospando.com/hashtags/",
                    icon: "fa-solid fa-hashtag",
                    text: "Explorar por hashtag",
                },
            ],
        },
        {
            id: "5",
            url: "https://luiscarlospando.com/photos/",
            icon: "fa-solid fa-camera",
            text: "Fotos",
            subButtons: [],
        },
        {
            id: "6",
            url: "https://luiscarlospando.com/music/",
            icon: "fa-solid fa-headphones",
            text: "Música",
            subButtons: [
                {
                    id: "6-1",
                    url: "https://luiscarlospando.com/music/",
                    icon: "fa-solid fa-headphones",
                    text: "Mis álbumes más escuchados",
                },
                {
                    id: "6-2",
                    url: "https://luiscarlospando.com/music/loved-tracks/",
                    icon: "fa-solid fa-heart",
                    text: "Canciones favoritas recientes",
                },
                {
                    id: "6-3",
                    url: "https://luiscarlospando.com/music/playlist/",
                    icon: "fa-solid fa-record-vinyl",
                    text: "Playlist (Crucial Tracks)",
                },
            ],
        },
        {
            id: "7",
            url: "https://luiscarlospando.com/games/",
            icon: "fa-solid fa-gamepad",
            text: "Games",
            subButtons: [
                {
                    id: "7-1",
                    url: "https://luiscarlospando.com/games/favorites/",
                    icon: "fa-solid fa-star",
                    text: "Mis juegos favoritos",
                },
                {
                    id: "7-2",
                    url: "https://luiscarlospando.com/games/mario-kart/",
                    icon: "fa-solid fa-gamepad",
                    text: "Mario Kart 8 Deluxe (Mode 7 Grand Prix)",
                },
                {
                    id: "7-3",
                    url: "https://luiscarlospando.com/games/splatoon/",
                    icon: "fa-solid fa-gamepad",
                    text: "Splatoon 3",
                },
            ],
        },
        {
            id: "8",
            url: "https://luiscarlospando.com/live/",
            icon: "fa-solid fa-video",
            text: "Live",
            subButtons: [],
        },
        {
            id: "9",
            url: "https://luiscarlospando.com/developer/",
            icon: "fa-solid fa-code",
            text: "Development Stuff",
            subButtons: [
                {
                    id: "9-1",
                    url: "https://luiscarlospando.com/keys/",
                    icon: "fa-solid fa-key",
                    text: "Llaves públicas",
                    subButtons: [],
                },
            ],
        },
        {
            id: "10",
            url: "https://luiscarlospando.com/uses/",
            icon: "fa-solid fa-wrench",
            text: "Uses",
            subButtons: [],
        },
        {
            id: "11",
            url: "https://luiscarlospando.com/contact/",
            icon: "fa-solid fa-address-card",
            text: "Contacto",
            subButtons: [],
        },
        {
            id: "12",
            url: "https://luiscarlospando.com/guestbook/",
            icon: "fa-solid fa-pen-nib",
            text: "Guestbook",
            subButtons: [],
        },
        {
            id: "13",
            url: "https://luiscarlospando.com/discord/",
            icon: "fa-brands fa-discord",
            text: "Discord (Mode 7)",
            subButtons: [
                {
                    id: "13-1",
                    url: "https://blog.luiscarlospando.com/hashtag/mode-7-podcast/",
                    icon: "fa-solid fa-podcast",
                    text: "Mode 7 Podcast",
                },
            ],
        },
        {
            id: "14",
            url: "https://luiscarlospando.com/links/",
            icon: "fa-solid fa-link",
            text: "Links",
            subButtons: [],
        },
        {
            id: "15",
            url: "https://luiscarlospando.com/blogroll/",
            icon: "fa-solid fa-bookmark",
            text: "Blogroll",
            subButtons: [],
        },
        {
            id: "16",
            url: "https://luiscarlospando.com/top4/",
            icon: "fa-solid fa-trophy",
            text: "Top 4",
            subButtons: [],
        },
        {
            id: "17",
            url: "https://luiscarlospando.com/subscribe/",
            icon: "fa-solid fa-square-rss",
            text: "Suscríbete",
            subButtons: [
                {
                    id: "17-1",
                    url: "https://blog.luiscarlospando.com/rss/",
                    icon: "fa-solid fa-square-rss",
                    text: "Blog",
                },
                {
                    id: "17-2",
                    url: "https://blog.luiscarlospando.com/photos/rss",
                    icon: "fa-solid fa-square-rss",
                    text: "Fotos",
                },
                {
                    id: "17-3",
                    url: "https://bg.raindrop.io/rss/public/50598757",
                    icon: "fa-solid fa-square-rss",
                    text: "Links",
                },
                {
                    id: "17-4",
                    url: "https://mijo.status.lol/feed/rss",
                    icon: "fa-solid fa-square-rss",
                    text: "Statuslog",
                },
                {
                    id: "17-5",
                    url: "https://app.crucialtracks.org/profile/mijo/feed",
                    icon: "fa-solid fa-square-rss",
                    text: "Playlist (Crucial Tracks)",
                },
                {
                    id: "17-6",
                    url: "https://hachyderm.io/@luiscarlospando",
                    icon: "fa-brands fa-mastodon",
                    text: "Mastodon",
                },
                {
                    id: "17-7",
                    url: "https://luiscarlospando.com/newsletter/",
                    icon: "fa-solid fa-envelope",
                    text: "Newsletter",
                },
            ],
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
