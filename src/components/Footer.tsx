import { CONTACT, NAV, SERVICES, whatsappUrl } from '../data/site'
import { ALL_BLADES } from '../data/blades'
import { IconWhatsapp, IconInstagram, IconFacebook } from './Icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ft">
      <div className="shell">
        <div className="ft__top">
          <div>
            <img
              className="ft__badge"
              src="/brand/atomic-badge.jpg"
              alt="Atomic Events"
              width={84}
              height={84}
            />
            <p className="ft__blurb">
              Decoración y experiencias fotográficas para propuestas, bodas, XV
              años y revelaciones de género en {CONTACT.city}.
            </p>

            <div className="ft__socials">
              <a
                href={whatsappUrl('Hola Atomic Events.')}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
              >
                <IconWhatsapp size={17} />
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <IconInstagram size={17} />
              </a>
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <IconFacebook size={17} />
              </a>
            </div>
          </div>

          <nav className="ft__col" aria-label="Secciones">
            <h3>Secciones</h3>
            <ul>
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="ft__col" aria-label="Servicios">
            <h3>Servicios</h3>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#servicios">{s.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ft__col">
            <h3>Contacto</h3>
            <ul>
              {CONTACT.phones.map((p) => (
                <li key={p.e164}>
                  <a href={`tel:${p.e164}`}>{p.display}</a>
                </li>
              ))}
              <li>{CONTACT.city}</li>
            </ul>
          </div>
        </div>

        {/* Los seis gajos del obturador, como firma de color. */}
        <div className="ft__blades" aria-hidden>
          {ALL_BLADES.map((b) => (
            <span key={b} style={{ background: `var(--blade-${b})` }} />
          ))}
        </div>

        <div className="ft__base">
          <p>
            © {year} Atomic Events. Todos los derechos reservados.
          </p>
          <p>Mexicali, Baja California · México</p>
        </div>
      </div>
    </footer>
  )
}
