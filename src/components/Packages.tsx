import { useState } from 'react'
import { OCCASIONS, BOOKING, whatsappUrl } from '../data/site'
import type { Occasion, Pkg } from '../data/site'
import { bladeVars } from '../data/blades'
import { useReveal } from '../hooks/useReveal'
import { Shot } from './Shot'
import {
  IconStar,
  IconCheck,
  IconGift,
  IconCard,
  IconWhatsapp,
  IconArrow,
} from './Icons'

/* --- Utilidades ------------------------------------------------------- */

const money = (n: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: BOOKING.currency,
    maximumFractionDigits: 0,
  }).format(n)

/** El checkout solo se activa cuando hay monto de anticipo y Payment Link. */
function canCheckout(pkg: Pkg): boolean {
  return pkg.booking === 'instant' && BOOKING.depositMXN != null && !!pkg.stripeLink
}

function quoteMessage(pkg: Pkg, occasion: Occasion) {
  return `Hola Atomic Events, me interesa el ${pkg.name} de ${occasion.title}. ¿Me pueden cotizar?`
}

/* --- Estrellas -------------------------------------------------------- */

function Stars({ filled, of }: { filled: number; of: number }) {
  return (
    <p className="pkg__stars">
      {Array.from({ length: of }, (_, i) => (
        <IconStar key={i} filled={i < filled} className={i < filled ? '' : 'is-empty'} />
      ))}
      <span className="sr-only">
        Nivel {filled} de {of}
      </span>
    </p>
  )
}

/* --- Acciones de reserva --------------------------------------------- */

function Booking({ pkg, occasion }: { pkg: Pkg; occasion: Occasion }) {
  const instant = pkg.booking === 'instant'
  const live = canCheckout(pkg)

  return (
    <div className="pkg__foot">
      <p className="pkg__price">
        <span>{instant ? 'Anticipo para apartar' : 'Precio'}</span>
        <b>
          {!instant
            ? 'A cotizar'
            : BOOKING.depositMXN != null
              ? money(BOOKING.depositMXN)
              : 'Por definir'}
        </b>
      </p>

      <div className="pkg__acts">
        {instant &&
          (live ? (
            <a
              className="btn btn--gold"
              href={pkg.stripeLink!}
              target="_blank"
              rel="noopener"
            >
              <IconCard />
              Apartar mi fecha
            </a>
          ) : (
            <button className="btn btn--gold" disabled>
              <IconCard />
              Apartar en línea · próximamente
            </button>
          ))}

        <a
          className={`btn ${instant ? 'btn--ghost' : 'btn--primary'}`}
          href={whatsappUrl(quoteMessage(pkg, occasion))}
          target="_blank"
          rel="noopener"
        >
          <IconWhatsapp size={17} />
          Solicitar cotización
        </a>
      </div>

      {instant && (
        <p className="pkg__hint">
          {live
            ? BOOKING.note
            : 'Pronto podrás apartar tu fecha con tarjeta. Por ahora cotizamos por WhatsApp.'}
        </p>
      )}
    </div>
  )
}

/* --- Tarjeta de paquete ---------------------------------------------- */

