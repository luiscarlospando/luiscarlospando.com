---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
description: Mijo (/ˈmiːhoʊ/). Punk dude coding his way through chaos. Still losing followers since 2007.
image: /assets/images/logo.png
tags: [home, homepage, portada, inicio, luis-carlos-pando, mijo]
---

<h1 class="text-center">{{ site.title }}</h1>

<span class="first-letter">H</span>ola 👋, soy Luis Carlos Pando, aka `Mijo` (<a href="#" data-pronunciation data-toggle="tooltip" data-placement="top" data-html="true" title="Pronounced as /ˈmiːhoʊ/">/ˈmiːhoʊ/</a> 🔊), un vato de [Chihuahua, México][1]{:rel="noreferrer noopener" target="_blank"} que [hace cosas para el Internet][3]{:rel="me" target="_blank"}. Mi interés por las computadoras 👨‍💻 y el Internet 🌐 me hicieron crear este sitio. Tuve necesidad de [tener mi propio lugar en la web][4], donde pudiera hablar de lo que yo quiera, experimentar sin miedo a equivocarme, compartir y aprender. Y este sitio es básicamente eso, un lugar que concentra todo lo que hago y <strong>todo lo que soy</strong>.

<div class="collapse" id="collapseIntro">
Amo la música, es una parte importante de mi y los géneros que más me gustan son el punk, metal y el hardcore. Algunos tal vez me ubiquen por haber creado [Hitz-Musik.net][5]{:target="_blank" rel="noopener"} (RIP 🪦) junto a unos buenos amigos. "El Hitz" era una comunidad dedicada a apoyar la escena local de Chihuahua. Estaba chido el cotorreo de armar toquines pero de eso solo me quedan puros buenos recuerdos.

No es ningún secreto el amor que le tengo a Nintendo 🕹️ y [aquí][7] llevo un registro de los videojuegos que tengo en mi colección. También armé la comunidad de [Mode 7 🎮 🕹️][8] (✨ *All are welcome!* ✨) en Discord junto a unos amigos. Ahí platicamos de nuestros juegos favoritos, cotorreamos todo el día y arreglamos nuestras diferencias [en este frenético torneo de *Mario Kart* 🏁][9]. Todos los jueves en la noche [transmitimos el torneo][10].

De vez en cuando comparto cosas en [Mastodon][11]{:rel="me noreferrer noopener" target="_blank"}, [Bluesky][12]{:rel="me noreferrer noopener" target="_blank"}  y en [omg.lol][13]{:rel="me noreferrer noopener" target="_blank"}.

También llevo un registro de toda [la música que escucho 🎧][14] en mi perfil de [Last.fm 🎵][15]{:rel="me noreferrer noopener" target="_blank"} (*been doin' it since '05 baby!*).

[Aquí ando compartiendo mis fotos][6] 📸 y tengo un guestbook 📖, que si te animas, puedes [pasar a firmarlo][16] y saludar. ✌️

