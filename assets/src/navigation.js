'use strict';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav id="menu">
                <ul>
                    <li><a href="https://luiscarlospando.com/"><i class="fa-solid fa-house"></i> Inicio</a></li>
                    <li>
                        <a href="https://blog.luiscarlospando.com/"><i class="fa-solid fa-comment"></i> Blog</a>
                        <ul>
                            <li><a href="https://blog.luiscarlospando.com/personal/"><i class="fa-solid fa-user"></i> Personal</a></li>
                            <li><a href="https://blog.luiscarlospando.com/musica/"><i class="fa-solid fa-music"></i> Música</a></li>
                            <li><a href="https://blog.luiscarlospando.com/gaming/"><i class="fa-solid fa-gamepad"></i> Gaming</a></li>
                            <li><a href="https://blog.luiscarlospando.com/tech/"><i class="fa-solid fa-computer"></i> Tech</a></li>
                            <li><a href="https://blog.luiscarlospando.com/coding/"><i class="fa-solid fa-code"></i> Coding</a></li>
                            <li><a href="https://blog.luiscarlospando.com/diseno/"><i class="fa-solid fa-pen-ruler"></i> Diseño</a></li>
                            <li><a href="https://blog.luiscarlospando.com/todo-lo-demas/"><i class="fa-solid fa-arrow-pointer"></i> Todo lo demás</a></li>
                            <li><a href="https://blog.luiscarlospando.com/author/me/"><i class="fa-solid fa-folder-open"></i> Archivos del blog</a></li>
                            <li><a href="https://blog.luiscarlospando.com/hashtags/"><i class="fa-solid fa-hashtag"></i> Explorar por hashtag</a></li>
                            <li><a href="https://blog.luiscarlospando.com/rss/"><i class="fa-solid fa-square-rss"></i> RSS</a></li>
                        </ul>
                    </li>
                    <li><a href="https://luiscarlospando.com/contacto/"><i class="fa-solid fa-envelope"></i> Contacto</a></li>
                    <li><a href="https://luiscarlospando.com/developer/"><i class="fa-solid fa-code"></i> Development Stuff</a></li>
                    <li><a href="https://luiscarlospando.com/now/"><i class="fa-solid fa-clock"></i> Now</a></li>
                    <li><a href="https://luiscarlospando.com/tools/"><i class="fa-solid fa-wrench"></i> Tools</a></li>
                    <li>
                        <a href="https://luiscarlospando.com/mode-7/"><i class="fa-brands fa-discord"></i> Mode 7</a>
                        <ul>
                        <li>
                            <a href="https://blog.luiscarlospando.com/hashtag/mode-7-podcast/"><i class="fa-solid fa-podcast"></i> Mode 7 Podcast</a>
                        </li>
                        </ul>
                    </li>
                    <li>
                        <a href="https://luiscarlospando.com/nintendo/"><i class="fa-solid fa-gamepad"></i> Nintendo</a>
                        <ul>
                            <li><a href="https://luiscarlospando.com/nintendo/mario-kart/"><i class="fa-solid fa-gamepad"></i> Mario Kart 8 Deluxe (Mode 7 Grand Prix)</a></li>
                            <li><a href="https://luiscarlospando.com/nintendo/splatoon/"><i class="fa-solid fa-gamepad"></i> Splatoon 3</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="https://luiscarlospando.com/live/"><i class="fa-solid fa-video"></i> Live</a>
                    </li>
                    <li><a href="https://luiscarlospando.com/acerca-de/"><i class="fa-solid fa-circle-info"></i> Acerca de</a></li>
                </ul>
            </nav>
        );
    }
}

let navigationDOM = document.querySelector('#navigation');
ReactDOM.render(<Navigation />, navigationDOM);