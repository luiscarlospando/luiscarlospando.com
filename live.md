---
layout: livestreams
title: Live
description: Aquí transmito en vivo todos mis streams de Twitch.
image: /assets/images/live.jpg
tags: [live, livestream, livestreams, twitch, en-vivo]
permalink: /live/
---

<div class="row no-gutters mb-4">
<div id="mijostreams-livestream" class="col-12 col-lg-8">
<div class="embed-responsive embed-responsive-16by9 mb-0">
<iframe id="stream_embed" src="https://player.twitch.tv/?channel={{ site.twitch_username }}&parent={{ site.domain }}" frameborder="0" allowfullscreen="true" scrolling="no"></iframe>
</div>
</div>
<div id="mijostreams-chat" class="col-12 col-lg-4">
<iframe
  id="chat_embed"
  src="https://www.twitch.tv/embed/{{ site.twitch_username }}/chat?darkpopout&parent={{ site.domain }}"
  height="100%"
  width="100%"
  frameborder="0"
  scrolling="no"
  allowfullscreen="true"
>
</iframe>
</div>
</div>

<div class="row">
<div class="col text-center">
<a id="btn-heymijotv" class="btn btn-primary" href="{{ site.twitch_purl }}" rel="me noreferrer noopener" target="_blank">
<i class="fa-solid fa-external-link-alt" data-toggle="tooltip" data-placement="top" title="Abrir en nueva pestaña"></i> Ver directamente en Twitch
</a>
</div>
</div>
