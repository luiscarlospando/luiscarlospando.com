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

<span class="first-letter">H</span>ola 👋, soy Luis Carlos Pando, aka `Mijo` (<a href="#" data-pronunciation data-toggle="tooltip" data-placement="top" data-html="true" title="Pronounced as /ˈmiːhoʊ/">/ˈmiːhoʊ/</a> 🔊), un [desarrollador web][1]{:rel="me" target="_blank"}, punk rocker y lo que se ofrezca de [Chihuahua, México][2]{:rel="noreferrer noopener" target="_blank"}. Siempre me han entonado las "compiurers" 👨‍💻 y el internet 🌐 y eso me inspiró a [crear este sitio][3], que es un lugar donde puedo hablar de lo que quiera, experimentar sin miedo a equivocarme, compartir y aprender. Y también sirve como un lugar que concentra todo lo que hago, todo lo que me gusta, y <strong>todo lo que soy</strong>.

<div class="collapse" id="collapseIntro">
Amo machín la música, siempre ha sido una parte importante de mi vida. Los géneros que más te consumo son hardcore, punk, metal y alternativo. Algunos tal vez me ubiquen por haber fundado [Hitz-Musik.net][4]{:target="_blank" rel="noopener"} (RIP 🪦) junto a unos buenos amigos. "El Hitz" era una comunidad dedicada a apoyar la escena local de Chihuahua. Estaba chido todo ese cotorreo de armar toquines pero de eso ya solo me quedan puros buenos recuerdos.

Llevo un registro de toda [la música que escucho 🎧][5] en mi perfil de [Last.fm 🎵][6]{:rel="me noreferrer noopener" target="_blank"} (que llevo usando desde 2005 baby!).

También me gustan los videojuegos 🕹️ y [aquí llevo un registro][7] de los juegos que tengo en mi colección. Debido a mi interés por el gaming, armé la comunidad de [Mode 7 🎮 🕹️][8] en Discord con unos compas (*All are welcome!*). Ahí platicamos de nuestros juegos favoritos, cotorreamos todo el día y disfrutamos de la bonita tradición de [jugar en el *Mode 7 Grand Prix* 🏁][9] todos los jueves por la noche. [Aquí mero transmito en vivo el caos][10].

He usado prácticamente todas las redes sociales habidas y por haber, pero ahora estoy principalmente en [Mastodon][11]{:rel="me noreferrer noopener" target="_blank"}, [Bluesky][12]{:rel="me noreferrer noopener" target="_blank"}, [omg.lol][13]{:rel="me noreferrer noopener" target="_blank"} e [Instagram][14]{:rel="me noreferrer noopener" target="_blank"}.

[Aquí ando les ando compartiendo fotos][15] 📸 y también tengo un guestbook 📖, que si te animas, puedes [pasar a firmarlo][16] y saludar. ✌️