function PackageCard({
  pkg,
  occasion,
  top,
}: {
  pkg: Pkg
  occasion: Occasion
  top: boolean
}) {
  return (
    <li
      className={`pkg ${top ? 'pkg--top' : ''}`}
      style={bladeVars(occasion.blade)}
    >
      {pkg.kicker && (
        <span className="pkg__kicker">
          {pkg.kicker}
        </span>
      )}

      <h4 className="pkg__name">{pkg.name}</h4>
      <Stars filled={pkg.tier.filled} of={pkg.tier.of} />

      <p className="pkg__dur">{pkg.duration}</p>

      <ul className="pkg__feats">
        {pkg.features.map((f) => (
          <li key={f}>
            <IconCheck />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {pkg.fineprint && <p className="pkg__fine">{pkg.fineprint}</p>}

      <div className="pkg__shot">
        <Shot photo={pkg.photo} ratio="16/9" compact />
      </div>

      <Booking pkg={pkg} occasion={occasion} />
    </li>
  )
}

/* --- Paquete único: composición editorial ---------------------------- */

function SoloPackage({ pkg, occasion }: { pkg: Pkg; occasion: Occasion }) {
  return (
    <div className="solo" style={bladeVars(occasion.blade)}>
      <div>
        {pkg.kicker && (
          <span className="pkg__kicker">
            {pkg.kicker}
          </span>
        )}
        <h4 className="pkg__name">{pkg.name}</h4>
        <Stars filled={pkg.tier.filled} of={pkg.tier.of} />
        <p className="pkg__dur">{pkg.duration}</p>

        <ul className="solo__feats">
          {pkg.features.map((f) => (
            <li key={f}>
              <IconCheck />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {pkg.fineprint && <p className="pkg__fine">{pkg.fineprint}</p>}

        <Booking pkg={pkg} occasion={occasion} />
      </div>

      <Shot photo={pkg.photo} className="solo__media" />
    </div>
  )
}

/* --- Sección ---------------------------------------------------------- */

export function Packages() {
  const [activeId, setActiveId] = useState(OCCASIONS[1].id) // Propuestas
  const head = useReveal<HTMLDivElement>()
  const body = useReveal<HTMLDivElement>(80)

  const occasion = OCCASIONS.find((o) => o.id === activeId) ?? OCCASIONS[0]
  const solo = occasion.packages.length === 1

  /* Un solo paquete lleva el borde de color: el de más estrellas. */
  const headliner = occasion.packages.reduce((best, p) =>
    p.tier.filled > best.tier.filled ? p : best,
  )

  return (
    <section className="band band--navy" id="paquetes">
      <div className="shell">
        <div className="band-head rise" ref={head}>
          <div className="band-head__text">
            <h2>Paquetes</h2>
            <p>
              Doce montajes ya armados, listos para adaptarse a tu fecha. Los de
              duración fija se apartan en línea; el resto los cotizamos contigo.
            </p>
          </div>
          <a className="quiet-link" href="#contacto">
            Cuéntanos tu fecha
            <IconArrow />
          </a>
        </div>

        {/* Selector de ocasión: cada una toma un gajo del obturador. */}
        <div className="pk__tabs" role="tablist" aria-label="Tipo de evento">
          {OCCASIONS.map((o) => (
            <button
              key={o.id}
              role="tab"
              id={`tab-${o.id}`}
              aria-selected={o.id === activeId}
              aria-controls={`panel-${o.id}`}
              className="pk__tab"
              style={bladeVars(o.blade)}
              onClick={() => setActiveId(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div
          className="rise"
          ref={body}
          role="tabpanel"
          id={`panel-${occasion.id}`}
          aria-labelledby={`tab-${occasion.id}`}
        >
          <div className="pk__intro">
            <div>
              <h3>{occasion.title}</h3>
              <p>{occasion.blurb}</p>
            </div>

            {occasion.includedInAll ? (
              <div className="pk__all" style={bladeVars(occasion.blade)}>
                <h4>{occasion.includedInAll.title}</h4>
                <ul className="pkg__feats">
                  {occasion.includedInAll.items.map((item) => (
                    <li key={item}>
                      <IconCheck />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {occasion.promo && (
                  <ul className="pk__promo">
                    {occasion.promo.map((p) => (
                      <li key={p}>
                        <IconGift />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              /* Sin caja de "incluye todo", la columna la ocupa la foto
                 principal de la ocasión en vez de quedarse vacía. */
              !solo && <Shot photo={headliner.photo} ratio="16/9" />
            )}
          </div>

          {solo ? (
            <SoloPackage pkg={occasion.packages[0]} occasion={occasion} />
          ) : (
            <ul className="ladder">
              {occasion.packages.map((p) => (
                <PackageCard
                  key={p.id}
                  pkg={p}
                  occasion={occasion}
                  top={p.id === headliner.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
