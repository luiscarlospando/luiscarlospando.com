'use strict';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav id="menu">
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li>
                        <a href="https://blog.luiscarlospando.net/">Blog</a>
                        <ul>
                            <li><a href="https://blog.luiscarlospando.net/personal/">Personal</a></li>
                            <li><a href="https://blog.luiscarlospando.net/musica/">Música</a></li>
                            <li><a href="https://blog.luiscarlospando.net/gaming/">Gaming</a></li>
                            <li><a href="https://blog.luiscarlospando.net/tecnologia/">Tecnología</a></li>
                            <li><a href="https://blog.luiscarlospando.net/programacion/">Programación</a></li>
                            <li><a href="https://blog.luiscarlospando.net/diseno/">Diseño</a></li>
                            <li><a href="https://blog.luiscarlospando.net/todo-lo-demas/">Todo lo demás</a></li>
                            <li><a href="https://blog.luiscarlospando.net/author/me/">Archivos del blog</a></li>
                            <li><a href="https://blog.luiscarlospando.net/hashtags/">Explorar por hashtag</a></li>
                            <li><a href="https://blog.luiscarlospando.net/rss/">RSS</a></li>
                        </ul>
                    </li>
                    <li><a href="/contacto/">Contacto</a></li>
                    <li><a href="/apps/">Mis apps favoritas</a></li>
                    <li>
                        <a href="/mode7vg/">Mode 7</a>
                    </li>
                    <li>
                        <a href="#">Nintendo Switch</a>
                        <ul>
                            <li><a href="/splatoon-2/">Splatoon 2</a></li>
                            <li><a href="/smash-bros/">Super Smash Bros. Ultimate</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/live/">Live</a>
                        <ul>
                            <li><a href="/live/archivos/">Transmisiones pasadas</a></li>
                        </ul>
                    </li>
                    <li><a href="/acerca-de/">Acerca de</a></li>
                </ul>
            </nav>
        );
    }
}

let navigationDOM = document.querySelector('#navigation');
ReactDOM.render(<Navigation />, navigationDOM);