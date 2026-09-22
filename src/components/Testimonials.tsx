import { TESTIMONIALS } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { IconQuote } from './Icons'

export function Testimonials() {
  const head = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLUListElement>(80)

  /* Mientras las reseñas sean de ejemplo se dice, en vez de fingirlas. */
  const anyPlaceholder = TESTIMONIALS.some((t) => !t.real)

  return (
    <section className="band band--navy">
      <div className="shell">
        <div className="band-head rise" ref={head}>
          <div className="band-head__text">
            <h2>Lo que dicen</h2>
            {anyPlaceholder && (
              <p>
                Estamos recopilando los mensajes de nuestros clientes. Los
                textos de abajo son de ejemplo.
              </p>
            )}
          </div>
        </div>

        <ul className="tst rise" ref={grid}>
          {TESTIMONIALS.map((t) => (
            <li className="tst__card" key={t.id}>
              <span className="tst__mark" aria-hidden>
                <IconQuote />
              </span>

              <blockquote>{t.quote}</blockquote>

              <footer className="tst__by">
                <img src="/brand/atomic-badge.jpg" alt="" aria-hidden />
                <div>
                  <cite>{t.name}</cite>
                  <span>{t.event}</span>
                </div>
              </footer>

              {!t.real && (
                <p className="tst__placeholder">
                  Texto de ejemplo · pendiente de reseña real
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
