import React from 'react';
import { createRoot } from 'react-dom/client';

function NavigationButton(_ref) {
    var _ref$url = _ref.url,
        url = _ref$url === undefined ? 'https://luiscarlospando.com/' : _ref$url,
        icon = _ref.icon,
        text = _ref.text;

    return React.createElement(
        'a',
        { href: url },
        React.createElement('i', { 'class': icon }),
        ' ',
        text
    );
}

function Navigation() {
    var sitePermalinks = {
        contacto: 'https://luiscarlospando.com/contacto/',
        development: 'https://luiscarlospando.com/developer/',
        now: 'https://luiscarlospando.com/now/',
        uses: 'https://luiscarlospando.com/uses/',
        mode7: 'https://luiscarlospando.com/mode-7/',
        nintendo: 'https://luiscarlospando.com/nintendo/',
        marioKart: 'https://luiscarlospando.com/nintendo/mario-kart/',
        splatoon: 'https://luiscarlospando.com/nintendo/splatoon/',
        live: 'https://luiscarlospando.com/live/',
        acercaDe: 'https://luiscarlospando.com/acerca-de/'
    };

    var blogPermalinks = {
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
        mode7Podcast: 'https://blog.luiscarlospando.com/hashtag/mode-7-podcast/'
    };

    return React.createElement(
        'nav',
        { id: 'menu' },
        React.createElement(
            'ul',
            null,
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    icon: 'fa-solid fa-house',
                    text: 'Inicio'
                })
            ),
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    url: blogPermalinks.blog,
                    icon: 'fa-solid fa-comment',
                    text: 'Blog'
                }),
                React.createElement(
                    'ul',
                    null,
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.personal,
                            icon: 'fa-solid fa-user',
                            text: 'Personal'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.musica,
                            icon: 'fa-solid fa-music',
                            text: 'M\xFAsica'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.gaming,
                            icon: 'fa-solid fa-gamepad',
                            text: 'Gaming'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.tech,
                            icon: 'fa-solid fa-computer',
                            text: 'Tech'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.coding,
                            icon: 'fa-solid fa-code',
                            text: 'Coding'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.diseno,
                            icon: 'fa-solid fa-pen-ruler',
                            text: 'Dise\xF1o'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.todoLoDemas,
                            icon: 'fa-solid fa-arrow-pointer',
                            text: 'Todo lo dem\xE1s'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.archivos,
                            icon: 'fa-solid fa-folder-open',
                            text: 'Archivos del blog'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.hashtags,
                            icon: 'fa-solid fa-hashtag',
                            text: 'Explorar por hashtag'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.rss,
                            icon: 'fa-solid fa-square-rss',
                            text: 'RSS'
                        })
                    )
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    url: sitePermalinks.contacto,
                    icon: 'fa-solid fa-envelope',
                    text: 'Contacto'
                })
            ),
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    url: sitePermalinks.development,
                    icon: 'fa-solid fa-code',
                    text: 'Development Stuff'
                })
            ),
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    url: sitePermalinks.now,
                    icon: 'fa-solid fa-clock',
                    text: 'Now'
                })
            ),
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    url: sitePermalinks.uses,
                    icon: 'fa-solid fa-wrench',
                    text: 'Uses'
                })
            ),
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    url: sitePermalinks.mode7,
                    icon: 'fa-brands fa-discord',
                    text: 'Mode 7'
                }),
                React.createElement(
                    'ul',
                    null,
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: blogPermalinks.mode7Podcast,
                            icon: 'fa-solid fa-podcast',
                            text: 'Mode 7 Podcast'
                        })
                    )
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    url: sitePermalinks.nintendo,
                    icon: 'fa-solid fa-gamepad',
                    text: 'Nintendo'
                }),
                React.createElement(
                    'ul',
                    null,
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: sitePermalinks.marioKart,
                            icon: 'fa-solid fa-gamepad',
                            text: 'Mario Kart 8 Deluxe (Mode 7 Grand Prix)'
                        })
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(NavigationButton, {
                            url: sitePermalinks.splatoon,
                            icon: 'fa-solid fa-gamepad',
                            text: 'Splatoon 3'
                        })
                    )
                )
            ),
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    url: sitePermalinks.live,
                    icon: 'fa-solid fa-video',
                    text: 'Live'
                })
            ),
            React.createElement(
                'li',
                null,
                React.createElement(NavigationButton, {
                    url: sitePermalinks.acercaDe,
                    icon: 'fa-solid fa-circle-info',
                    text: 'Acerca de'
                })
            )
        )
    );
}

var container = document.querySelector('#navigation');
var root = createRoot(container);
root.render(React.createElement(Navigation, null));