import { useEffect, useState } from 'react'
import { whatsappUrl } from './data/site'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Packages } from './components/Packages'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { IconWhatsapp } from './components/Icons'

/** El botón flotante aparece una vez que el hero queda atrás. */
function FloatingWhatsapp() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`wa ${shown ? 'is-shown' : ''}`}
      href={whatsappUrl('Hola Atomic Events, quiero cotizar un evento.')}
      target="_blank"
      rel="noopener"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
    >
      <IconWhatsapp size={20} />
      <span>Cotizar por WhatsApp</span>
    </a>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido">
        <Hero />
        <About />
        <Services />
        <Packages />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsapp />
    </>
  )
}
