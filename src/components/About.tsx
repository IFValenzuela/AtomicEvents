import { ABOUT_PHOTO } from '../data/site'
import { bladeVars } from '../data/blades'
import { useReveal } from '../hooks/useReveal'
import { Shot } from './Shot'
import { IconArrow } from './Icons'

const PILLARS = [
  {
    blade: 'rose' as const,
    title: 'Montamos antes de que llegues',
    body: 'Llegamos con horas de anticipación. Cuando se abre la puerta, todo está encendido.',
  },
  {
    blade: 'teal' as const,
    title: 'Equipo propio',
    body: 'Plataforma, letras, chisperos y dron son nuestros. No subcontratamos tu evento.',
  },
  {
    blade: 'gold' as const,
    title: 'De Mexicali, para Mexicali',
    body: 'Conocemos los salones, los jardines y el tráfico de la ciudad. Llegamos a tiempo.',
  },
]

export function About() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="band band--paper" id="nosotros">
      <div className="shell">
        <div className="split rise" ref={ref}>
          <div className="split__text">
            <h2>Un momento dura segundos. Nosotros lo montamos todo el día.</h2>

            <p>
              Atomic Events nació en Mexicali con una idea simple: la gente no
              recuerda el salón, recuerda el instante. El sí. El humo rosa. La
              primera foto de los novios entre chispas.
            </p>
            <p>
              Por eso armamos cada montaje completo antes de que llegue el
              primer invitado, y nos quedamos hasta que se apaga la última luz.
            </p>

            <ul className="pillars">
              {PILLARS.map((p) => (
                <li key={p.title} style={bladeVars(p.blade)}>
                  <span className="pillars__mark" aria-hidden />
                  <span>
                    <b>{p.title}</b>
                    <br />
                    <span>{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>

            <a className="btn btn--outline" href="#servicios">
              Lo que hacemos
              <IconArrow />
            </a>
          </div>

          <div className="split__media">
            <Shot photo={ABOUT_PHOTO} />
          </div>
        </div>
      </div>
    </section>
  )
}
