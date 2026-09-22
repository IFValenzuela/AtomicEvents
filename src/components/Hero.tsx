import { useEffect, useState } from 'react'
import { HERO_PHOTO, whatsappUrl } from '../data/site'
import { ALL_BLADES } from '../data/blades'
import { Shot } from './Shot'
import { Swish } from './Icons'

/**
 * El obturador es la pieza principal de la página: seis gajos de color y un
 * hexágono que se abre al cargar para descubrir la foto. Es el único momento
 * de movimiento no provocado por el usuario en todo el sitio.
 */
function Iris({ open }: { open: boolean }) {
  return (
    <div className={`iris ${open ? 'is-open' : ''}`}>
      <div className="iris__ring" aria-hidden />

      {ALL_BLADES.map((blade, i) => (
        <span
          key={blade}
          className="iris__blade"
          aria-hidden
          style={{
            ['--blade' as string]: `var(--blade-${blade})`,
            ['--rot' as string]: `${i * 60}deg`,
            ['--delay' as string]: `${260 + i * 70}ms`,
          }}
        />
      ))}

      <div className="iris__frame">
        <Shot photo={HERO_PHOTO} />
      </div>

      <img
        className="iris__seal"
        src="/brand/atomic-badge.jpg"
        alt=""
        aria-hidden
      />
    </div>
  )
}

export function Hero() {
  const [open, setOpen] = useState(false)

  /* Se abre en cuanto pinta el primer cuadro. */
  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 120)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section className="hero" id="inicio">
      <div className="shell hero__grid">
        <div>
          <p className="hero__eyebrow">Mexicali, Baja California</p>

          <h1>
            Ella va a recordar
            <br />
            dónde estaba{' '}
            <span className="swish">
              parada
              <Swish />
            </span>
          </h1>

          <p className="hero__lede">
            Montamos propuestas, bodas, XV años y revelaciones de género en
            Mexicali. Pétalos, letras iluminadas, chispas frías y una cabina
            360° que no para en toda la noche.
          </p>

          <div className="hero__acts">
            <a className="btn btn--primary" href="#paquetes">
              Ver paquetes
            </a>
            <a
              className="btn btn--ghost"
              href={whatsappUrl(
                'Hola Atomic Events, quiero cotizar un evento.',
              )}
              target="_blank"
              rel="noopener"
            >
              Cotiza por WhatsApp
            </a>
          </div>

          <ul className="hero__meta">
            <li>
              <b>5</b> tipos de evento
            </li>
            <li>
              <b>12</b> paquetes armados
            </li>
            <li>
              <b>30 min</b> gratis en cabina 360°
            </li>
          </ul>
        </div>

        <Iris open={open} />
      </div>

      <span className="hero__scroll" aria-hidden>
        Desliza
      </span>
    </section>
  )
}
