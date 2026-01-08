---
layout: page
title: Mis álbumes más escuchados
description: Aquí está un log de los 18 álbumes que más he escuchado en los últimos 30 días (vía Last.fm).
image: /assets/images/logo.png
tags: [music, música, most-listened, most-listened-albums, álbumes-más-escuchados, last.fm]
permalink: /music/
---

<p class="text-center">{{ page.description }}</p>

<ul class="list-inline mb-4 text-center">
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="{{ site.apple_music_url}}" target="_blank" rel="me noopener noreferrer">
          <i class="fa-brands fa-apple"></i> Apple Music
        </a>
    </li>
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="{{ site.lastfm_url}}" target="_blank" rel="me noopener noreferrer">
          <i class="fa-brands fa-lastfm"></i> Last.fm
        </a>
    </li>
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="/music/loved-tracks/">
          <i class="fa-solid fa-heart"></i> Canciones favoritas
        </a>
        <span class="badge badge-success pulse-subtle pulse-fast">Nuevo</span>
    </li>
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="/music/playlist/">
          <i class="fa-solid fa-record-vinyl"></i> Playlist (Crucial Tracks)
        </a>
    </li>
</ul>

<div class="row" id="lastfm-albums-grid"></div>
