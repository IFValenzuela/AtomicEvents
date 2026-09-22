import { useEffect, useState } from 'react'
import { NAV } from '../data/site'

export function Header() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  /* El header se vuelve sólido una vez que el hero queda atrás. */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > window.innerHeight * 0.12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* El panel móvil se cierra al pasar a escritorio. */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px)')
    const close = () => mq.matches && setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  return (
    <header className={`hdr ${stuck || open ? 'is-stuck' : ''}`}>
      <div className="shell hdr__in">
        {/*
          Dos versiones del logotipo, una por estado del header:
          el wordmark blanco vive sobre el hero oscuro y el badge circular
          toma su lugar cuando la barra se vuelve clara. Nunca se recolorea
          un logotipo con filtros: se cambia de archivo.
        */}
        <a className="hdr__logo" href="#inicio" aria-label="Atomic Events, inicio">
          <img
            className="hdr__mark hdr__mark--word"
            src="/brand/atomic-wordmark.png"
            alt="Atomic Events"
          />
          <span className="hdr__mark hdr__mark--badge" aria-hidden>
            <img src="/brand/atomic-badge.jpg" alt="" />
            <b>
              Atomic<i>Events</i>
            </b>
          </span>
        </a>

        <nav className="hdr__nav" aria-label="Principal">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--ghost hdr__cta" href="#contacto">
          Cotiza tu evento
        </a>

        <button
          className="hdr__burger"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
        </button>
      </div>

      <div id="menu-movil" className={`hdr__panel ${open ? 'is-open' : ''}`}>
        <ul>
          {NAV.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="btn btn--primary btn--wide"
              href="#contacto"
              onClick={() => setOpen(false)}
            >
              Cotiza tu evento
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
