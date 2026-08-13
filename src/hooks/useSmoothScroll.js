import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap, { ScrollTrigger } from '../animations/setup'
import { prefersReducedMotion } from '../utils/motion'

// Lenis 1.3.26 — desktop-only smooth scroll, driven by the single GSAP ticker.
//
// Gating:
//   - desktop only: initialized when a fine pointer (mouse/trackpad) is present
//   - disabled when prefers-reduced-motion is active
// Mobile keeps native scrolling (touch/coarse pointer → no instance created).
//
// Integration:
//   - one global instance per app root
//   - shared GSAP ticker (no custom RAF loop): gsap.ticker → lenis.raf
//   - lenis scroll drives ScrollTrigger.update (no scrollerProxy)
//
// StrictMode-safe: the instance, the ticker callback and the ScrollTrigger
// listener are all torn down in the effect cleanup — no duplicate loops.

const FINE_POINTER_QUERY = '(pointer: fine)'

function hasFinePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(FINE_POINTER_QUERY).matches
}

export function useSmoothScroll() {
  const lenisRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) {
      setEnabled(false)
      return undefined
    }

    const lenis = new Lenis({ respectReducedMotion: true })
    lenisRef.current = lenis
    setEnabled(true)

    const onTicker = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTicker)
    gsap.ticker.lagSmoothing(0)

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(onTicker)
      lenis.destroy()
      lenisRef.current = null
      setEnabled(false)
    }
  }, [])

  const scrollTo = (target, options) => {
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(target, options)
  }

  const destroy = () => {
    const lenis = lenisRef.current
    if (lenis) lenis.destroy()
    lenisRef.current = null
  }

  return { enabled, scrollTo, destroy }
}
