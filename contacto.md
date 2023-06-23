---
layout: page
title: Contacto
description: Gracias por tu interés en ponerte en contacto conmigo. 🥰
image: /assets/images/logo.png
permalink: /contacto/
---

<p class="text-center">{{ page.description }}</p>

## <i class="fa-solid fa-envelope"></i> Email
Mi correo electrónico es <code>{{ site.email }}</code>.<br>
<a href="mailto:{{ site.email }}" class="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Escribir correo">
<i class="fa-solid fa-pen-to-square"></i> Escribir correo
</a>

## <i class="fa-brands fa-mastodon"></i> Mastodon
<a rel="me" href="{{ site.mastodon_url }}" class="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Seguir a @{{ site.mastodon_username }} en Mastodon" target="_blank">
<i class="fa-brands fa-mastodon"></i> Seguir a @{{ site.mastodon_username }}
</a>

Cuenta personal.

<a rel="me" href="https://hachyderm.io/@{{ site.mastodon_feed }}" class="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Seguir a @{{ site.mastodon_feed }} en Mastodon" target="_blank">
<i class="fa-brands fa-mastodon"></i> Seguir a @{{ site.mastodon_feed }}
</a>

Cuenta automatizada con posts de mi sitio.

## <i class="fa-brands fa-instagram"></i> Instagram
[Aquí comparto fotos][1]{:target="_blank"} de mis cosas favoritas y de momentos que considero que valen la pena ser compartidos.

## <i class="fa-brands fa-discord"></i> Discord
Mi username en Discord es <a href="{{ site.discord_profile }}" target="_blank"><code>{{ site.discord_tag }}</code></a> y tengo un server con unos amigos, se llama [Mode 7][2] y es para puros jugones (*feel free to join in!*).

## <i class="fa-solid fa-heart"></i> omg.lol
Yo creo que [omg.lol][3]{:target="_blank"} es ahorita mi lugar favorito en Internet.

## <i class="fa-brands fa-keybase"></i> Keybase
Este es [mi perfil público en Keybase][4]{:target="_blank"}.

## <i class="fa-brands fa-itunes-note"></i> Apple Music
Este es [mi perfil en Apple Music][5]{:target="_blank"}.

## <i class="fa-brands fa-lastfm"></i> Last.fm
Este es [mi perfil en Last.fm][6]{:target="_blank"}.

## <i class="fa-brands fa-reddit"></i> Reddit
Este es [mi perfil en Reddit][7]{:target="_blank"}.

## <i class="fa-brands fa-twitch"></i> Twitch
[Tengo un canal en Twitch][8]{:target="_blank"}, muy inactivo por lo pronto, la idea es llenarlo de vida uno de estos días.

## <i class="fa-solid fa-gamepad"></i> Backloggd
Antes usaba Backloggery para llevar el registro de mi backlog de juegos, ahora uso [Backloggd][9]{:target="_blank"}.

[1]: https://instagram.com/{{ site.instagram_username }}
[2]: /mode-7/
[3]: https://home.omg.lol/referred-by/{{ site.omglol_username }}
[4]: https://keybase.io/luiscarlospando
[5]: https://music.apple.com/profile/{{ site.apple_music_username }}
[6]: https://last.fm/user/{{ site.lastfm_username }}
[7]: https://reddit.com/u/{{ site.reddit_username }}
[8]: https://twitch.tv/{{ site.twitch_username }}
[9]: https://www.backloggd.com/u/{{ site.backloggd_username }}