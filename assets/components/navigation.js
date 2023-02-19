import React from 'react';
import { createRoot } from 'react-dom/client';

function NavigationButton({url = 'https://luiscarlospando.com/', icon, text}) {
    return (
        <a href={url}>
            <i class={icon}></i> {text}
        </a>
  );
}

function Navigation() {
    const sitePermalinks = {
        contacto: 'https://luiscarlospando.com/contacto/',
        development: 'https://luiscarlospando.com/developer/',
        now: 'https://luiscarlospando.com/now/',
        uses: 'https://luiscarlospando.com/uses/',
        mode7: 'https://luiscarlospando.com/mode-7/',
        nintendo: 'https://luiscarlospando.com/nintendo/',
        marioKart: 'https://luiscarlospando.com/nintendo/mario-kart/',
        splatoon: 'https://luiscarlospando.com/nintendo/splatoon/',
        live: 'https://luiscarlospando.com/live/',
        acercaDe: 'https://luiscarlospando.com/acerca-de/',
    }

    const blogPermalinks = {
        blog: 'https://blog.luiscarlospando.com/',
        personal: 'https://blog.luiscarlospando.com/personal/',
        musica: 'https://blog.luiscarlospando.com/musica/',
        gaming: 'https://blog.luiscarlospando.com/gaming/',
        tech: 'https://blog.luiscarlospando.com/tech/',
        coding: 'https://blog.luiscarlospando.com/coding/',
        diseno: 'https://blog.luiscarlospando.com/diseno/',
        todoLoDemas: 'https://blog.luiscarlospando.com/todo-lo-demas/',
        archivos: 'https://blog.luiscarlospando.com/author/me/',
        hashtags: 'https://blog.luiscarlospando.com/hashtags',
        rss: 'https://blog.luiscarlospando.com/rss',
        mode7Podcast: 'https://blog.luiscarlospando.com/hashtag/mode-7-podcast/',
    }

    return (
        <nav id="menu">
            <ul>
                <li>
                    <NavigationButton
                        icon="fa-solid fa-house"
                        text="Inicio"
                    />
                </li>
                <li>
                    <NavigationButton
                        url={blogPermalinks.blog}
                        icon="fa-solid fa-comment"
                        text="Blog"
                    />
                    <ul>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.personal}
                                icon="fa-solid fa-user"
                                text="Personal"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.musica}
                                icon="fa-solid fa-music"
                                text="Música"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.gaming}
                                icon="fa-solid fa-gamepad"
                                text="Gaming"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.tech}
                                icon="fa-solid fa-computer"
                                text="Tech"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.coding}
                                icon="fa-solid fa-code"
                                text="Coding"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.diseno}
                                icon="fa-solid fa-pen-ruler"
                                text="Diseño"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.todoLoDemas}
                                icon="fa-solid fa-arrow-pointer"
                                text="Todo lo demás"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.archivos}
                                icon="fa-solid fa-folder-open"
                                text="Archivos del blog"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.hashtags}
                                icon="fa-solid fa-hashtag"
                                text="Explorar por hashtag"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.rss}
                                icon="fa-solid fa-square-rss"
                                text="RSS"
                            />
                        </li>
                    </ul>
                </li>
                <li>
                    <NavigationButton
                        url={sitePermalinks.contacto}
                        icon="fa-solid fa-envelope"
                        text="Contacto"
                    />
                </li>
                <li>
                    <NavigationButton
                        url={sitePermalinks.development}
                        icon="fa-solid fa-code"
                        text="Development Stuff"
                    />
                </li>
                <li>
                    <NavigationButton
                        url={sitePermalinks.now}
                        icon="fa-solid fa-clock"
                        text="Now"
                    />
                </li>
                <li>
                    <NavigationButton
                        url={sitePermalinks.uses}
                        icon="fa-solid fa-wrench"
                        text="Uses"
                    />
                </li>
                <li>
                    <NavigationButton
                        url={sitePermalinks.mode7}
                        icon="fa-brands fa-discord"
                        text="Mode 7"
                    />
                    <ul>
                        <li>
                            <NavigationButton
                                url={blogPermalinks.mode7Podcast}
                                icon="fa-solid fa-podcast"
                                text="Mode 7 Podcast"
                            />
                        </li>
                    </ul>
                </li>
                <li>
                    <NavigationButton
                        url={sitePermalinks.nintendo}
                        icon="fa-solid fa-gamepad"
                        text="Nintendo"
                    />
                    <ul>
                        <li>
                            <NavigationButton
                                url={sitePermalinks.marioKart}
                                icon="fa-solid fa-gamepad"
                                text="Mario Kart 8 Deluxe (Mode 7 Grand Prix)"
                            />
                        </li>
                        <li>
                            <NavigationButton
                                url={sitePermalinks.splatoon}
                                icon="fa-solid fa-gamepad"
                                text="Splatoon 3"
                            />
                        </li>
                    </ul>
                </li>
                <li>
                    <NavigationButton
                        url={sitePermalinks.live}
                        icon="fa-solid fa-video"
                        text="Live"
                    />
                </li>
                <li>
                    <NavigationButton
                        url={sitePermalinks.acercaDe}
                        icon="fa-solid fa-circle-info"
                        text="Acerca de"
                    />
                </li>
            </ul>
        </nav>
    );
}

const container = document.querySelector('#navigation');
const root = createRoot(container);
root.render(<Navigation />);