---
layout: page
title: Acerca de
description: Este URL ha sido mi hogar en línea desde 2014 (ojalá hubiera empezado antes 🤦‍♂️). Desde entonces he publicado (abre este link para ver el número) entradas en total y es en este lugar donde intento unificar mi presencia en línea.
image: /assets/images/logo.png
permalink: /acerca-de/
---

<h2 class="subtitulo text-center"><small class="text-muted">{{ site.title }} <code>v{{ site.version }}</code></small></h2>

Este URL ha sido mi hogar en línea desde octubre de 2014 (ojalá hubiera empezado antes 🤦‍♂️). Desde entonces he publicado [<span id="contador-posts"></span> entradas en total][1] y es en este lugar donde intento unificar mi presencia en línea. Justo como lo mencioné en la [portada][2], este es un lugar para escribir de lo que traiga en la cabeza, compartir cosas que creo valen la pena, opinar y dar recomendaciones. 

Aquí está el [archivo completo][3] de todos mis posts.

## Colofón

- Desarrollo y mantengo este sitio con [Visual Studio Code][4]{:target="_blank"} en una Mac 👨‍💻
- Este sitio es completamente estático y lo genero usando [Jekyll][5]{:target="_blank"} ([<code>site-info</code>][6]), después hago <code>push</code> a un <code>repo</code> que tengo en [GitHub][7]{:target="_blank"} para luego hacer deploy en [Vercel][8]{:target="_blank"}
- Mi blog corre con [WordPress][9]{:target="_blank"} y lo tengo corriendo en un <code>droplet</code> de [DigitalOcean][10]{:target="_blank"}
- Mi dominio lo tengo registrado con [Cloudflare][11]{:target="_blank"}
- El DNS es administrado vía [Cloudflare][11]{:target="_blank"} también
- Código fuente disponible en [GitHub][7]{:target="_blank"}
- Uso [Instatus][12]{:target="_blank"} para monitorear el estatus general de los sistemas
- Uso [omg.lol][13]{:target="_blank"} para Mastodon y otras cosas chidas

## Suscríbete

Si gustas, te puedes suscribir a mi sitio a través de:
- [<i class="fas fa-rss"></i> RSS][14]{:target="_blank"}
- [<i class="fa-brands fa-mastodon"></i> Mastodon][15]{:target="_blank"}

## Errores en el sitio

Los estándares web son importantes e intento que mi sitio se adhiera a ellos. Si algo se ve extraño o incorrecto, por favor [házmelo saber][16].

[1]: https://blog.{{ site.domain }}
[2]: /
[3]: https://blog.{{ site.domain }}/author/me/
[4]: https://www.apple.com/mac/
[5]: https://jekyllrb.com/
[6]: https://{{ site.domain }}/jekyll-info.html
[7]: https://github.com/luiscarlospando/luiscarlospando.com
[8]: https://vercel.com/
[9]: https://wordpress.org/
[10]: https://m.do.co/c/03bd95f889e7
[11]: https://cloudflare.com/
[12]: https://instatus.com/
[13]: https://home.omg.lol/referred-by/mijo
[14]: https://blog.{{ site.domain }}/rss/
[15]: https://hachyderm.io/@{{ site.mastodon_feed }}
[16]: /contacto