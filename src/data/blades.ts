import type { BladeColor } from './site'

/**
 * Cada ocasión y cada servicio toma prestado un gajo del obturador del logo.
 * Aquí se traduce el nombre del gajo a las variables CSS que usan los
 * componentes, para que el color viva en un solo lugar.
 *
 * `ink` es la variante legible sobre fondo claro (contraste AA).
 * `onBlade` dice de qué color va el texto encima del gajo sólido.
 */
export function bladeVars(blade: BladeColor): React.CSSProperties {
  return {
    ['--blade' as string]: `var(--blade-${blade})`,
    ['--blade-ink' as string]: `var(--blade-${blade}-ink)`,
    /* Pareja relleno/tinta ya medida para las insignias. Ver tokens.css. */
    ['--chip' as string]: `var(--chip-${blade})`,
    ['--chip-ink' as string]: `var(--chip-${blade}-ink)`,
  }
}

export const ALL_BLADES: BladeColor[] = [
  'rose',
  'azure',
  'violet',
  'gold',
  'teal',
  'ember',
]
