---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
description: Punk dude first and foremost. Losing followers since 2007.
image: /assets/images/logo.png
---

<h1 class="text-center">{{ site.title }}</h1>

<span class="first-letter">H</span>ola 👋, soy Luis Carlos Pando (aka `Mijo`), un vato que vive en [Chihuahua, México][1]{:target="_blank"} con su bella esposa [Marissa ❤️][2]{:target="_blank"}. Me dedico a [hacer cosas para el Internet][3]{:rel="me" target="_blank"}, me gusta la música alternativa, especialmente el hardcore/punk y sub-géneros. Algunos tal vez me ubiquen por haber creado [Hitz-Musik.net][4]{:target="_blank"} (RIP 🪦) junto a unos buenos amigos. "El Hitz" era una comunidad dedicada a cubrir la música alternativa, la escena local de Chihuahua y armar toquines. De eso solo me quedan recuerdos muy chidos.

Mi razón para hacer este sitio es mi amor por las computadoras 👨‍💻 y el Internet 🌐. Sentí la necesidad de tener [mi propio espacio en la web][5], para hablar de lo que yo quisiera, equivocarme, experimentar y aprender. Básicamente esto se trata de escribir sobre lo que traigo en la mente, probar cosas nuevas, codear y pasarla chido. También busco que este lugar sirva como de una especie de bitácora de mi vida. 😌

<div class="collapse" id="collapseIntro">
No es secreto el amor que le tengo a Nintendo en especial 🕹️, [aquí][6] llevo un registro de los videojuegos que tengo en mi colección. Para rendir tributo y hacer de los videojuegos que me gustan todavía más interesantes, armé la comunidad de [Mode 7 🎮 🕹️][7] (✨ *All are welcome!* ✨) en Discord junto a unos amigos. Ahí hablamos de nuestros juegos favoritos todo el día y arreglamos nuestras diferencias [en este frenético torneo de *Mario Kart* 🏁][8]. Todos los jueves en la noche [transmitimos el torneo][9].

Ahorita ando compartiendo cosas random en [Mastodon][10]{:rel="me" target="_blank"} y en [omg.lol][11]{:rel="me" target="_blank"}, el sarcasmo y chistes de baja calidad, continúan por ahí.

También llevo un registro de toda [la música que escucho 🎧][12]{:rel="me" target="_blank"} en mi perfil de [Last.fm 🎵][13]{:rel="me" target="_blank"} (*been doin' it since '05 baby!*).

Ok, de seguro ni supiste como llegaste aquí, pero eso no importa, agradecido estoy de que pases por aquí. ✨
</div>

<button id="btn-read-more" class="btn btn-primary collapsed" data-toggle="collapse" data-target="#collapseIntro" role="button" aria-expanded="false" aria-controls="collapseIntro">
    <i class="fa-solid fa-plus"></i> Leer más
</button>

---

<h2><i class="fa-solid fa-rss"></i> Blog</h2>

<ul id="latest-posts"></ul>

<a class="btn btn-primary" href="https://blog.{{ site.domain }}/" target="_self">
    <i class="fa-solid fa-list-ul"></i> Ver todos
</a>

---

<h2><i class="fa-solid fa-link"></i> Links</h2>

<ul id="bookmarks"></ul>

<a class="btn btn-primary" href="https://{{ site.domain }}/links/">
    <i class="fa-solid fa-list-ul"></i> Ver todos
</a>

[1]: https://es.wikipedia.org/wiki/Chihuahua_(Chihuahua)
[2]: https://www.instagram.com/primitivegirl
[3]: https://github.com/{{ site.github_username }}
[4]: http://hitz-musik.net
[5]: /acerca-de/
[6]: https://www.backloggd.com/u/{{ site.backloggd_username }}
[7]: /discord/
[8]: /games/mario-kart/
[9]: /live/
[10]: https://social.lol/@{{ site.mastodon_username }}
[11]: https://home.omg.lol/referred-by/{{ site.omglol_username }}
[12]: https://music.apple.com/profile/{{ site.apple_music_username }}
[13]: https://last.fm/user/{{ site.lastfm_username }}
