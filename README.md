# Atomic Events — sitio web

Sitio de una sola página para Atomic Events (Mexicali, B.C.): decoración de
eventos, cabina de fotos 360°, letras iluminadas, chisperos y video con dron.

React + Vite + TypeScript. Sin base de datos ni servidor: se publica como
archivos estáticos.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

Para publicarlo, sube la carpeta `dist/` a Netlify, Vercel, Hostinger o
cualquier hosting. No hace falta nada más.

## Dónde se edita el contenido

**Todo está en un solo archivo: `src/data/site.ts`.** Paquetes, servicios,
teléfonos, galería y testimonios. No hace falta tocar el diseño ni el HTML.

| Quiero cambiar… | Busca en `src/data/site.ts` |
| --- | --- |
| Teléfonos, ciudad, redes | `CONTACT` |
| Monto del anticipo y pagos | `BOOKING` |
| Paquetes, estrellas, incluidos | `OCCASIONS` |
| Tarjetas de servicios | `SERVICES` |
| Galería | `GALLERY` |
| Reseñas de clientes | `TESTIMONIALS` |

### Cambiar una foto

Las fotos que faltan se muestran como un recuadro punteado con la descripción
de la imagen que va ahí. Ver `docs/FOTOS.md` para las rutas y
el paso a paso.

### Reseñas reales

En `TESTIMONIALS`, cambia el texto y pon `real: true`. Mientras alguna siga en
`false`, el sitio avisa que son textos de ejemplo — así no se publican reseñas
inventadas como si fueran de clientes.

## Activar los pagos con Stripe

El cliente paga un **anticipo fijo** para apartar su fecha; el resto se liquida
contigo. Un solo monto sirve para todos los paquetes, así que no hace falta
publicar el precio de cada uno.

Hoy el checkout está apagado: el botón aparece como «Apartar en línea ·
próximamente» y la cotización sigue funcionando por WhatsApp.

**Para encenderlo:**

1. En `src/data/site.ts`, pon el monto en `BOOKING.depositMXN`
   (por ejemplo `depositMXN: 500`).
2. En el panel de Stripe → **Payment Links**, crea un enlace por ese monto.
3. Pega la URL en el campo `stripeLink` de cada paquete marcado como
   `booking: 'instant'`.

Son cinco paquetes: los tres de cabina 360°, Amor Eterno y Quinceañera de Gala.
Los de propuestas y baby shower quedan en cotización porque su contenido y
duración cambian en cada evento (`booking: 'quote'`).

Si falta el monto o el enlace, el botón se queda desactivado por sí solo. No se
rompe nada.

## El formulario de contacto

Arma el mensaje y lo abre en WhatsApp con los datos ya escritos. No guarda nada
ni necesita servidor. Si prefieres recibirlo por correo, cambia el `onSubmit`
de `src/components/Contact.tsx` por un POST a Formspree o Netlify Forms.

## Sobre el diseño

Los colores salen muestreados de los archivos del logotipo, no aproximados:
navy `#003247`, rosa `#f62472`, dorado `#ffdb2c` y los seis gajos del
obturador. Cada tipo de evento usa un gajo como color propio.

- `src/styles/tokens.css` — colores, tipografías y espaciado
- `src/styles/app.css` — base, botones, huecos de foto
- `src/styles/components.css` — cada sección

Los contrastes de texto están medidos contra WCAG AA. Si cambias un color,
vuelve a revisarlos.

## Archivos del logotipo

| Archivo | Uso |
| --- | --- |
| `public/brand/atomic-wordmark.png` | Logotipo blanco. Header sobre el hero. |
| `public/brand/atomic-badge.jpg` | Badge circular. Pie, sello, header claro. |
| `public/favicon.ico` | Ícono de la pestaña. |

Los flyers de Instagram de la raíz del proyecto (`Paquete*.jpg`,
`PhotoBoot360.jpg`) **no se usan en el sitio**. Su contenido está transcrito
como texto en `src/data/site.ts`.
# AtomicEvents
