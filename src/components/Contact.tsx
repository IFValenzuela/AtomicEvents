import { useState } from 'react'
import { CONTACT, OCCASIONS, whatsappUrl } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import {
  IconWhatsapp,
  IconInstagram,
  IconFacebook,
  IconPhone,
  IconPin,
  IconCheck,
} from './Icons'

export function Contact() {
  const ref = useReveal<HTMLDivElement>()
  const [sent, setSent] = useState(false)

  /**
   * El formulario arma el mensaje y lo abre en WhatsApp. Así funciona sin
   * servidor y la conversación queda en el mismo lugar donde atiendes.
   *
   * ¿Prefieres recibirlo por correo? Cambia este handler por un POST a
   * Formspree / Netlify Forms y quita el `preventDefault`.
   */
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const msg = [
      'Hola Atomic Events, quiero cotizar mi evento.',
      '',
      `Nombre: ${f.get('nombre')}`,
      `Evento: ${f.get('evento')}`,
      `Fecha: ${f.get('fecha') || 'Por definir'}`,
      '',
      `${f.get('mensaje')}`,
    ].join('\n')

    window.open(whatsappUrl(msg), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section className="band band--paper" id="contacto">
      <div className="shell">
        <div className="ct rise" ref={ref}>
          <div>
            <h2 style={{ fontSize: 'var(--step-5)' }}>
              Cuéntanos qué vas a celebrar
            </h2>
            <p
              style={{
                marginTop: '1.2rem',
                maxWidth: 'var(--measure)',
                fontSize: 'var(--step-1)',
                color: 'var(--on-paper-dim)',
              }}
            >
              Contesta el formulario o márcanos. Respondemos el mismo día con
              disponibilidad para tu fecha.
            </p>

            <div className="ct__lines">
              <div className="ct__line">
                <h3>
                  <IconPhone size={15} /> Teléfonos
                </h3>
                {CONTACT.phones.map((p) => (
                  <a key={p.e164} href={`tel:${p.e164}`}>
                    {p.display}
                  </a>
                ))}
              </div>

              <div className="ct__line">
                <h3>
                  <IconPin size={15} /> Dónde estamos
                </h3>
                <p>{CONTACT.city}</p>
              </div>
            </div>

            <div className="ct__socials">
              <a
                href={whatsappUrl('Hola Atomic Events, quiero cotizar un evento.')}
                target="_blank"
                rel="noopener"
                aria-label="Escríbenos por WhatsApp"
              >
                <IconWhatsapp />
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Síguenos en Instagram"
              >
                <IconInstagram />
              </a>
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Síguenos en Facebook"
              >
                <IconFacebook />
              </a>
            </div>
          </div>

          <form className="form" onSubmit={onSubmit}>
            {sent && (
              <p className="form__ok" role="status">
                <IconCheck size={16} />
                <span>
                  Abrimos WhatsApp con tus datos. Si no se abrió, márcanos al{' '}
                  {CONTACT.phones[0].display}.
                </span>
              </p>
            )}

            <div className="form__row">
              <label className="field">
                <span>Nombre</span>
                <input name="nombre" type="text" required autoComplete="name" />
              </label>

              <label className="field">
                <span>Fecha del evento</span>
                <input name="fecha" type="date" />
              </label>
            </div>

            <label className="field">
              <span>Tipo de evento</span>
              <select name="evento" defaultValue={OCCASIONS[1].label}>
                {OCCASIONS.map((o) => (
                  <option key={o.id}>{o.label}</option>
                ))}
                <option>Otro</option>
              </select>
            </label>

            <label className="field">
              <span>Cuéntanos qué tienes en mente</span>
              <textarea
                name="mensaje"
                required
                placeholder="Cuántos invitados, en qué salón, qué paquete te interesa…"
              />
            </label>

            <button className="btn btn--primary btn--wide" type="submit">
              <IconWhatsapp size={17} />
              Enviar por WhatsApp
            </button>

            <p className="form__note">
              Al enviar se abre WhatsApp con tu mensaje ya escrito. No guardamos
              tus datos en el sitio.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
