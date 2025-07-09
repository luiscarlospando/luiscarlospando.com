---
layout: page
title: Guestbook
description: Recordemos un rato lo divertido que era el Internet en los '2000s. Déjame un mensaje o un saludo por aquí y también lee los mensajes de la razita. ✌️😉
image: /assets/images/logo.png
permalink: /guestbook/
last-modified-at: <span id="last-updated-at">2025-02-22 23:01:12</span>
---

<p class="text-center">{{ page.description }}</p>

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
<div class="card mb-3">
<div class="card-body">
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
<small>Hecho usando <a target="_blank" href="https://guestbooks.meadow.cafe">Guestbooks</a></small>
</div>
<hr style="margin: 1em 0;"/>
<h2 id="guestbooks___guestbook-messages-header">Mensajes</h2>
<div id="guestbooks___guestbook-messages-container"></div>