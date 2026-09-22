import { useEffect, useRef } from 'react'

/**
 * Revela el elemento al entrar en pantalla, una sola vez.
 * Si el sistema pide menos movimiento no se registra nada y el contenido
 * aparece ya visible.
 */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const quiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (quiet) {
      el.classList.add('is-in')
      return
    }

    if (delay) el.style.transitionDelay = `${delay}ms`

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        io.unobserve(entry.target)
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return ref
}
