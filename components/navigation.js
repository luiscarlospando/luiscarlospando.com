'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_React$Component) {
    _inherits(Navigation, _React$Component);

    function Navigation(props) {
        _classCallCheck(this, Navigation);

        return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));
    }

    _createClass(Navigation, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "nav",
                { id: "menu" },
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "/" },
                            React.createElement("i", { "class": "fas fa-home" }),
                            " Inicio"
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "https://blog.luiscarlospando.com/" },
                            React.createElement("i", { "class": "fas fa-quote-left" }),
                            " Blog"
                        ),
                        React.createElement(
                            "ul",
                            null,
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/personal/" },
                                    React.createElement("i", { "class": "fas fa-user" }),
                                    " Personal"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/musica/" },
                                    React.createElement("i", { "class": "fas fa-music" }),
                                    " M\xFAsica"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/gaming/" },
                                    React.createElement("i", { "class": "fas fa-gamepad" }),
                                    " Gaming"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/tecnologia/" },
                                    React.createElement("i", { "class": "fas fa-microchip" }),
                                    " Tecnolog\xEDa"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/coding/" },
                                    React.createElement("i", { "class": "fas fa-code" }),
                                    " Coding"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/diseno/" },
                                    React.createElement("i", { "class": "fas fa-paint-brush" }),
                                    " Dise\xF1o"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/todo-lo-demas/" },
                                    React.createElement("i", { "class": "fas fa-mouse-pointer" }),
                                    " Todo lo dem\xE1s"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/author/me/" },
                                    React.createElement("i", { "class": "fas fa-folder-open" }),
                                    " Archivos del blog"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/hashtags/" },
                                    React.createElement("i", { "class": "fas fa-hashtag" }),
                                    " Explorar por hashtag"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://blog.luiscarlospando.com/rss/" },
                                    React.createElement("i", { "class": "fas fa-rss-square" }),
                                    " RSS"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "/contacto/" },
                            React.createElement("i", { "class": "fas fa-envelope" }),
                            " Contacto"
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "/apps/" },
                            React.createElement("i", { "class": "fas fa-heart" }),
                            " Mis apps favoritas"
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "/mode7vg/" },
                            React.createElement("i", { "class": "fas fa-gamepad" }),
                            " Mode 7"
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "/nintendo/" },
                            React.createElement("i", { "class": "fab fa-nintendo-switch" }),
                            " Nintendo Switch"
                        ),
                        React.createElement(
                            "ul",
                            null,
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "/splatoon/" },
                                    "Splatoon 2"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "/super-mario-maker/" },
                                    "Super Mario Maker 2"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "/smash/" },
                                    "Super Smash Bros. Ultimate"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "/live/" },
                            React.createElement("i", { "class": "fas fa-video" }),
                            " Live"
                        ),
                        React.createElement(
                            "ul",
                            null,
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "/live/archivos/" },
                                    React.createElement("i", { "class": "fas fa-folder-open" }),
                                    " Transmisiones pasadas"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "/acerca-de/" },
                            React.createElement("i", { "class": "fas fa-info-circle" }),
                            " Acerca de"
                        )
                    )
                )
            );
        }
    }]);

    return Navigation;
}(React.Component);

var navigationDOM = document.querySelector('#navigation');
ReactDOM.render(React.createElement(Navigation, null), navigationDOM);