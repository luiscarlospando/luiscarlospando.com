import React from "react";
import { createRoot } from "react-dom/client";

function Navigation() {
    const siteButtons = [
        {
            id: "home",
            url: "https://luiscarlospando.com/",
            icon: "fa-solid fa-house",
            text: "Inicio",
            subButtons: [],
        },
        {
            id: "about-group",
            url: "https://luiscarlospando.com/about/",
            icon: "fa-solid fa-user",
            text: "Sobre mí",
            subButtons: [
                {
                    id: "about",
                    url: "https://luiscarlospando.com/about/",
                    icon: "fa-solid fa-circle-info",
                    text: "Acerca de",
                },
                {
                    id: "now",
                    url: "https://luiscarlospando.com/now/",
                    icon: "fa-solid fa-clock",
                    text: "Now",
                },
                {
                    id: "other-status",
                    url: "https://luiscarlospando.com/status/",
                    icon: "fa-solid fa-clock",
                    text: "Estatus",
                },
                {
                    id: "uses",
                    url: "https://luiscarlospando.com/uses/",
                    icon: "fa-solid fa-wrench",
                    text: "Uses",
                },
                {
                    id: "contact",
                    url: "https://luiscarlospando.com/contact/",
                    icon: "fa-solid fa-address-card",
                    text: "Contacto",
                },
            ],
        },
        {
            id: "content-group",
            url: "https://luiscarlospando.com/",
            icon: "fa-solid fa-pen",
            text: "Contenido",
            subButtons: [
                {
                    id: "blog",
                    url: "https://blog.luiscarlospando.com/",
                    icon: "fa-solid fa-message",
                    text: "Blog",
                },
                {
                    id: "photos",
                    url: "https://luiscarlospando.com/photos/",
                    icon: "fa-solid fa-camera",
                    text: "Fotos",
                },
                {
                    id: "music",
                    url: "https://luiscarlospando.com/music/",
                    icon: "fa-solid fa-headphones",
                    text: "Música",
                },
            ],
        },
        {
            id: "fun-geek-group",
            url: "https://luiscarlospando.com/live/",
            icon: "fa-solid fa-gamepad",
            text: "Fun/Geek",
            subButtons: [
                {
                    id: "games",
                    url: "https://luiscarlospando.com/games/",
                    icon: "fa-solid fa-gamepad",
                    text: "Games",
                },
                {
                    id: "live",
                    url: "https://luiscarlospando.com/live/",
                    icon: "fa-solid fa-video",
                    text: "Live",
                },
                {
                    id: "development",
                    url: "https://luiscarlospando.com/developer/",
                    icon: "fa-solid fa-code",
                    text: "Development Stuff",
                },
            ],
        },
        {
            id: "community-group",
            url: "https://luiscarlospando.com/links/",
            icon: "fa-solid fa-globe",
            text: "Web y Comunidad",
            subButtons: [
                {
                    id: "links",
                    url: "https://luiscarlospando.com/links/",
                    icon: "fa-solid fa-link",
                    text: "Links",
                },
                {
                    id: "blogroll",
                    url: "https://luiscarlospando.com/blogroll/",
                    icon: "fa-solid fa-bookmark",
                    text: "Blogroll",
                },
                {
                    id: "guestbook",
                    url: "https://luiscarlospando.com/guestbook/",
                    icon: "fa-solid fa-pen-nib",
                    text: "Guestbook",
                },
                {
                    id: "paintbook",
                    url: "https://luiscarlospando.com/paintbook/",
                    icon: "fa-solid fa-paintbrush",
                    text: "Paintbook",
                },
                {
                    id: "chat",
                    url: "https://luiscarlospando.com/chat/",
                    icon: "fa-brands fa-discord",
                    text: "Chat",
                },
            ],
        },
        {
            id: "subscribe",
            url: "https://luiscarlospando.com/subscribe/",
            icon: "fa-solid fa-square-rss",
            text: "Suscríbete",
            subButtons: [
                {
                    id: "subscribe-blog",
                    url: "https://subscribeopenly.net/subscribe/?url=https://blog.luiscarlospando.com/rss/",
                    icon: "fa-solid fa-square-rss",
                    text: "Blog",
                },
                {
                    id: "subscribe-photos",
                    url: "https://subscribeopenly.net/subscribe/?url=https://blog.luiscarlospando.com/photos/rss",
                    icon: "fa-solid fa-square-rss",
                    text: "Fotos",
                },
                {
                    id: "subscribe-status",
                    url: "https://subscribeopenly.net/subscribe/?url=https://mijo.status.lol/feed/rss",
                    icon: "fa-solid fa-square-rss",
                    text: "Estatus",
                },
                {
                    id: "subscribe-links",
                    url: "https://subscribeopenly.net/subscribe/?url=https://bg.raindrop.io/rss/public/50598757",
                    icon: "fa-solid fa-square-rss",
                    text: "Links",
                },
                {
                    id: "subscribe-crucial-tracks",
                    url: "https://subscribeopenly.net/subscribe/?url=https://app.crucialtracks.org/profile/mijo/feed",
                    icon: "fa-solid fa-square-rss",
                    text: "Playlist (Crucial Tracks)",
                },
                {
                    id: "subscribe-mastodon",
                    url: "https://hachyderm.io/@luiscarlospando",
                    icon: "fa-brands fa-mastodon",
                    text: "Mastodon",
                },
                {
                    id: "subscribe-newsletter",
                    url: "https://luiscarlospando.com/newsletter/",
                    icon: "fa-solid fa-envelope",
                    text: "Newsletter",
                },
            ],
        },
        {
            id: "other",
            url: "https://luiscarlospando.com/other/",
            icon: "fa-solid fa-ellipsis",
            text: "Otros",
            subButtons: [
                {
                    id: "other-top4",
                    url: "https://luiscarlospando.com/top4/",
                    icon: "fa-solid fa-trophy",
                    text: "Top 4",
                },
                {
                    id: "other-nope",
                    url: "https://luiscarlospando.com/nope/",
                    icon: "fa-solid fa-ban",
                    text: "Nope",
                },
                {
                    id: "other-twitter-archive",
                    url: "https://luiscarlospando.com/twitter/",
                    icon: "fa-brands fa-twitter",
                    text: "Twitter (Archivo de tweets)",
                },
                {
                    id: "development-keys",
                    url: "https://luiscarlospando.com/keys/",
                    icon: "fa-solid fa-key",
                    text: "Llaves públicas",
                },
            ],
        },
    ];

    return (
        <ul>
            {siteButtons.map((siteButton) => {
                const subButtons = siteButton.subButtons ?? [];
                if (subButtons.length === 0) {
                    return (
                        <li key={siteButton.id}>
                            <a href={siteButton.url}>
                                <i className={siteButton.icon}></i>{" "}
                                {siteButton.text}
                            </a>
                        </li>
                    );
                } else {
                    return (
                        <li key={siteButton.id}>
                            <a href={siteButton.url}>
                                <i className={siteButton.icon}></i>{" "}
                                {siteButton.text}
                            </a>
                            <ul>
                                {subButtons.map((subButton) => (
                                    <li key={subButton.id}>
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
