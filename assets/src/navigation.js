import React from 'react';
import { createRoot } from 'react-dom/client';

function Navigation() {
    var siteButtons = [{
        id: '1',
        url: 'https://luiscarlospando.com/',
        icon: 'fa-solid fa-house',
        text: 'Inicio',
        subButtons: []
    }, {
        id: '2',
        url: 'https://blog.luiscarlospando.com/',
        icon: 'fa-solid fa-comment',
        text: 'Blog',
        subButtons: [{
            id: '1',
            url: 'https://blog.luiscarlospando.com/personal/',
            icon: 'fa-solid fa-user',
            text: 'Personal'
        }, {
            id: '2',
            url: 'https://blog.luiscarlospando.com/musica/',
            icon: 'fa-solid fa-music',
            text: 'Música'
        }, {
            id: '3',
            url: 'https://blog.luiscarlospando.com/gaming/',
            icon: 'fa-solid fa-gamepad',
            text: 'Gaming'
        }, {
            id: '4',
            url: 'https://blog.luiscarlospando.com/tech/',
            icon: 'fa-solid fa-computer',
            text: 'Tech'
        }, {
            id: '5',
            url: 'https://blog.luiscarlospando.com/coding/',
            icon: 'fa-solid fa-code',
            text: 'Coding'
        }, {
            id: '6',
            url: 'https://blog.luiscarlospando.com/diseno/',
            icon: 'fa-solid fa-pen-ruler',
            text: 'Diseño'
        }, {
            id: '7',
            url: 'https://blog.luiscarlospando.com/todo-lo-demas/',
            icon: 'fa-solid fa-arrow-pointer',
            text: 'Todo lo demás'
        }, {
            id: '8',
            url: 'https://blog.luiscarlospando.com/author/me/',
            icon: 'fa-solid fa-folder-open',
            text: 'Archivos del blog'
        }, {
            id: '9',
            url: 'https://blog.luiscarlospando.com/hashtags/',
            icon: 'fa-solid fa-hashtag',
            text: 'Explorar por hashtag'
        }, {
            id: '10',
            url: 'https://blog.luiscarlospando.com/rss/',
            icon: 'fa-solid fa-square-rss',
            text: 'RSS'
        }]
    }, {
        id: '3',
        url: 'https://luiscarlospando.com/contacto/',
        icon: 'fa-solid fa-envelope',
        text: 'Contacto',
        subButtons: []
    }, {
        id: '4',
        url: 'https://luiscarlospando.com/developer/',
        icon: 'fa-solid fa-code',
        text: 'Development Stuff',
        subButtons: []
    }, {
        id: '5',
        url: 'https://luiscarlospando.com/now/',
        icon: 'fa-solid fa-clock',
        text: 'Now',
        subButtons: []
    }, {
        id: '6',
        url: 'https://luiscarlospando.com/uses/',
        icon: 'fa-solid fa-wrench',
        text: 'Uses',
        subButtons: []
    }, {
        id: '7',
        url: 'https://luiscarlospando.com/mode-7/',
        icon: 'fa-brands fa-discord',
        text: 'Mode 7',
        subButtons: [{
            id: '1',
            url: 'https://blog.luiscarlospando.com/hashtag/mode-7-podcast/',
            icon: 'fa-solid fa-podcast',
            text: 'Mode 7 Podcast'
        }]
    }, {
        id: '8',
        url: 'https://luiscarlospando.com/nintendo/',
        icon: 'fa-solid fa-gamepad',
        text: 'Nintendo',
        subButtons: [{
            id: '1',
            url: 'https://luiscarlospando.com/nintendo/mario-kart/',
            icon: 'fa-solid fa-gamepad',
            text: 'Mario Kart 8 Deluxe (Mode 7 Grand Prix)'
        }, {
            id: '2',
            url: 'https://luiscarlospando.com/nintendo/splatoon/',
            icon: 'fa-solid fa-gamepad',
            text: 'Splatoon 3'
        }]
    }, {
        id: '9',
        url: 'https://luiscarlospando.com/live/',
        icon: 'fa-solid fa-video',
        text: 'Live',
        subButtons: []
    }, {
        id: '10',
        url: 'https://luiscarlospando.com/acerca-de/',
        icon: 'fa-solid fa-circle-info',
        text: 'Acerca de',
        subButtons: []
    }];

    return React.createElement(
        'ul',
        null,
        siteButtons.map(function (siteButton, i) {
            if (siteButton.subButtons.length === 0) {
                return React.createElement(
                    'li',
                    { key: i },
                    React.createElement(
                        'a',
                        { href: siteButton.url },
                        React.createElement('i', { 'class': siteButton.icon }),
                        ' ',
                        siteButton.text
                    )
                );
            } else {
                return React.createElement(
                    'li',
                    { key: i },
                    React.createElement(
                        'a',
                        { href: siteButton.url },
                        React.createElement('i', { 'class': siteButton.icon }),
                        ' ',
                        siteButton.text
                    ),
                    React.createElement(
                        'ul',
                        null,
                        siteButton.subButtons.map(function (subButton, i) {
                            return React.createElement(
                                'li',
                                { key: i },
                                React.createElement(
                                    'a',
                                    { href: subButton.url },
                                    React.createElement('i', { 'class': subButton.icon }),
                                    ' ',
                                    subButton.text
                                )
                            );
                        })
                    )
                );
            }
        })
    );
}

var container = document.querySelector('#navigation');
var root = createRoot(container);
root.render(React.createElement(Navigation, null));