---
layout: page
title: Guestbook
description: Recordemos un rato lo divertido que era el Internet en los 2000s 🌎. Déjame un mensaje o un saludo por aquí y si quieres también puedes leer los mensajes de los demás. ✌️😉
image: /assets/images/logo.png
tags: [guestbook, libro-de-visitas]
permalink: /guestbook/
last-modified-at: <span id="last-updated-at">2025-08-06 16:50:00</span>
---

<div class="alert alert-info" role="alert">
    <p>
        <strong>Actualización - <em>7 de enero, 2026 @ 6:00 pm</em></strong>
    </p>
    <p>
        El guestbook no está disponible por el momento <a href="https://meadow.cafe/blog/0008-azure-disabled-my-account-trip-to-the-cabin/" target="_blank">debido a un problema técnico</a>. Por favor, inténtalo de nuevo más tarde.
    </p>
</div>

<p class="text-center">{{ page.description }}</p>

<p class="text-center">
    👉 <em>Psst, psst... If you speak English or any other language, feel free to leave a message!</em> ✨
</p>

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

<script async src="https://guestbooks.meadow.cafe/resources/js/embed_script/754/script.js"></script>
<div id="guestbooks___guestbook-form-container">
<div class="card mt-4 mb-3">
<div class="card-header text-center">
<h4 class="card-title">
<i class="fa-solid fa-pen-nib"></i> Guestbook
</h4>
</div>
<div class="card-body text-center">
<form id="guestbooks___guestbook-form" action="https://guestbooks.meadow.cafe/guestbook/754/submit" method="post">
<div class="guestbooks___input-container">
<input class="form-control mb-3" placeholder="Nombre/Nickname" type="text" id="name" name="name" required>
</div>
<div class="guestbooks___input-container">
<input class="form-control mb-3" placeholder="Sitio/Perfil personal (opcional)" type="url" id="website" name="website">
</div>
<div id="guestbooks___challenge-answer-container"></div>
<div class="guestbooks___input-container">
<textarea class="form-control mb-3" placeholder="Mensaje" id="text" name="text" style="width: 100%; box-sizing: border-box; resize: vertical;" required></textarea>
</div>
<input class="btn btn-primary btn-lg" type="submit" value="Publicar mensaje">
<div id="guestbooks___error-message"></div>
</form>
</div>
</div>
</div>
<div id="guestbooks___guestbook-made-with" class="text-center">
<small>Hecho con cariño usando <a rel="noreferrer noopener" target="_blank" href="https://guestbooks.meadow.cafe">Guestbooks</a></small>
</div>
<hr style="margin: 1em 0;"/>
<h2 id="guestbooks___guestbook-messages-header">Mensajes</h2>
<div id="guestbooks___guestbook-messages-container"></div>
