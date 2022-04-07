# LuisCarlosPando.com

![Logo LuisCarlosPando.com](https://luiscarlospando.com/assets/images/logo.png)

Este es el código fuente de [LuisCarlosPando.com][1]. Mi sitio es completamente estático, es generado con [Jekyll][2] y hago `push` de mis cambios para hacer deploy en un droplet que tengo en [DigitalOcean][3] (este sitio no es servido desde GitHub Pages por motivos de SEO).

## Instalación

1. Clonar el repo (o descargar) y entrar al directorio
   
   ```
   git clone https://github.com/luiscarlospando/luiscarlospando.com.git
   cd luiscarlospando.com
   ```

1. Instalar las dependencias
   
   ```
   npm install
   ```

## Inicialización

1. Iniciar el servidor
   
   ```
   bundle exec jekyll serve
   ```

1. Navegar a [http://localhost:4000/][4]

[1]: https://luiscarlospando.com
[2]: http://jekyllrb.com/
[3]: https://m.do.co/c/03bd95f889e7
[4]: http://localhost:4000/