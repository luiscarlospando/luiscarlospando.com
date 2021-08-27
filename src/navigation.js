'use strict';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav id="menu">
                <ul>
                    <li><a href="/"><i class="fas fa-home"></i> Inicio</a></li>
                    <li>
                        <a href="https://blog.luiscarlospando.com/"><i class="fas fa-quote-left"></i> Blog</a>
                        <ul>
                            <li><a href="https://blog.luiscarlospando.com/personal/"><i class="fas fa-user"></i> Personal</a></li>
                            <li><a href="https://blog.luiscarlospando.com/musica/"><i class="fas fa-music"></i> Música</a></li>
                            <li><a href="https://blog.luiscarlospando.com/gaming/"><i class="fas fa-gamepad"></i> Gaming</a></li>
                            <li><a href="https://blog.luiscarlospando.com/tecnologia/"><i class="fas fa-microchip"></i> Tecnología</a></li>
                            <li><a href="https://blog.luiscarlospando.com/coding/"><i class="fas fa-code"></i> Coding</a></li>
                            <li><a href="https://blog.luiscarlospando.com/diseno/"><i class="fas fa-paint-brush"></i> Diseño</a></li>
                            <li><a href="https://blog.luiscarlospando.com/todo-lo-demas/"><i class="fas fa-mouse-pointer"></i> Todo lo demás</a></li>
                            <li><a href="https://blog.luiscarlospando.com/author/me/"><i class="fas fa-folder-open"></i> Archivos del blog</a></li>
                            <li><a href="https://blog.luiscarlospando.com/hashtags/"><i class="fas fa-hashtag"></i> Explorar por hashtag</a></li>
                            <li><a href="https://blog.luiscarlospando.com/rss/"><i class="fas fa-rss-square"></i> RSS</a></li>
                        </ul>
                    </li>
                    <li><a href="/contacto/"><i class="fas fa-envelope"></i> Contacto</a></li>
                    <li><a href="/developer/"><i class="fas fa-code"></i> Development Stuff</a></li>
                    <li><a href="/apps/"><i class="fas fa-heart"></i> Mis apps favoritas</a></li>
                    <li>
                        <a href="/mode-7/"><i class="fas fa-gamepad"></i> Mode 7</a>
                        <ul>
                            <li><a href="/mode-7/mario-kart/"><i class="fas fa-gamepad"></i> Mario Kart 8 Deluxe (Mode 7 Grand Prix)</a></li>
                            <li><a href="/mode-7/rocket-league/"><i class="fas fa-gamepad"></i> Rocket League</a></li>
                            <li><a href="/mode-7/splatoon/"><i class="fas fa-gamepad"></i> Splatoon 2</a></li>
                            <li><a href="/mode-7/super-mario-maker/"><i class="fas fa-gamepad"></i> uper Mario Maker 2</a></li>
                            <li><a href="/mode-7/smash/"><i class="fas fa-gamepad"></i> Super Smash Bros. Ultimate</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="https://blog.luiscarlospando.com/hashtag/mode-7-podcast/"><i class="fas fa-microphone-alt"></i> Mode 7 Podcast</a>
                    </li>
                    <li>
                        <a href="/nintendo/"><i class="fab fa-nintendo-switch"></i> Nintendo Switch</a>
                    </li>
                    <li>
                        <a href="/live/"><i class="fas fa-video"></i> Live</a>
                    </li>
                    <li><a href="/acerca-de/"><i class="fas fa-info-circle"></i> Acerca de</a></li>
                </ul>
            </nav>
        );
    }
}

let navigationDOM = document.querySelector('#navigation');
ReactDOM.render(<Navigation />, navigationDOM);