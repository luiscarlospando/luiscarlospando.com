---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
description: Mijo (/ˈmiːhoʊ/). Punk dude. Millennial missing the old internet. Lover of music and the quirky, weird, personal web. Losing followers since 2007.
image: /assets/images/logo.png
tags: [home, homepage, portada, inicio, luis-carlos-pando, mijo]
---

<h1 class="text-center">{{ site.title }}</h1>

<span class="first-letter">H</span>ola 👋, soy Luis Carlos Pando, aka `Mijo` (<a href="#" data-pronunciation data-toggle="tooltip" data-placement="top" data-html="true" title="Pronounced as /ˈmiːhoʊ/">/ˈmiːhoʊ/</a> 🔊), un vato de [Chihuahua, México][1]{:rel="noreferrer noopener" target="_blank"} que se dedica a [codear cosas para el Internet][2]{:rel="me" target="_blank"}. Siempre me han gustado las computadoras 👨‍💻 y el Internet 🌐 y eso me inspiró a [crear mi propio sitio][3], un lugar donde pudiera hablar de lo que yo quiera, experimentar sin miedo a equivocarme, compartir y aprender. Y este sitio es básicamente eso, un lugar que concentra todo lo que hago y <strong>todo lo que soy</strong>.

<div class="collapse" id="collapseIntro">
Amo la música, siempre ha sido una parte importante de mi vida. Los géneros que más consumo son hardcore, punk y metal. Algunos tal vez me ubiquen por haber creado el [Hitz-Musik.net][4]{:target="_blank" rel="noopener"} (RIP 🪦) junto a unos buenos amigos. "El Hitz" era una comunidad dedicada a apoyar la escena local de Chihuahua. Estaba chido el cotorreo de armar toquines pero de eso solo me quedan puros buenos recuerdos.

También llevo un registro de toda [la música que escucho 🎧][5] en mi perfil de [Last.fm 🎵][6]{:rel="me noreferrer noopener" target="_blank"} (que llevo usando desde 2005 baby!).

Me gustan mucho los videojuegos 🕹️ y [aquí llevo un registro][7] de los juegos que tengo en mi colección. También armé la comunidad de [Mode 7 🎮 🕹️][8] en Discord con unos amigos (*All are welcome!*) para platicar de nuestros juegos favoritos, cotorrear todo el día y disfrutar de la bonita tradición de [jugar en el *Mode 7 Grand Prix* 🏁][9] todos los jueves por la noche. [Aquí mero transmitimos en vivo el caos][10].

He usado prácticamente todas las redes sociales habidas y por haber pero ahora estoy principalmente en [Mastodon][11]{:rel="me noreferrer noopener" target="_blank"}, [Bluesky][12]{:rel="me noreferrer noopener" target="_blank"}, [omg.lol][13]{:rel="me noreferrer noopener" target="_blank"} e [Instagram][14]{:rel="me noreferrer noopener" target="_blank"}.

[Aquí ando compartiendo fotos][15] 📸 y tengo un guestbook 📖, que si te animas, puedes [pasar a firmarlo][16]  saludar. ✌️

Ya no sé qué más decir, pero si te quedaste con ganas de saber más de mi nada interesante vida, entonces [pásale a mi página Acerca de][3].
</div>

<button id="btn-read-more" class="btn btn-primary collapsed" data-toggle="collapse" data-target="#collapseIntro" role="button" aria-expanded="false" aria-controls="collapseIntro">
    <i class="fa-solid fa-caret-right"></i> Leer más
</button>

---

<ul id="last-played" class="list-unstyled mb-0">
    <li>
        <i class="fa-solid fa-music"></i> Última reproducción: <span id="last-played-song"></span> <span id="last-played-ago"></span>
    </li>
</ul>

{::nomarkdown}
<div class="w-100 d-inline-block text-center z-2">
<small>
🎧
<a href="/music/">
Ver mis álbumes más escuchados de los últimos 30 días
</a>
</small>
</div>
{:/nomarkdown}

---

<ul class="list-inline">
    <li class="list-inline-item">
        <h2><i class="fa-solid fa-signs-post"></i> ¿Por dónde empezar?</h2>
    </li>
    <li class="list-inline-item">
        <button id="btn-surprise-me" class="btn btn-primary btn-sm" style="vertical-align: super;" data-toggle="tooltip" data-placement="top" data-html="true" title="Este botón te lleva a una página al azar o a algún post de mi blog.">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Sorpréndeme
        </button>
    </li>
</ul>

{::nomarkdown}
<h5><i class="fa-solid fa-user"></i> Sobre mí</h5>

<nav>
    <ul class="list-inline mb-0">
        <li class="list-inline-item">
            <a href="/about/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Conoce más sobre mí" title="Conoce más sobre mí">
                <i class="fa-solid fa-circle-info"></i> Acerca de
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/now/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Ve en qué ando actualmente" title="Ve en qué ando actualmente">
                <i class="fa-solid fa-clock"></i> Now
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/uses/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="El stack de apps que uso a diario" title="El stack de apps que uso a diario">
                <i class="fa-solid fa-wrench"></i> Uses
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/contact/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Revisa las maneras de ponerte en contacto conmigo" title="Revisa las maneras de ponerte en contacto conmigo">
                <i class="fa-solid fa-address-card"></i> Contacto
            </a>
        </li>
    </ul>
