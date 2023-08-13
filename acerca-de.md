---
layout: page
title: Acerca de
description: Este URL ha sido mi hogar en línea desde 2014 (ojalá hubiera empezado antes 🤦‍♂️). Desde entonces he publicado (abre este link para ver el número) entradas en total y es en este lugar donde intento unificar mi presencia en línea.
image: /assets/images/logo.png
permalink: /acerca-de/
---

<h2 class="subtitulo text-center"><small>{{ site.title }} <code>v{{ site.version }}</code></small></h2>

Este URL ha sido mi hogar en línea desde octubre de 2014 (ojalá hubiera empezado antes 🤦‍♂️). Desde entonces he publicado [<span id="contador-posts"></span> entradas en total][1] y es en este lugar donde intento unificar mi presencia en línea. Justo como lo mencioné en la [portada][2], este es un lugar para escribir de lo que traiga en la cabeza, compartir cosas que creo valen la pena, opinar y dar recomendaciones. 

Aquí está el [archivo completo][3] de todos mis posts.

## Colofón

- Todo el desarrollo se hace localmente usando [Visual Studio Code][4]{:target="_blank"} en una [Mac][5]{:target="_blank"} 👨‍💻
- Este sitio es completamente estático y lo genero usando [Jekyll][6]{:target="_blank"} ([<code>site-info</code>][7]), luego hago <code>push</code> a un <code>repo</code> que tengo en [GitHub][8]{:target="_blank"} y después se hace <code>deploy</code> en [Vercel][9]{:target="_blank"}
- Mi blog corre con [WordPress][10]{:target="_blank"} y lo tengo corriendo en un <code>droplet</code> de [DigitalOcean][11]{:target="_blank"}
- Mi dominio lo tengo registrado con [Cloudflare][12]{:target="_blank"}
- El DNS es administrado desde [Cloudflare][12]{:target="_blank"} también
- Código fuente disponible en [GitHub][8]{:target="_blank"}
- Uso [Instatus][13]{:target="_blank"} para monitorear el estatus general de los sistemas
- Uso [omg.lol][14]{:target="_blank"} para Mastodon y otras cosas súper chidas (estoy enamorado de este servicio 😍)

## Suscríbete

Si gustas, te puedes suscribir a mi sitio a través de:
- [<i class="fas fa-rss"></i> RSS][15]{:target="_blank"}
- [<i class="fa-brands fa-mastodon"></i> Mastodon][16]{:target="_blank"}

## Errores en el sitio

Los estándares web son importantes e intento que mi sitio se adhiera a ellos. Si algo se ve raro o incorrecto, [por favor házmelo saber][17].

[1]: https://blog.{{ site.domain }}
[2]: /
[3]: https://blog.{{ site.domain }}/author/me/
[4]: https://code.visualstudio.com/
[5]: https://www.apple.com/mac/
[6]: https://jekyllrb.com/
[7]: https://{{ site.domain }}/jekyll-info.html
[8]: https://github.com/luiscarlospando/luiscarlospando.com
[9]: https://vercel.com/
[10]: https://wordpress.org/
[11]: https://m.do.co/c/03bd95f889e7
[12]: https://cloudflare.com/
[13]: https://luiscarlospando.instatus.com/
[14]: https://home.omg.lol/referred-by/mijo
[15]: https://blog.{{ site.domain }}/rss/
[16]: https://hachyderm.io/@{{ site.mastodon_feed }}
[17]: /contacto/