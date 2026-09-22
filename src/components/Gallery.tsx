import { useState } from 'react'
import { GALLERY, CONTACT } from '../data/site'
import type { GalleryItem } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Shot } from './Shot'
import { IconArrow } from './Icons'

type Filter = 'Todos' | GalleryItem['category']

const FILTERS: Filter[] = ['Todos', 'Bodas', 'XV Años', 'Baby Shower', 'Propuestas']

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('Todos')
  const head = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLUListElement>(80)

  const items =
    filter === 'Todos' ? GALLERY : GALLERY.filter((g) => g.category === filter)

  return (
    <section className="band band--paper" id="galeria">
      <div className="shell">
        <div className="band-head rise" ref={head}>
          <div className="band-head__text">
            <h2>Galería</h2>
            <p>
              Fotos de eventos reales en Mexicali. Estamos preparando esta
              sección con el trabajo de las últimas temporadas.
            </p>
          </div>
          <a
            className="quiet-link"
            href={CONTACT.social.instagram}
            target="_blank"
            rel="noopener"
          >
            Ver más en Instagram
            <IconArrow />
          </a>
        </div>

        <div className="gal__filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className="gal__filter"
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="gal__grid rise" ref={grid}>
          {items.map((item) => (
            <li className="gal__item" key={item.id}>
              <span className="gal__cat">{item.category}</span>
              <Shot photo={item} ratio="4/3" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
