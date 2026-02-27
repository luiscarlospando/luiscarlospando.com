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
<li>🤝 Sé respetuoso/a conmigo</li>
</ul>
</div>

{::nomarkdown}
<main id="paintbook" class="my-4">
    <div class="left-block">
        <div class="colors">
            <button type="button" value="#0000ff" aria-label="Azul"></button>
            <button type="button" value="#009fff" aria-label="Azul claro"></button>
            <button type="button" value="#0fffff" aria-label="Cian"></button>
            <button type="button" value="#bfffff" aria-label="Cian claro"></button>
            <button type="button" value="#000000" aria-label="Negro"></button>
            <button type="button" value="#333333" aria-label="Gris oscuro"></button>
            <button type="button" value="#666666" aria-label="Gris medio"></button>
            <button type="button" value="#999999" aria-label="Gris claro"></button>
            <button type="button" value="#ffcc66" aria-label="Naranja claro"></button>
            <button type="button" value="#ffcc00" aria-label="Amarillo oscuro"></button>
            <button type="button" value="#ffff00" aria-label="Amarillo"></button>
            <button type="button" value="#ffff99" aria-label="Amarillo claro"></button>
            <button type="button" value="#003300" aria-label="Verde oscuro"></button>
            <button type="button" value="#555000" aria-label="Oliva"></button>
            <button type="button" value="#00ff00" aria-label="Verde"></button>
            <button type="button" value="#99ff99" aria-label="Verde claro"></button>
            <button type="button" value="#f00000" aria-label="Rojo"></button>
            <button type="button" value="#ff6600" aria-label="Naranja"></button>
            <button type="button" value="#ff9933" aria-label="Naranja claro intenso"></button>
            <button type="button" value="#f5deb3" aria-label="Beige"></button>
            <button type="button" value="#330000" aria-label="Vino oscuro"></button>
            <button type="button" value="#663300" aria-label="Marrón"></button>
            <button type="button" value="#cc6600" aria-label="Marrón claro"></button>
            <button type="button" value="#deb887" aria-label="Madera clara"></button>
            <button type="button" value="#aa0fff" aria-label="Morado"></button>
            <button type="button" value="#cc66cc" aria-label="Lila"></button>
            <button type="button" value="#ff66ff" aria-label="Fucsia"></button>
            <button type="button" value="#ff99ff" aria-label="Rosa claro"></button>
            <button type="button" value="#e8c4e8" aria-label="Rosa pastel"></button>
            <button type="button" value="#ffffff" aria-label="Blanco"></button>
        </div>
        <div class="brushes">
            <button type="button" value="1" aria-label="Pincel fino"></button>
            <button type="button" value="2" aria-label="Pincel medio fino"></button>
            <button type="button" value="3" aria-label="Pincel medio"></button>
            <button type="button" value="4" aria-label="Pincel grueso"></button>
            <button type="button" value="5" aria-label="Pincel extra grueso"></button>
        </div>
        <div class="buttons">
            <button id="undo" type="button">Deshacer</button>
            <button id="clear" type="button">Limpiar</button>
            <button id="send" type="button">Enviar</button>
        </div>
    </div>
    <div class="right-block">
        <div class="canvas-wrapper">
            <canvas id="paint-canvas"></canvas>
        </div>
    </div>
</main>
{:/nomarkdown}

<div class="text-center">
<small>Basado en el trabajo de [Alperen][1]{:target="_blank"}.</small>
</div>

---

<div class="text-center">
<p>Una vez que envíes tu dibujo, dame chanza de revisarlo antes de publicarlo aquí abajo. 👇</p>
</div>

## Dibujos recibidos

<ul class="list-unstyled">
    <li class="mb-3">
        <time datetime="2026-02-27T05:28:57.377Z"><em></em></time>
    </li>
    <li class="mb-5 text-center">
        <img class="img-fluid" src="../assets/images/paintbook/2.png" alt="Dibujo enviado desde Paintbook" />
    </li>
    <li class="mb-3">
        <time datetime="2026-02-27T05:28:42.070Z"><em></em></time>
    </li>
    <li class="mb-5 text-center">
        <img class="img-fluid" src="../assets/images/paintbook/1.png" alt="Dibujo enviado desde Paintbook" />
    </li>
</ul>

[1]: https://codepen.io/alperentalaslioglu/pen/yPGgvP