</nav>

<h5><i class="fa-solid fa-pen"></i> Contenido</h5>

<nav>
    <ul class="list-inline mb-0">
        <li class="list-inline-item">
            <a href="{{ site.blog_url }}" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Explora mi blog" title="Explora mi blog">
                <i class="fa-solid fa-message"></i> Blog
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/photos/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Ve las fotos que he tomado con mi iPhone" title="Ve las fotos que he tomado con mi iPhone">
                <i class="fa-solid fa-camera"></i> Fotos
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/music/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Checa los álbumes que he escuchado en los últimos 30 días" title="Checa los álbumes que he escuchado en los últimos 30 días">
                <i class="fa-solid fa-headphones"></i> Lo que escucho
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/music/playlist/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Desde septiembre de 2025 actualizo este playlist diariamente (o eso intento) con canciones cruciales en mi vida y donde escribo algo sobre cada canción" title="Desde septiembre de 2025 actualizo este playlist diariamente (o eso intento) con canciones cruciales en mi vida y donde escribo algo sobre cada canción">
                <i class="fa-solid fa-record-vinyl"></i> Crucial Tracks
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/music/loved-tracks/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Estas son las 100 canciones que me han gustado recientemente" title="Estas son las 100 canciones que me han gustado recientemente">
                <i class="fa-solid fa-heart"></i> Canciones favoritas
            </a>
        </li>
    </ul>
</nav>

<h5><i class="fa-solid fa-gamepad"></i> Fun/Geek</h5>

<nav>
    <ul class="list-inline mb-0">
        <li class="list-inline-item">
            <a href="/games/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Revisa lo que estoy jugando actualmente" title="Revisa lo que estoy jugando actualmente">
                <i class="fa-solid fa-gamepad"></i> Games
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/games/favorites/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Esta es una lista de mis juegos favoritos" title="Esta es una lista de mis juegos favoritos">
                <i class="fa-solid fa-star"></i> Mis juegos favoritos
            </a>
        </li>
    </ul>
</nav>

<h5><i class="fa-solid fa-globe"></i> Web y Comunidad</h5>

<nav>
    <ul class="list-inline mb-0">
        <li class="list-inline-item">
            <a href="/links/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Colección de links que encuentro navegando en Internet" title="Colección de links que encuentro navegando en Internet">
                <i class="fa-solid fa-link"></i> Links
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/blogroll/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Revisa mis blogs y websites favoritos" title="Revisa mis blogs y websites favoritos">
                <i class="fa-solid fa-bookmark"></i> Blogroll
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/guestbook/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Deja un mensaje en mi guestbook" title="Deja un mensaje en mi guestbook">
                <i class="fa-solid fa-pen-nib"></i> Guestbook
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/paintbook/" class="btn btn-primary btn-sm mb-3" data-toggle="tooltip" data-placement="top" aria-label="Deja un dibujo en mi paintbook" title="Deja un dibujo en mi paintbook">
                <i class="fa-solid fa-paintbrush"></i> Paintbook
            </a>
        </li>
        <li class="list-inline-item">
            <span class="badge badge-success pulse-subtle position-relative" style="top: 0.35rem; left: 1.6rem;">Nuevo</span>
        </li>
    </ul>
</nav>
{:/nomarkdown}

---

<ul class="list-inline">
    <li class="list-inline-item">
        <h2><i class="fa-solid fa-file-pen"></i> Blog</h2>
    </li>
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="{{ site.blog_feed }}" rel="me" style="vertical-align: super;">
            <i class="fa-solid fa-rss"></i> Suscribirse
        </a>
    </li>
</ul>

<ul id="latest-posts"></ul>

<a class="btn btn-primary" href="{{ site.blog_url }}">
    <i class="fa-solid fa-list-ul"></i> Ver todos
</a>

---

<ul class="list-inline">
    <li class="list-inline-item">
        <h2><i class="fa-solid fa-link"></i> Links <i class="ico-links-info fa-solid fa-circle-info" data-toggle="tooltip" data-placement="top" data-html="true" aria-label="Esta es una colección de links (o bookmarks) que voy encontrando navegando en Internet. La mayoría de los links son en inglés." title="Esta es una colección de links (o bookmarks) que voy encontrando navegando en Internet. La mayoría de los links son en inglés."></i></h2>
    </li>
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="{{ site.links_feed }}" rel="me noopener" style="vertical-align: super;">
            <i class="fa-solid fa-rss"></i> Suscribirse
        </a>
    </li>
</ul>

<ul id="bookmarks"></ul>

<a class="btn btn-primary" href="https://{{ site.domain }}/links/">
    <i class="fa-solid fa-list-ul"></i> Ver todos
</a>

[1]: https://es.wikipedia.org/wiki/Chihuahua_(Chihuahua)
[2]: https://github.com/{{ site.github_username }}
[3]: /about/
[4]: http://hitz-musik.net/
[5]: /music/
[6]: {{ site.lastfm_url }}
[7]: {{ site.backloggd_url }}
[8]: /discord/
[9]: /games/mario-kart/
[10]: /live/
[11]: {{ site.mastodon_url }}
[12]: {{ site.bluesky_url }}
[13]: https://home.omg.lol/referred-by/{{ site.omglol_username }}
[14]: {{ site.instagram_url }}
[15]: /photos/
[16]: /guestbook/
