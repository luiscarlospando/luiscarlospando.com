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
            id: "about",
            url: "https://luiscarlospando.com/about/",
            icon: "fa-solid fa-circle-info",
            text: "Acerca de",
            subButtons: [],
        },
        {
            id: "now",
            url: "https://luiscarlospando.com/now/",
            icon: "fa-solid fa-clock",
            text: "Now",
            subButtons: [],
        },
        {
            id: "live",
            url: "https://luiscarlospando.com/live/",
            icon: "fa-solid fa-video",
            text: "Live",
            subButtons: [],
        },

        {
            id: "blog",
            url: "https://blog.luiscarlospando.com/",
            icon: "fa-solid fa-message",
            text: "Blog",
            subButtons: [
                {
                    id: "blog-personal",
                    url: "https://blog.luiscarlospando.com/personal/",
                    icon: "fa-solid fa-user",
                    text: "Personal",
                },
                {
                    id: "blog-music",
                    url: "https://blog.luiscarlospando.com/musica/",
                    icon: "fa-solid fa-music",
                    text: "Música",
                },
                {
                    id: "blog-gaming",
                    url: "https://blog.luiscarlospando.com/gaming/",
                    icon: "fa-solid fa-gamepad",
                    text: "Gaming",
                },
                {
                    id: "blog-tech",
                    url: "https://blog.luiscarlospando.com/tech/",
                    icon: "fa-solid fa-computer",
                    text: "Tech",
                },
                {
                    id: "blog-coding",
                    url: "https://blog.luiscarlospando.com/coding/",
                    icon: "fa-solid fa-code",
                    text: "Coding",
                },
                {
                    id: "blog-design",
                    url: "https://blog.luiscarlospando.com/diseno/",
                    icon: "fa-solid fa-pen-ruler",
                    text: "Diseño",
                },
                {
                    id: "blog-misc",
                    url: "https://blog.luiscarlospando.com/todo-lo-demas/",
                    icon: "fa-solid fa-arrow-pointer",
                    text: "Todo lo demás",
                },
                {
                    id: "blog-archive",
                    url: "https://blog.luiscarlospando.com/author/me/",
                    icon: "fa-solid fa-folder-open",
                    text: "Archivos del blog",
                },
                {
                    id: "blog-hashtags",
                    url: "https://blog.luiscarlospando.com/hashtags/",
                    icon: "fa-solid fa-hashtag",
                    text: "Explorar por hashtag",
                },
            ],
        },

        {
            id: "photos",
            url: "https://luiscarlospando.com/photos/",
            icon: "fa-solid fa-camera",
            text: "Fotos",
            subButtons: [],
        },

        {
            id: "music",
            url: "https://luiscarlospando.com/music/",
            icon: "fa-solid fa-headphones",
            text: "Música",
            subButtons: [
                {
                    id: "music-now-listening",
                    url: "https://luiscarlospando.com/music/",
                    icon: "fa-solid fa-headphones",
                    text: "Lo que escucho",
                },
                {
                    id: "music-crucial-tracks",
                    url: "https://luiscarlospando.com/music/playlist/",
                    icon: "fa-solid fa-record-vinyl",
                    text: "Crucial Tracks",
                },
                {
                    id: "music-favorites",
                    url: "https://luiscarlospando.com/music/loved-tracks/",
                    icon: "fa-solid fa-heart",
                    text: "Canciones favoritas",
                },
            ],
        },

        {
            id: "games",
            url: "https://luiscarlospando.com/games/",
            icon: "fa-solid fa-gamepad",
            text: "Games",
            subButtons: [
                {
                    id: "games-favorites",
                    url: "https://luiscarlospando.com/games/favorites/",
                    icon: "fa-solid fa-star",
                    text: "Mis juegos favoritos",
                },
                {
                    id: "games-mario-kart",
                    url: "https://luiscarlospando.com/games/mario-kart/",
                    icon: "fa-solid fa-gamepad",
                    text: "Mario Kart 8 Deluxe (Mode 7 Grand Prix)",
                },
                {
                    id: "games-splatoon",
                    url: "https://luiscarlospando.com/games/splatoon/",
                    icon: "fa-solid fa-gamepad",
                    text: "Splatoon 3",
                },
            ],
        },

        {
            id: "development",
            url: "https://luiscarlospando.com/developer/",
            icon: "fa-solid fa-code",
            text: "Development Stuff",
            subButtons: [
                {
                    id: "development-keys",
                    url: "https://luiscarlospando.com/keys/",
                    icon: "fa-solid fa-key",
                    text: "Llaves públicas",
                },
            ],
        },

        {
            id: "uses",
            url: "https://luiscarlospando.com/uses/",
            icon: "fa-solid fa-wrench",
            text: "Uses",
            subButtons: [],
        },

        {
            id: "discord",
            url: "https://luiscarlospando.com/discord/",
            icon: "fa-brands fa-discord",
            text: "Discord (Mode 7)",
            subButtons: [
                {
                    id: "discord-podcast",
                    url: "https://blog.luiscarlospando.com/hashtag/mode-7-podcast/",
                    icon: "fa-solid fa-podcast",
                    text: "Mode 7 Podcast",
                },
            ],
        },

        {
            id: "guestbook",
            url: "https://luiscarlospando.com/guestbook/",
            icon: "fa-solid fa-pen-nib",
            text: "Guestbook",
            subButtons: [],
        },

        {
            id: "contact",
            url: "https://luiscarlospando.com/contact/",
            icon: "fa-solid fa-address-card",
            text: "Contacto",
            subButtons: [],
        },

        {
            id: "links",
            url: "https://luiscarlospando.com/links/",
            icon: "fa-solid fa-link",
            text: "Links",
            subButtons: [],
        },

        {
            id: "blogroll",
            url: "https://luiscarlospando.com/blogroll/",
            icon: "fa-solid fa-bookmark",
            text: "Blogroll",
            subButtons: [],
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
                    id: "subscribe-links",
                    url: "https://subscribeopenly.net/subscribe/?url=https://bg.raindrop.io/rss/public/50598757",
                    icon: "fa-solid fa-square-rss",
                    text: "Links",
                },
                {
                    id: "subscribe-statuslog",
                    url: "https://subscribeopenly.net/subscribe/?url=https://mijo.status.lol/feed/rss",
                    icon: "fa-solid fa-square-rss",
                    text: "Statuslog",
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
