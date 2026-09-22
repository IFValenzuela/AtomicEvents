/* Iconos dibujados a mano, con el trazo redondeado del logotipo. */

type P = { size?: number; className?: string }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

/* --- Servicios -------------------------------------------------------- */

/* Plataforma giratoria con el brazo de la cámara dando la vuelta. */
export const IconBooth = ({ size = 32 }: P) => (
  <svg {...base(size)}>
    <ellipse cx="12" cy="17.6" rx="8.4" ry="3.4" />
    <path d="M3.6 17.6c0-1.9 3.8-3.4 8.4-3.4" />
    <rect x="9.4" y="3.2" width="5.2" height="4" rx="1.2" />
    <path d="M12 7.2v6.9" />
    <path d="M16.8 5.2a6.4 6.4 0 0 1 2.4 4.1M7.2 5.2a6.4 6.4 0 0 0-2.4 4.1" />
  </svg>
)

export const IconLetters = ({ size = 32 }: P) => (
  <svg {...base(size)}>
    <rect x="2.5" y="7" width="8" height="10.5" rx="1.4" />
    <rect x="13.5" y="7" width="8" height="10.5" rx="1.4" />
    <path d="M6.5 10.4v3.7M17.5 10.4v3.7" />
    <path d="M6.5 4.2v1.3M17.5 4.2v1.3M12 19.5v1.3" />
  </svg>
)

export const IconSparks = ({ size = 32 }: P) => (
  <svg {...base(size)}>
    <path d="M8.6 20.5h6.8l-1.1-5.2H9.7z" />
    <path d="M12 12.4V3.2M8.4 12.1 6 4.9M15.6 12.1 18 4.9" />
    <path d="M4.6 10.6 3 8.4M19.4 10.6 21 8.4" />
  </svg>
)

export const IconPetals = ({ size = 32 }: P) => (
  <svg {...base(size)}>
    <path d="M12 20.5s-6.6-4-6.6-8.6A3.6 3.6 0 0 1 12 9.6a3.6 3.6 0 0 1 6.6 2.3c0 4.6-6.6 8.6-6.6 8.6Z" />
    <path d="M12 6.8V3.4M9.2 5.1 7.8 3.2M14.8 5.1l1.4-1.9" />
  </svg>
)

export const IconDrone = ({ size = 32 }: P) => (
  <svg {...base(size)}>
    <rect x="8.5" y="10" width="7" height="4.6" rx="1.3" />
    <path d="M9.6 10 6.8 7.2M14.4 10l2.8-2.8M9.6 14.6l-2.8 2.8M14.4 14.6l2.8 2.8" />
    <circle cx="5.2" cy="5.6" r="2" />
    <circle cx="18.8" cy="5.6" r="2" />
    <circle cx="5.2" cy="18.4" r="2" />
    <circle cx="18.8" cy="18.4" r="2" />
  </svg>
)

export const IconBalloons = ({ size = 32 }: P) => (
  <svg {...base(size)}>
    <path d="M9.6 12.6c2 0 3.6-2 3.6-4.4A3.6 3.6 0 0 0 9.6 4.4 3.6 3.6 0 0 0 6 8.2c0 2.4 1.6 4.4 3.6 4.4Z" />
    <path d="M9.6 12.6c-.4 3.1.9 5.4 2.6 7.9" />
    <path d="M16.8 16.2c1.6 0 2.8-1.6 2.8-3.5a2.8 2.8 0 1 0-5.6 0c0 1.9 1.2 3.5 2.8 3.5Z" />
    <path d="M16.8 16.2c.2 1.7-.3 2.9-1.2 4.3" />
  </svg>
)

export const SERVICE_ICONS = {
  booth: IconBooth,
  letters: IconLetters,
  sparks: IconSparks,
  petals: IconPetals,
  drone: IconDrone,
  balloons: IconBalloons,
}

/* --- Interfaz --------------------------------------------------------- */

export const IconCamera = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M3 8.6A1.8 1.8 0 0 1 4.8 6.8h2.4l1.3-2.1h6.9l1.3 2.1h2.5A1.8 1.8 0 0 1 21 8.6v8.6a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 17.2Z" />
    <circle cx="12" cy="12.6" r="3.5" />
  </svg>
)

