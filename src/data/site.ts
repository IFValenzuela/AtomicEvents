/* ============================================================================
   ATOMIC EVENTS — FUENTE ÚNICA DE DATOS
   ----------------------------------------------------------------------------
   Todo el contenido editable del sitio vive aquí. Para cambiar paquetes,
   fotos, precios o enlaces de pago NO hace falta tocar el marcado.

   ► CAMBIAR UNA FOTO:  edita el campo `photo.src`. Nada más.
   ► ACTIVAR PAGOS:     llena `BOOKING.depositMXN` y el `stripeLink` de cada
                        paquete con `booking: 'instant'`. Ver BOOKING abajo.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   1. CONTACTO
   ------------------------------------------------------------------------ */

export const CONTACT = {
  city: 'Mexicali, Baja California',
  phones: [
    { display: '(686) 143 6523', e164: '+526861436523' },
    { display: '(686) 188 9205', e164: '+526861889205' },
  ],
  /** Número que recibe las cotizaciones de WhatsApp. */
  whatsapp: '+526861436523',
  email: 'hola@atomicevents.mx', // TODO: confirmar correo real
  social: {
    instagram: 'https://instagram.com/', // TODO: usuario real
    facebook: 'https://facebook.com/',   // TODO: página real
  },
} as const

/** Arma un enlace de WhatsApp con el paquete ya escrito en el mensaje. */
export function whatsappUrl(message: string): string {
  const n = CONTACT.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`
}

/* ---------------------------------------------------------------------------
   2. RESERVA EN LÍNEA (STRIPE)
   ---------------------------------------------------------------------------
   Modelo: el cliente paga un ANTICIPO fijo para apartar su fecha. El resto se
   liquida contigo. Así un solo número activa el checkout de todos los
   paquetes, sin necesidad de publicar el precio completo de cada uno.

   PARA ACTIVAR LOS PAGOS — dos pasos:
     1. Pon el monto del anticipo aquí abajo (ej. depositMXN: 500).
     2. Crea un Payment Link en Stripe (dashboard.stripe.com → Payment Links)
        por ese monto y pega la URL en `stripeLink` de cada paquete marcado
        como `booking: 'instant'`.

   Mientras `depositMXN` sea null, el botón de pago se muestra desactivado con
   la leyenda "Próximamente" y el cliente sigue pudiendo cotizar por WhatsApp.
   Nada se rompe.
   ------------------------------------------------------------------------ */

export const BOOKING = {
  /** Monto del anticipo en pesos. null = checkout desactivado. */
  depositMXN: null as number | null, // TODO: definir monto del anticipo
  currency: 'MXN',
  /** Se muestra junto al monto para que quede claro qué está pagando. */
  note: 'El anticipo aparta tu fecha. El resto se liquida el día del evento.',
} as const

/* ---------------------------------------------------------------------------
   3. TIPOS
   ------------------------------------------------------------------------ */

/** Cada ocasión toma prestado un gajo del obturador del logo. */
export type BladeColor = 'rose' | 'azure' | 'violet' | 'gold' | 'teal' | 'ember'

export interface Photo {
  /** Ruta del archivo real. Sustituye el placeholder dejando todo lo demás. */
  src: string
  /** Qué foto va aquí. Se usa como alt y como leyenda del placeholder. */
  alt: string
  /** Proporción del hueco, para que el placeholder ya tenga el tamaño final. */
  ratio: '16/9' | '4/3' | '3/4' | '1/1' | '21/9'
  /** true cuando ya se subió la foto real; false dibuja el placeholder. */
  ready?: boolean
}

export interface Pkg {
  id: string
  name: string
  /** Estrellas llenas y total, tal como venían en los flyers. */
  tier: { filled: number; of: number }
  /** Etiqueta corta bajo el nombre, ej. "Paquete estrella". */
  kicker?: string
  duration: string
  features: string[]
  /** Letra chica: condiciones que venían en el flyer. */
  fineprint?: string
  photo: Photo
  /** 'instant' = anticipo con tarjeta. 'quote' = cotización por WhatsApp. */
  booking: 'instant' | 'quote'
  /** Payment Link de Stripe. Requerido solo si booking === 'instant'. */
  stripeLink?: string | null
}

export interface Occasion {
  id: string
  label: string
  /** Título de la sección cuando esta ocasión está activa. */
  title: string
  blurb: string
  blade: BladeColor
  /** Se muestra arriba de las tarjetas, aplica a todos los paquetes. */
  includedInAll?: { title: string; items: string[] }
  promo?: string[]
  packages: Pkg[]
}

/* ---------------------------------------------------------------------------
   4. PAQUETES  (transcritos de los flyers)
   ------------------------------------------------------------------------ */

export const OCCASIONS: Occasion[] = [
  {
    id: 'photobooth',
    label: 'Photo Booth 360°',
    title: 'Cabina 360°',
    blurb:
      'La plataforma gira, las luces se encienden y tus invitados se llevan el video antes de bajarse de la alfombra roja.',
    blade: 'azure',
    includedInAll: {
      title: 'Los tres paquetes incluyen',
      items: [
        'Plataforma motorizada',
        'Calidad y estabilidad en video',
        'Alfombra roja tipo Hollywood',
        'Luces para iluminación profesional',
        'Accesorios: sombreros, máscaras, pistola de dinero, máquina de humo, letreros de fiesta y máquina de burbujas',
      ],
    },
    promo: [
      'Al contratar cualquier paquete te llevas 30 minutos completamente gratis.',
      'Tus invitados obtienen el video en el momento.',
    ],
    packages: [
      {
        id: 'pb-bronce',
        name: 'Paquete Bronce',
        tier: { filled: 1, of: 3 },
        duration: '1 hora',
        features: ['Cabina 360° por 1 hora', '+30 minutos gratis de promoción'],
        photo: {
          src: '/assets/images/packages/photobooth-bronce.jpg',
          alt: 'Invitados subiéndose a la plataforma 360° durante una fiesta',
          ratio: '4/3',
        },
        booking: 'instant',
        stripeLink: null, // TODO: pegar Payment Link
      },
      {
        id: 'pb-plata',
        name: 'Paquete Plata',
        tier: { filled: 2, of: 3 },
        duration: '2 horas',
        features: ['Cabina 360° por 2 horas', '+30 minutos gratis de promoción'],
        photo: {
          src: '/assets/images/packages/photobooth-plata.jpg',
          alt: 'Grupo de amigos posando con accesorios frente a la cabina 360°',
          ratio: '4/3',
        },
        booking: 'instant',
        stripeLink: null, // TODO: pegar Payment Link
      },
      {
        id: 'pb-oro',
        name: 'Paquete Oro',
        tier: { filled: 3, of: 3 },
        kicker: 'El más pedido',
        duration: '3 horas',
        features: ['Cabina 360° por 3 horas', '+30 minutos gratis de promoción'],
        photo: {
          src: '/assets/images/packages/photobooth-oro.jpg',
          alt: 'Cabina 360° iluminada de noche con la alfombra roja llena de invitados',
          ratio: '4/3',
        },
        booking: 'instant',
        stripeLink: null, // TODO: pegar Payment Link
      },
    ],
  },

  {
    id: 'propuestas',
    label: 'Propuestas',
    title: '¿Quieres ser mi novia?',
    blurb:
      'Montamos el lugar completo antes de que ella llegue: pétalos, velas, chispas y un letrero que hace la pregunta por ti.',
    blade: 'rose',
    packages: [
      {
        id: 'pr-corazon',
        name: 'Corazón Romance',
        tier: { filled: 5, of: 5 },
        kicker: 'Paquete estrella',
        duration: 'El tiempo que necesites',
        features: [
          'Corazón de pétalos de rosas',
          'Letrero neón «¿Quieres ser mi novia?»',
          '2 máquinas chisperas',
          'Camino de velas',
          'Camino de pétalos',
          'Iluminación con luces RGB',
          'Iniciales de los novios incluidas',
        ],
        photo: {
          src: '/assets/images/packages/corazon-romance.jpg',
          alt: 'Corazón de pétalos de rosas con letrero neón y camino de velas, de noche',
          ratio: '3/4',
        },
        booking: 'quote',
      },
      {
        id: 'pr-bronce',
        name: 'Paquete Bronce',
        tier: { filled: 1, of: 3 },
        duration: 'El tiempo que necesites',
        features: [
          'Camino de velas',
          'Letras «Quieres ser mi novia»',
          'Montaje y logística',
        ],
        photo: {
          src: '/assets/images/packages/propuesta-bronce.jpg',
          alt: 'Camino de velas encendidas llevando a las letras de la propuesta',
          ratio: '4/3',
        },
        booking: 'quote',
      },
      {
        id: 'pr-plata',
        name: 'Paquete Plata',
        tier: { filled: 2, of: 3 },
        duration: 'El tiempo que necesites',
        features: [
          '3 chisperos',
          'Pétalos de rosas',
          'Camino de velas',
          'Montaje y logística',
        ],
        photo: {
          src: '/assets/images/packages/propuesta-plata.jpg',
          alt: 'Chisperos encendidos sobre un camino de pétalos y velas',
          ratio: '4/3',
        },
        booking: 'quote',
      },
      {
        id: 'pr-oro',
        name: 'Paquete Oro',
        tier: { filled: 3, of: 3 },
        duration: 'El tiempo que necesites',
        features: [
          '6 chisperos',
          'Alfombra roja',
          'Camino de velas',
          'Camino de pétalos de rosas',
          'Corazón de pétalos de rosas',
          'Globos',
          'Montaje y logística',
        ],
        photo: {
          src: '/assets/images/packages/propuesta-oro.jpg',
          alt: 'Montaje completo de propuesta con alfombra roja, corazón de pétalos y seis chisperos',
          ratio: '4/3',
        },
        booking: 'quote',
      },
    ],
  },

  {
    id: 'baby',
    label: 'Baby Shower',
    title: 'Baby shower y revelación',
    blurb:
      'Letras iluminadas BABY u OH BABY, humo de color y el momento exacto en que todos gritan. Con dron, si quieres verlo desde arriba.',
    blade: 'violet',
    packages: [
      {
        id: 'bb-bienvenida',
        name: 'Bienvenida al Mundo',
        tier: { filled: 1, of: 4 },
        duration: 'Tiempo completo del evento',
        features: [
          'Letras iluminadas BABY u OH BABY',
          '4 chisperos',
          '2 sprays de revelación de género',
        ],
        fineprint: 'Los sprays aplican solo en la compra de las letras «OH BABY».',
        photo: {
          src: '/assets/images/packages/baby-bienvenida.jpg',
          alt: 'Letras iluminadas OH BABY encendidas en el salón del evento',
          ratio: '4/3',
        },
        booking: 'quote',
      },
      {
        id: 'bb-explosion',
        name: 'Explosión de Amor',
        tier: { filled: 2, of: 4 },
        duration: 'Tiempo completo del evento',
        features: [
          'Letras iluminadas BABY u OH BABY',
          '4 chisperos',
          '2 sprays de revelación de género',
          'Decoración con globos incluida',
        ],
        fineprint: 'Los sprays aplican en la compra de las letras «BABY» y «OH BABY».',
        photo: {
          src: '/assets/images/packages/baby-explosion.jpg',
          alt: 'Pareja con humo rosa de revelación de género y arco de globos detrás',
          ratio: '4/3',
        },
        booking: 'quote',
      },
      {
        id: 'bb-hecho',
        name: 'Hecho con Amor',
        tier: { filled: 3, of: 4 },
        duration: 'Tiempo completo del evento',
        features: [
          'Letras iluminadas BABY u OH BABY',
          '4 chisperos',
          '2 sprays de revelación de género',
          '2 cohetes de 25 tiros',
          'Video con dron',
        ],
        photo: {
          src: '/assets/images/packages/baby-hecho-con-amor.jpg',
          alt: 'Cohetes de revelación disparando sobre la familia, tomado con dron',
          ratio: '4/3',
        },
        booking: 'quote',
      },
      {
        id: 'bb-destellos',
        name: 'Destellos Rosas y Azules',
        tier: { filled: 4, of: 4 },
        kicker: 'Todo incluido',
        duration: 'Tiempo completo del evento',
        features: [
          'Letras iluminadas BABY u OH BABY',
          '4 chisperos',
          '2 sprays de revelación de género',
          '2 cohetes de 25 tiros',
          'Video con dron',
          'Decoración incluida',
        ],
        photo: {
          src: '/assets/images/packages/baby-destellos.jpg',
          alt: 'Revelación de género completa con letras, chisperos, cohetes y decoración',
          ratio: '3/4',
        },
        booking: 'quote',
      },
    ],
  },

  {
    id: 'bodas',
    label: 'Bodas',
    title: 'Tu gran día',
    blurb:
      'Cabina 360°, doscientas fotos impresas y las letras LOVE encendidas mientras la pista no para.',
    blade: 'gold',
    packages: [
      {
        id: 'bo-amor-eterno',
        name: 'Amor Eterno',
        tier: { filled: 3, of: 3 },
        kicker: 'Paquete de bodas',
        duration: 'Cabina 360° por 2:30 horas',
        features: [
          'Cabina 360° durante 2 horas 30 minutos',
          '200 shots',
          '4 chisperos',
          'Letras iluminadas: iniciales o LOVE',
          'Selfie espejo',
        ],
        photo: {
          src: '/assets/images/packages/amor-eterno.jpg',
          alt: 'Novios entrando al salón entre chisperos con las letras LOVE al fondo',
          ratio: '4/3',
        },
        booking: 'instant',
        stripeLink: null, // TODO: pegar Payment Link
      },
    ],
  },

  {
    id: 'xv',
    label: 'XV Años',
    title: 'Quinceañera de gala',
    blurb:
      'El vals, las letras XV encendidas y una cabina que no deja de girar en toda la noche.',
    blade: 'teal',
    packages: [
      {
        id: 'xv-gala',
        name: 'Quinceañera de Gala',
        tier: { filled: 3, of: 3 },
        kicker: 'Paquete de XV años',
        duration: 'Cabina 360° por 2:30 horas',
        features: [
          'Cabina 360° durante 2 horas 30 minutos',
          '200 shots',
          '4 chisperos',
          'De 3 a 6 letras, con las letras XV de regalo',
          'De 6 a 10 letras, con las letras XV de regalo',
          'Selfie espejo',
        ],
        photo: {
          src: '/assets/images/packages/quinceanera-gala.jpg',
          alt: 'Quinceañera bailando el vals frente a las letras XV iluminadas',
          ratio: '4/3',
        },
        booking: 'instant',
        stripeLink: null, // TODO: pegar Payment Link
      },
    ],
  },
]

/* ---------------------------------------------------------------------------
   5. SERVICIOS
   ------------------------------------------------------------------------ */

export interface Service {
  id: string
  name: string
  line: string
  blade: BladeColor
  /** Nombre del icono dibujado en Icons.tsx */
  icon: 'booth' | 'letters' | 'sparks' | 'petals' | 'drone' | 'balloons'
}

export const SERVICES: Service[] = [
  {
    id: 'cabina',
    name: 'Cabina de fotos 360°',
    line: 'Plataforma motorizada, alfombra roja y el video en su teléfono antes de que termine la canción.',
    blade: 'azure',
    icon: 'booth',
  },
  {
    id: 'letras',
    name: 'Letras gigantes iluminadas',
    line: 'LOVE, XV, BABY o las iniciales que quieras, encendidas a la altura de tus invitados.',
    blade: 'gold',
    icon: 'letters',
  },
  {
    id: 'chisperos',
    name: 'Chisperos',
    line: 'Fuentes de chispa fría: se ven enormes en cámara y no queman ni manchan.',
    blade: 'ember',
    icon: 'sparks',
  },
  {
    id: 'petalos',
    name: 'Camino de pétalos y velas',
    line: 'Pétalos de rosa y velas montadas para que ella camine hacia el momento.',
    blade: 'rose',
    icon: 'petals',
  },
  {
    id: 'dron',
    name: 'Video con dron',
    line: 'La toma desde arriba del instante en que todo explota de color.',
    blade: 'teal',
    icon: 'drone',
  },
  {
    id: 'globos',
    name: 'Decoración con globos',
    line: 'Arcos y columnas armados en tus colores, montados antes de que llegue el primer invitado.',
    blade: 'violet',
    icon: 'balloons',
  },
]

/* ---------------------------------------------------------------------------
   6. GALERÍA — todos los huecos listos para foto real
   ------------------------------------------------------------------------ */

export interface GalleryItem extends Photo {
  id: string
  category: 'Bodas' | 'XV Años' | 'Baby Shower' | 'Propuestas'
}

export const GALLERY: GalleryItem[] = [
  {
    id: 'g01',
    category: 'Propuestas',
    src: '/assets/images/gallery/01.jpg',
    alt: 'Corazón de pétalos visto desde arriba con las velas encendidas alrededor',
    ratio: '3/4',
  },
  {
    id: 'g02',
    category: 'Bodas',
    src: '/assets/images/gallery/02.jpg',
    alt: 'Primer baile de los novios entre chisperos',
    ratio: '4/3',
  },
  {
    id: 'g03',
    category: 'Baby Shower',
    src: '/assets/images/gallery/03.jpg',
    alt: 'Humo azul de revelación de género frente a las letras OH BABY',
    ratio: '4/3',
  },
  {
    id: 'g04',
    category: 'XV Años',
    src: '/assets/images/gallery/04.jpg',
    alt: 'Quinceañera posando junto a las letras XV iluminadas',
    ratio: '3/4',
  },
  {
    id: 'g05',
    category: 'Bodas',
    src: '/assets/images/gallery/05.jpg',
    alt: 'Invitados dentro de la cabina 360° con accesorios de fiesta',
    ratio: '4/3',
  },
  {
    id: 'g06',
    category: 'Propuestas',
    src: '/assets/images/gallery/06.jpg',
    alt: 'Ella diciendo que sí frente al letrero neón, tomada de noche',
    ratio: '4/3',
  },
  {
    id: 'g07',
    category: 'XV Años',
    src: '/assets/images/gallery/07.jpg',
    alt: 'Vals de quinceañera con chisperos al fondo del salón',
    ratio: '4/3',
  },
  {
    id: 'g08',
    category: 'Baby Shower',
    src: '/assets/images/gallery/08.jpg',
    alt: 'Arco de globos rosas y azules montado para la revelación',
    ratio: '3/4',
  },
]

/* ---------------------------------------------------------------------------
   7. TESTIMONIOS — texto de ejemplo, sustituir por reseñas reales
   ------------------------------------------------------------------------ */

export interface Testimonial {
  id: string
  quote: string
  name: string
  event: string
  /** false mientras sea texto de ejemplo. Ponlo en true al usar reseñas reales. */
  real: boolean
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Llegaron tres horas antes a montar y cuando ella entró ya estaba todo encendido. No tuve que preocuparme por nada más que por la pregunta.',
    name: 'Nombre del cliente',
    event: 'Propuesta · Corazón Romance',
    real: false,
  },
  {
    id: 't2',
    quote:
      'La cabina no paró en toda la noche. Mis tías siguen mandando el video al grupo de la familia.',
    name: 'Nombre del cliente',
    event: 'XV Años · Quinceañera de Gala',
    real: false,
  },
  {
    id: 't3',
    quote:
      'Los chisperos en la entrada nos dieron la foto que usamos para los agradecimientos. Puntuales y con todo listo.',
    name: 'Nombre del cliente',
    event: 'Boda · Amor Eterno',
    real: false,
  },
]

/* ---------------------------------------------------------------------------
   8. FOTOS SUELTAS DE SECCIÓN
   ------------------------------------------------------------------------ */

export const HERO_PHOTO: Photo = {
  src: '/assets/images/hero.jpg',
  alt: 'Corazón de pétalos de rosas con letrero neón «¿Quieres ser mi novia?» y camino de velas encendidas de noche',
  ratio: '1/1',
}

export const ABOUT_PHOTO: Photo = {
  src: '/assets/images/nosotros.jpg',
  alt: 'El equipo de Atomic Events montando las luces y la cabina antes de que empiece el evento',
  ratio: '4/3',
}

/* ---------------------------------------------------------------------------
   9. NAVEGACIÓN
   ------------------------------------------------------------------------ */

export const NAV = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'paquetes', label: 'Paquetes' },
  { id: 'galeria', label: 'Galería' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
] as const
