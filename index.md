---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
description: Punk dude coding his way through chaos. Nintendo enthusiast, DIY advocate. Still losing followers since 2007.
image: /assets/images/logo.png
---

<h1 class="text-center">{{ site.title }}</h1>

<span class="first-letter">H</span>ola 👋, soy Luis Carlos Pando, aka `Mijo` (<a href="#" data-pronunciation data-toggle="tooltip" data-placement="top" data-html="true" title="Pronounced as /ˈmiːhoʊ/">/ˈmiːhoʊ/</a> 🔊), un vato de [Chihuahua, México][1]{:target="_blank"} que [hace cosas para el Internet][3]{:rel="me" target="_blank"} y amante de la música, especialmente el punk, metal y el hardcore. Algunos tal vez me ubiquen por haber creado [Hitz-Musik.net][4]{:target="_blank"} (RIP 🪦) junto a unos buenos amigos. "El Hitz" era una comunidad dedicada a cubrir la música y la escena local de Chihuahua. También estaba chido el cotorreo de armar toquines, pero de eso solo me quedan recuerdos muy chidos.

Decidí crear mi sitio personal por mi amor por las computadoras 👨‍💻 y el Internet 🌐. Me surgió una necesidad de tener [mi propio espacio en la web][5], un lugar donde pudiera hablar de lo que yo quisiera, experimentar sin miedo a equivocarme, compartir y aprender. Y este sitio es básicamente eso, un lugar que concentra todo lo que soy y <strong>todo lo que hago</strong> 😌. (BTW, hora estoy [compartiendo mis fotos aquí][6]. 📸)

<div class="collapse" id="collapseIntro">
No es ningún secreto el amor que le tengo a Nintendo 🕹️ y [aquí][7] llevo un registro de los videojuegos que tengo en mi colección. También armé la comunidad de [Mode 7 🎮 🕹️][8] (✨ *All are welcome!* ✨) en Discord junto a unos amigos. Ahí platicamos de nuestros juegos favoritos, cotorreamos todo el día y arreglamos nuestras diferencias [en este frenético torneo de *Mario Kart* 🏁][9]. Todos los jueves en la noche [transmitimos el torneo][10].

De vez en cuando comparto cosas en [Mastodon][11]{:rel="me" target="_blank"}, [Bluesky][12]{:rel="me" target="_blank"}  y en [omg.lol][13]{:rel="me" target="_blank"}.

También llevo un registro de toda [la música que escucho 🎧][14]{:rel="me" target="_blank"} en mi perfil de [Last.fm 🎵][15]{:rel="me" target="_blank"} (*been doin' it since '05 baby!*).

Y tengo un guestbook 📖, si te animas, puedes [pasar a firmarlo][16] y saludar. ✌️

Eso es todo... de seguro ni supiste como llegaste, pero no importa, te agradezco por estar aquí. ✨
</div>

<button id="btn-read-more" class="btn btn-primary collapsed" data-toggle="collapse" data-target="#collapseIntro" role="button" aria-expanded="false" aria-controls="collapseIntro">
    <i class="fa-solid fa-caret-right"></i> Leer más
</button>

---

<ul id="last-played" class="list-unstyled mb-0">
    <li>
        <span class="badge badge-success">¡Nuevo!</span> <i class="fa-solid fa-music"></i> Última reproducción: <span id="last-played-song"></span>
    </li>
</ul>

<ul class="list-inline">
    <li class="list-inline-item">
        <h2><i class="fa-solid fa-file-pen"></i> Blog</h2>
    </li>
    <li class="list-inline-item">
        <a href="https://blog.luiscarlospando.com/rss/" class="btn btn-primary btn-sm" style="vertical-align: super;">
            <i class="fa-solid fa-rss"></i> Suscribirse
        </a>
    </li>
</ul>

<ul id="latest-posts"></ul>

<a class="btn btn-primary" href="https://blog.{{ site.domain }}/" target="_self">
    <i class="fa-solid fa-list-ul"></i> Ver todos
</a>

---

<ul class="list-inline">
    <li class="list-inline-item">
        <h2><i class="fa-solid fa-link"></i> Links <i class="ico-links-info fa-solid fa-circle-info"  data-toggle="tooltip" data-placement="top" data-html="true" title="Esta es una lista de cosas que he encontrado navegando en Internet. Si algo me gusta o me parece interesante lo voy agregando a esta lista. La mayoría de los links son en inglés."></i></h2>
    </li>
    <li class="list-inline-item">
        <a href="https://bg.raindrop.io/rss/public/50598757" class="btn btn-primary btn-sm" style="vertical-align: super;">
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
[4]: http://hitz-musik.net
[5]: /acerca-de/
[6]: /photos/
[7]: https://www.backloggd.com/u/{{ site.backloggd_username }}
[8]: /discord/
[9]: /games/mario-kart/
[10]: /live/
[11]: https://social.lol/@{{ site.mastodon_username }}
[12]: {{ site.bluesky_url }}
[13]: https://home.omg.lol/referred-by/{{ site.omglol_username }}
[14]: https://music.apple.com/profile/{{ site.apple_music_username }}
[15]: https://last.fm/user/{{ site.lastfm_username }}
[16]: /guestbook/
