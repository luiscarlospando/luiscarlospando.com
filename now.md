---
layout: page
title: Now
description: Esta es mi página `/now` y aquí voy poniendo en lo que ando actualmente.
image: /assets/images/logo.png
tags: now now-page current-status
permalink: /now/
last-modified-at: <span id="now-updated"></span>
current-location: Chihuahua, México
---

<div class="card last-updated my-3 text-center">
<div class="card-body rounded">
#### <code>Última actualización:</code> [{{ page.last-modified-at }}]({{ site.omglol_url }}/now) desde {{ page.current-location }}
</div>
</div>

<p class="text-center">{{ page.description }}</p>

<div class="text-center">
<ul class="list-inline">
<li class="list-inline-item">
<a class="btn btn-primary btn-sm" href="{{ site.omglol_url }}/now" rel="alternate">
<i class="fa-solid fa-heart"></i> Reflejo en omg.lol
</a>
</li>
<li class="list-inline-item">
<a class="btn btn-primary btn-sm" href="{{ site.url }}/category/now/">
<i class="fa-solid fa-list-ul"></i> Entradas anteriores
</a>
</li>
</ul>
</div>

<div id="now-content"></div>
