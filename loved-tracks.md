---
layout: page
title: Canciones favoritas
description: Estas son las 100 canciones que me han gustado recientemente.
image: /assets/images/logo.png
tags: [music, música, favorite-songs, favorite-tracks, loved-songs, loved-tracks, canciones-favoritas, last.fm]
permalink: /music/loved-tracks/
---

<div class="card last-updated my-3 text-center">
<div class="card-body rounded">
#### <code>Última actualización:</code> <span id="last-updated-at">Cargando...</span>
</div>
</div>

<p class="text-center">{{ page.description }}</p>

<ul class="list-inline mb-4 text-center">
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="/music/">
          <i class="fa-solid fa-headphones"></i> Mis álbumes más escuchados
        </a>
    </li>
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="/music/playlist/">
          <i class="fa-solid fa-record-vinyl"></i> Playlist (Crucial Tracks)
        </a>
    </li>
</ul>

<ul id="loved-tracks" class="list-unstyled"></ul>
