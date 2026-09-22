FOTOS DEL SITIO
===============

Aquí van las fotografías reales. Mientras un archivo no exista, el sitio
dibuja un recuadro punteado con la descripción de la foto que le toca.

Cómo cambiar una foto
---------------------
1. Copia tu imagen a la ruta indicada abajo, con ese nombre exacto.
2. Abre src/data/site.ts, busca esa ruta y añade  ready: true  al objeto.

   Ejemplo, antes:
     photo: {
       src: '/assets/images/packages/corazon-romance.jpg',
       alt: 'Corazón de pétalos de rosas...',
       ratio: '3/4',
     }

   Después:
     photo: {
       src: '/assets/images/packages/corazon-romance.jpg',
       alt: 'Corazón de pétalos de rosas...',
       ratio: '3/4',
       ready: true,
     }

El campo `alt` es la descripción para lectores de pantalla y buscadores.
Ajústalo si la foto real muestra algo distinto.

Rutas esperadas
---------------
  hero.jpg                          Portada. Propuesta de noche, horizontal.
  nosotros.jpg                      El equipo montando antes del evento.

  packages/photobooth-bronce.jpg
  packages/photobooth-plata.jpg
  packages/photobooth-oro.jpg
  packages/corazon-romance.jpg
  packages/propuesta-bronce.jpg
  packages/propuesta-plata.jpg
  packages/propuesta-oro.jpg
  packages/baby-bienvenida.jpg
  packages/baby-explosion.jpg
  packages/baby-hecho-con-amor.jpg
  packages/baby-destellos.jpg
  packages/amor-eterno.jpg
  packages/quinceanera-gala.jpg

  gallery/01.jpg  hasta  gallery/08.jpg

Recomendaciones
---------------
- Ancho mínimo 1600 px para la portada, 1200 px para el resto.
- Formato .jpg de calidad 80 o .webp. Pesa menos y carga más rápido.
- La portada se ve dentro de un hexágono: deja aire en las orillas.
