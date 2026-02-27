---
layout: page
title: Paintbook
description: Dibuja algo, lo que sea, un mono todo mal hecho, un saludo, arte moderno incomprendido, lo que quieras.
image: /assets/images/logo.png
tags: [guestbook, paintbook, libro-de-visitas]
permalink: /paintbook/
last-modified-at: <span id="last-updated-at">2026-02-26 19:02:00</span>
---

<p class="text-center">{{ page.description }}</p>

<p class="text-center">¿Quieres escribir en vez de dibujar? 👇</p>

<ul class="list-inline mb-4 text-center">
    <li class="list-inline-item">
        <a class="btn btn-primary btn-sm" href="/guestbook/">
          <i class="fa-solid fa-pen-nib"></i> Guestbook
        </a>
    </li>
</ul>

<div class="text-center">
<button id="btn-code-of-conduct" class="btn btn-primary collapsed" data-toggle="collapse" data-target="#collapseCodeOfConduct" role="button" aria-expanded="false" aria-controls="collapseCodeOfConduct">
    <i class="fa-solid fa-caret-right"></i> Código de conducta
</button>
</div>

<div class="collapse" id="collapseCodeOfConduct">
<ul>
<li>🚫 No odio/hate</li>
<li>🚫 No spam</li>
<li>🚫 No publicidad</li>
<li>🔒 No compartas información privada</li>
<li>🤝 Sé respetuoso/a conmigo y con los demás en los comentarios</li>
</ul>
</div>

{::nomarkdown}
<main id="paintbook" class="my-4">
    <div class="left-block">
        <div class="colors">
            <button type="button" value="#0000ff"></button>
            <button type="button" value="#009fff"></button>
            <button type="button" value="#0fffff"></button>
            <button type="button" value="#bfffff"></button>
            <button type="button" value="#000000"></button>
            <button type="button" value="#333333"></button>
            <button type="button" value="#666666"></button>
            <button type="button" value="#999999"></button>
            <button type="button" value="#ffcc66"></button>
            <button type="button" value="#ffcc00"></button>
            <button type="button" value="#ffff00"></button>
            <button type="button" value="#ffff99"></button>
            <button type="button" value="#003300"></button>
            <button type="button" value="#555000"></button>
            <button type="button" value="#00ff00"></button>
            <button type="button" value="#99ff99"></button>
            <button type="button" value="#f00000"></button>
            <button type="button" value="#ff6600"></button>
            <button type="button" value="#ff9933"></button>
            <button type="button" value="#f5deb3"></button>
            <button type="button" value="#330000"></button>
            <button type="button" value="#663300"></button>
            <button type="button" value="#cc6600"></button>
            <button type="button" value="#deb887"></button>
            <button type="button" value="#aa0fff"></button>
            <button type="button" value="#cc66cc"></button>
            <button type="button" value="#ff66ff"></button>
            <button type="button" value="#ff99ff"></button>
            <button type="button" value="#e8c4e8"></button>
            <button type="button" value="#ffffff"></button>
        </div>
        <div class="brushes">
            <button type="button" value="1"></button>
            <button type="button" value="2"></button>
            <button type="button" value="3"></button>
            <button type="button" value="4"></button>
            <button type="button" value="5"></button>
        </div>
        <div class="buttons">
            <button id="clear" type="button">Limpiar</button>
            <button id="save" type="button">Guardar</button>
        </div>
    </div>
    <div class="right-block">
        <canvas id="paint-canvas" width="640" height="400"></canvas>
    </div>
</main>
{:/nomarkdown}

<div class="text-center">
<small>Basado en el trabajo de [Alperen][2]{:target="_blank"}.</small>
</div>

---

<div class="text-center">
<p>Dibuja lo que quieras, el rollo es que lo que dibujes no se publica automáticamente. Entonces por favor guarda tu dibujo y [mándamelo por email][1] para ponerlo aquí abajito. 👇</p>
<p>Este cotorreo solo funciona en desktop.</p>
</div>

[1]: /contacto/
[2]: https://codepen.io/alperentalaslioglu/pen/yPGgvP
