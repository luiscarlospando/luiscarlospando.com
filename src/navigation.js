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
                        <a href="https://blog.luiscarlospando.com/">Blog</a>
                        <ul>
                            <li><a href="https://blog.luiscarlospando.com/personal/">Personal</a></li>
                            <li><a href="https://blog.luiscarlospando.com/musica/">Música</a></li>
                            <li><a href="https://blog.luiscarlospando.com/gaming/">Gaming</a></li>
                            <li><a href="https://blog.luiscarlospando.com/tecnologia/">Tecnología</a></li>
                            <li><a href="https://blog.luiscarlospando.com/coding/">Coding</a></li>
                            <li><a href="https://blog.luiscarlospando.com/diseno/">Diseño</a></li>
                            <li><a href="https://blog.luiscarlospando.com/todo-lo-demas/">Todo lo demás</a></li>
                            <li><a href="https://blog.luiscarlospando.com/author/me/">Archivos del blog</a></li>
                            <li><a href="https://blog.luiscarlospando.com/hashtags/">Explorar por hashtag</a></li>
                            <li><a href="https://blog.luiscarlospando.com/rss/">RSS</a></li>
                        </ul>
                    </li>
                    <li><a href="/contacto/">Contacto</a></li>
                    <li><a href="/apps/">Mis apps favoritas</a></li>
                    <li>
                        <a href="/mode7vg/">Mode 7</a>
                    </li>
                    <li>
                        <a href="/nintendo/">Nintendo Switch</a>
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