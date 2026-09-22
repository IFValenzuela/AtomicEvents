import type { Photo } from '../data/site'
import { IconCamera } from './Icons'

/**
 * Hueco de fotografía.
 *
 * Mientras `photo.ready` sea falso dibuja un placeholder con la proporción
 * final ya reservada, para que al llegar la foto real nada se mueva.
 * El texto del placeholder es el mismo `alt` de la foto: describe qué imagen
 * corresponde a ese hueco.
 */
export function Shot({
  photo,
  className = '',
  ratio,
  compact = false,
  children,
}: {
  photo: Photo
  className?: string
  /** Recorta el hueco a otra proporción sin tocar el dato original. */
  ratio?: Photo['ratio']
  /**
   * Huecos pequeños (dentro de una tarjeta) donde la leyenda no cabe.
   * La descripción sigue disponible en el title y para lectores de pantalla.
   */
  compact?: boolean
  children?: React.ReactNode
}) {
  return (
    <div
      className={`shot ${compact ? 'shot--compact' : ''} ${className}`}
      style={{ aspectRatio: (ratio ?? photo.ratio).replace('/', ' / ') }}
    >
      {photo.ready ? (
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
      ) : (
        <div className="shot__ph" title={compact ? photo.alt : undefined}>
          <span className="shot__icon">
            <IconCamera size={compact ? 22 : 30} />
          </span>
          {compact ? (
            <span className="sr-only">{photo.alt}</span>
          ) : (
            <p className="shot__cap">{photo.alt}</p>
          )}
          <span className="shot__tag">Pendiente de foto</span>
        </div>
      )}
      {children}
    </div>
  )
}