Si te quedaste con ganas de más, entonces [pásale a mi página Acerca de][4].
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
<nav>
    <ul class="list-inline">
        <li class="list-inline-item">
            <a href="/about/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Conoce más sobre mi" title="Conoce más sobre mi">
                <i class="fa-solid fa-circle-info"></i> Acerca de
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/now/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Ve en qué ando actualmente" title="Ve en qué ando actualmente">
                <i class="fa-solid fa-clock"></i> Now
            </a>
        </li>
        <li class="list-inline-item">
            <a href="{{ site.blog_url }}" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Explora mi blog" title="Explora mi blog">
                <i class="fa-solid fa-message"></i> Blog
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/photos/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Ve las fotos que he tomado con mi iPhone" title="Ve las fotos que he tomado con mi iPhone">
                <i class="fa-solid fa-camera"></i> Fotos
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/music/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Checa los álbumes que he escuchado en los últimos 30 días" title="Checa los álbumes que he escuchado en los últimos 30 días">
                <i class="fa-solid fa-headphones"></i> Música
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/music/loved-tracks/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Estas son las 100 canciones que me han gustado recientemente" title="Estas son las 100 canciones que me han gustado recientemente">
                <i class="fa-solid fa-heart"></i> Canciones favoritas
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/music/playlist/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Un playlist que actualizo diariamente con música que voy agregando a mi perfil de Crucial Tracks desde septiembre de 2025" title="Un playlist que actualizo diariamente con música que voy agregando a mi perfil de Crucial Tracks desde septiembre de 2025">
                <i class="fa-solid fa-record-vinyl"></i> Playlist (Crucial Tracks)
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/games/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Revisa lo que estoy jugando actualmente" title="Revisa lo que estoy jugando actualmente">
                <i class="fa-solid fa-gamepad"></i> Games
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/games/favorites/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Esta es una lista de mis juegos favoritos" title="Esta es una lista de mis juegos favoritos">
                <i class="fa-solid fa-star"></i> Mis juegos favoritos
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/uses/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="El stack de apps que uso a diario" title="El stack de apps que uso a diario">
                <i class="fa-solid fa-wrench"></i> Uses
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/contact/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Revisa las maneras de ponerte en contacto conmigo" title="Revisa las maneras de ponerte en contacto conmigo">
                <i class="fa-solid fa-address-card"></i> Contacto
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/guestbook/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Deja un mensaje en mi guestbook" title="Deja un mensaje en mi guestbook">
                <i class="fa-solid fa-pen-nib"></i> Guestbook
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/links/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Colección de links que me encuentro navegando en Internet" title="Colección de links que me encuentro navegando en Internet">
                <i class="fa-solid fa-link"></i> Links
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/blogroll/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Revisa mis blogs y websites favoritos" title="Revisa mis blogs y websites favoritos">
                <i class="fa-solid fa-bookmark"></i> Blogroll
            </a>
        </li>
        <li class="list-inline-item">
            <a href="/top4/" class="btn btn-primary mb-3" data-toggle="tooltip" data-placement="top" aria-label="Mi top 3 con una mención honorífica en varias categorías" title="Mi top 3 con una mención honorífica en varias categorías">
                <i class="fa-solid fa-trophy"></i> Top 4
            </a>
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
        <a class="btn btn-primary btn-sm" href="{{ site.blog_url }}/rss/" rel="me" style="vertical-align: super;">
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
        <h2><i class="fa-solid fa-link"></i> Links <i class="ico-links-info fa-solid fa-circle-info" data-toggle="tooltip" data-placement="top" data-html="true" title="Esta es mi colección de links (o bookmarks) que voy encontrando navegando en Internet. Los pongo en mi sitio a manera de 'retweets'. La mayoría de los links son en inglés."></i></h2>
    </li>
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="https://bg.raindrop.io/rss/public/50598757" rel="me noopener" style="vertical-align: super;">
            <i class="fa-solid fa-rss"></i> Suscribirse
        </a>
    </li>
</ul>

<ul id="bookmarks"></ul>

<a class="btn btn-primary" href="https://{{ site.domain }}/links/">
    <i class="fa-solid fa-list-ul"></i> Ver todos
</a>

[1]: https://es.wikipedia.org/wiki/Chihuahua_(Chihuahua)
[2]: https://www.instagram.com/primitivegirl
[3]: https://github.com/{{ site.github_username }}
[4]: /about/
[5]: http://hitz-musik.net/
[6]: /photos/
[7]: {{ site.backloggd_url }}
[8]: /discord/
[9]: /games/mario-kart/
[10]: /live/
[11]: {{ site.mastodon_url }}
[12]: {{ site.bluesky_url }}
[13]: https://home.omg.lol/referred-by/{{ site.omglol_username }}
[14]: /music/
[15]: {{ site.lastfm_url }}
[16]: /guestbook/