Ya no sé qué más decir, pero si te quedaste con ganas de saber más de mi vida nada interesante, entonces [pásale a mi página Acerca de][3].
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
<div class="row">
  <!-- Sobre mí -->
  <div class="col-6 col-lg-3 mb-4 mb-lg-0">
    <h5 class="mb-3">
      <i class="fa-solid fa-user"></i> Sobre mí
    </h5>
    <nav>
      <ul class="list-unstyled mb-0">
        <li class="mb-2">
          <a href="/about/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Conoce más sobre mí">
            <i class="fa-solid fa-circle-info mr-2"></i> <span>Acerca de</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/now/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Ve en qué ando actualmente">
            <i class="fa-solid fa-clock mr-2"></i> <span>Now</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/status/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Qué está pasando ahorita (micro updates)">
            <i class="fa-solid fa-icons mr-2"></i> <span>Estatus</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/uses/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="El stack de apps que uso a diario">
            <i class="fa-solid fa-wrench mr-2"></i> <span>Uses</span>
          </a>
        </li>
        <li>
          <a href="/contact/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Revisa las maneras de ponerte en contacto conmigo">
            <i class="fa-solid fa-address-card mr-2"></i> <span>Contacto</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Contenido -->
  <div class="col-6 col-lg-3 mb-4 mb-lg-0">
    <h5 class="mb-3">
      <i class="fa-solid fa-pen"></i> Contenido
    </h5>
    <nav>
      <ul class="list-unstyled mb-0">
        <li class="mb-2">
          <a href="{{ site.blog_url }}" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Explora mi blog">
            <i class="fa-solid fa-message mr-2"></i> <span>Blog</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/photos/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Ve las fotos que he tomado con mi iPhone">
            <i class="fa-solid fa-camera mr-2"></i> <span>Fotos</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/music/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Checa los álbumes que he estado escuchado los últimos 30 días">
            <i class="fa-solid fa-headphones mr-2"></i> <span>Qué estoy escuchando</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/music/crucial-tracks/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Playlist que actualizo frecuentemente con canciones cruciales en mi vida">
            <i class="fa-solid fa-record-vinyl mr-2"></i> <span>Crucial Tracks</span>
          </a>
        </li>
        <li>
          <a href="/music/loved-tracks/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Estas son las 100 canciones que me han gustado recientemente">
            <i class="fa-solid fa-heart mr-2"></i> <span>Canciones favoritas</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Geek & Games -->
  <div class="col-6 col-lg-3 mb-4 mb-lg-0">
    <h5 class="mb-3">
      <i class="fa-solid fa-gamepad"></i> Geek & Games
    </h5>
    <nav>
      <ul class="list-unstyled mb-0">
        <li class="mb-2">
          <a href="/games/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Revisa lo que ando jugando actualmente">
            <i class="fa-solid fa-gamepad mr-2"></i> <span>Games</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/games/favorites/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Esta es una lista de mis juegos favoritos">
            <i class="fa-solid fa-star mr-2"></i> <span>Mis juegos favoritos</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/live/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Aquí puedes ver mis transmisiones, por lo general estoy en vivo los jueves por la noche">
            <i class="fa-solid fa-video mr-2"></i> <span>Live</span>
          </a>
        </li>
        <li>
          <a href="/developer/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Esta es una lista de mis juegos favoritos">
            <i class="fa-solid fa-code mr-2"></i> <span>Development Stuff</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Web y Comunidad -->
  <div class="col-6 col-lg-3 mb-4 mb-lg-0">
    <h5 class="mb-3">
      <i class="fa-solid fa-globe"></i> Web y Comunidad
    </h5>
    <nav>
      <ul class="list-unstyled mb-0">
        <li class="mb-2">
          <a href="/links/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Colección de links que encuentro navegando en Internet">
            <i class="fa-solid fa-link mr-2"></i> <span>Links</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/blogroll/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Revisa mis blogs y websites favoritos">
            <i class="fa-solid fa-bookmark mr-2"></i> <span>Blogroll</span>
          </a>
        </li>
        <li class="mb-2">
          <a href="/guestbook/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Deja un mensaje en mi guestbook">
            <i class="fa-solid fa-pen-nib mr-2"></i> <span>Guestbook</span>
          </a>
        </li>
        <li class="mb-2 d-flex align-items-center">
          <a href="/paintbook/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Deja un dibujo en mi paintbook">
            <i class="fa-solid fa-paintbrush mr-2"></i> <span>Paintbook</span>
          </a>
          <span class="badge badge-success ml-2 pulse-subtle position-relative" style="top: 0.7rem; left: 1.8rem;">Nuevo</span>
        </li>
        <li>
          <a href="/chat/" class="hub-link d-flex align-items-center"
             data-toggle="tooltip" data-placement="top"
             title="Únete a Mode 7">
            <i class="fa-solid fa-comment-dots mr-2"></i> <span>Chat</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>
{:/nomarkdown}

---

<ul class="list-inline">
    <li class="list-inline-item">
        <h2><i class="fa-solid fa-message"></i> Blog</h2>
    </li>
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="{{ site.blog_feed }}" rel="me" style="vertical-align: super;">
            <i class="fa-solid fa-rss"></i> Suscribirse
        </a>
    </li>
</ul>

<ul id="latest-posts" class="list-unstyled mb-4"></ul>

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

<ul id="bookmarks" class="list-unstyled mb-4"></ul>

<a class="btn btn-primary" href="https://{{ site.domain }}/links/">
    <i class="fa-solid fa-list-ul"></i> Ver todos
</a>

[1]: https://github.com/{{ site.github_username }}
[2]: https://es.wikipedia.org/wiki/Chihuahua_(Chihuahua)
[3]: /about/
[4]: http://hitz-musik.net/
[5]: /music/
[6]: {{ site.lastfm_url }}
[7]: {{ site.backloggd_url }}
[8]: /chat/
[9]: /games/mario-kart/
[10]: /live/
[11]: {{ site.mastodon_url }}
[12]: {{ site.bluesky_url }}
[13]: https://home.omg.lol/referred-by/{{ site.omglol_username }}
[14]: {{ site.instagram_url }}
[15]: /photos/
[16]: /guestbook/
