import { SERVICES } from '../data/site'
import { bladeVars } from '../data/blades'
import { useReveal } from '../hooks/useReveal'
import { SERVICE_ICONS, IconArrow } from './Icons'

export function Services() {
  const head = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLUListElement>(90)

  return (
    <section className="band band--paper band--tint" id="servicios">
      <div className="shell">
        <div className="band-head rise" ref={head}>
          <div className="band-head__text">
            <h2>Todo lo que encendemos</h2>
            <p>
              Cada servicio se contrata suelto o dentro de un paquete. Dinos qué
              evento tienes y armamos la combinación.
            </p>
          </div>
          <a className="quiet-link" href="#paquetes">
            Ver los paquetes
            <IconArrow />
          </a>
        </div>

        <ul className="svcs rise" ref={grid}>
          {SERVICES.map((s) => {
            const Icon = SERVICE_ICONS[s.icon]
            return (
              <li className="svc" key={s.id} style={bladeVars(s.blade)}>
                <span className="svc__icon">
                  <Icon size={34} />
                </span>
                <h3>{s.name}</h3>
                <p>{s.line}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