export const IconStar = ({ size = 15, filled = true }: P & { filled?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.7}
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9z" />
  </svg>
)

export const IconCheck = ({ size = 13 }: P) => (
  <svg {...base(size)} strokeWidth={2.4}>
    <path d="m4.5 12.5 4.8 4.8L19.5 6.8" />
  </svg>
)

export const IconArrow = ({ size = 15 }: P) => (
  <svg {...base(size)} strokeWidth={2}>
    <path d="M4.5 12h14M13 6.5 18.5 12 13 17.5" />
  </svg>
)

export const IconGift = ({ size = 15 }: P) => (
  <svg {...base(size)}>
    <path d="M3.8 10.6h16.4v8.5a1.4 1.4 0 0 1-1.4 1.4H5.2a1.4 1.4 0 0 1-1.4-1.4Z" />
    <path d="M2.8 7.2h18.4v3.4H2.8zM12 7.2v13.3" />
    <path d="M12 7.2S10.8 3.5 8.6 3.5a2 2 0 0 0 0 3.7ZM12 7.2s1.2-3.7 3.4-3.7a2 2 0 0 1 0 3.7Z" />
  </svg>
)

export const IconQuote = ({ size = 26 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M9.4 5.4c-3.5 1.4-5.6 4.3-5.6 8.2 0 3.2 1.8 5 4.2 5 2 0 3.6-1.5 3.6-3.5s-1.4-3.4-3.2-3.4c-.3 0-.7 0-1 .2.4-1.7 1.8-3.2 3.6-4.1Zm9.2 0c-3.5 1.4-5.6 4.3-5.6 8.2 0 3.2 1.8 5 4.2 5 2 0 3.6-1.5 3.6-3.5s-1.4-3.4-3.2-3.4c-.3 0-.7 0-1 .2.4-1.7 1.8-3.2 3.6-4.1Z" />
  </svg>
)

export const IconWhatsapp = ({ size = 19 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A9.9 9.9 0 1 0 12 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.1Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5 0a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 8.6 8.6 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.2-.3-.2-.5-.3Z" />
  </svg>
)

export const IconInstagram = ({ size = 19 }: P) => (
  <svg {...base(size)}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

export const IconFacebook = ({ size = 19 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9a15 15 0 0 1 2.2.2v2.5h-1.2c-1.3 0-1.7.8-1.7 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
  </svg>
)

export const IconPhone = ({ size = 19 }: P) => (
  <svg {...base(size)}>
    <path d="M21 16.9v2.5a1.7 1.7 0 0 1-1.8 1.7 16.6 16.6 0 0 1-7.2-2.6 16.3 16.3 0 0 1-5-5A16.6 16.6 0 0 1 4.4 6.2 1.7 1.7 0 0 1 6.1 4.4h2.5a1.7 1.7 0 0 1 1.7 1.5 10.7 10.7 0 0 0 .6 2.6 1.7 1.7 0 0 1-.4 1.8l-1 1a13.4 13.4 0 0 0 5 5l1-1a1.7 1.7 0 0 1 1.8-.4 10.7 10.7 0 0 0 2.6.6 1.7 1.7 0 0 1 1.5 1.7Z" />
  </svg>
)

export const IconPin = ({ size = 19 }: P) => (
  <svg {...base(size)}>
    <path d="M20 10.4c0 5.6-8 11.6-8 11.6s-8-6-8-11.6a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10.2" r="2.9" />
  </svg>
)

export const IconCard = ({ size = 16 }: P) => (
  <svg {...base(size)}>
    <rect x="2.6" y="5.2" width="18.8" height="13.6" rx="2.2" />
    <path d="M2.6 9.8h18.8M6.4 14.8h3.2" />
  </svg>
)

/* Trazo rosa bajo el titular: el mismo gesto de la estrella fugaz. */
export const Swish = () => (
  <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden>
    <path
      d="M4 14.5C58 6.5 142 3 296 8.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
)
