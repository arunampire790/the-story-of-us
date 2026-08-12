import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../../animations/setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { usePreloaderAssets } from '../../hooks/usePreloaderAssets'
import SignalLine from './SignalLine'
import BeginTrigger from './BeginTrigger'

const STAGES = { LOADING: 'loading', READY: 'ready', EXITING: 'exiting' }

// Doorway into the story. Owns its own lifecycle (loading → ready → exiting),
// coordinates asset readiness, focus, scroll lock and a finite GSAP exit.
// No Atmosphere (owned by App), no Lenis, no audio, no story content.
export default function LoadingScreen({ onExit }) {
  const rootRef = useRef(null)
  const beginButtonRef = useRef(null)
  const [stage, setStage] = useState(STAGES.LOADING)
  const [introDone, setIntroDone] = useState(false)
  const reduced = useReducedMotion()
  const assetsReady = usePreloaderAssets()

  // ---- Scroll lock while active (restore previous state exactly) ----
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevOverflow
    }
  }, [])

  // ---- Cinematic intro sequence (finite GSAP timeline) ----
  useGSAP(
    () => {
      if (stage !== STAGES.LOADING) return

      const intro = gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .fromTo(
          '[data-loading="record"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
          0,
        )
        .fromTo(
          '[data-loading="true"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
          reduced ? 0 : 1.2,
        )
        .fromTo(
          '[data-loading="year"]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
          reduced ? 0 : 2.4,
        )
        .add(() => setIntroDone(true))

      intro.play()

      return () => {
        intro.kill()
        setIntroDone(false)
      }
    },
    { scope: rootRef, dependencies: [stage, reduced] },
  )

  // ---- Move to ready once the intro finished AND assets are ready ----
  useEffect(() => {
    if (stage === STAGES.LOADING && introDone && assetsReady) {
      setStage(STAGES.READY)
    }
  }, [stage, introDone, assetsReady])

  // ---- Reveal begin + move focus (restrained, immediately if reduced) ----
  useGSAP(
    () => {
      if (stage !== STAGES.READY) return
      const tween = gsap.fromTo(
        '[data-loading="begin"]',
        { opacity: 0 },
        { opacity: 1, duration: reduced ? 0 : 0.5 },
      )
      tween.play()
      return () => tween.kill()
    },
    { scope: rootRef, dependencies: [stage, reduced] },
  )

  // Move keyboard focus to begin once it is available.
  useEffect(() => {
    if (stage === STAGES.READY) {
      beginButtonRef.current?.focus()
    }
  }, [stage])

  // ---- Finite cinematic exit, then hand control back ----
  const handleBegin = () => {
    if (stage === STAGES.EXITING) return
    setStage(STAGES.EXITING)
  }

  useGSAP(
    () => {
      if (stage !== STAGES.EXITING) return
      const exit = gsap
        .timeline()
        .to(rootRef.current, {
          opacity: 0,
          duration: reduced ? 0 : 0.6,
          ease: 'power2.inOut',
        })
        .add(() => onExit?.())

      exit.play()
      return () => exit.kill()
    },
    { scope: rootRef, dependencies: [stage, onExit, reduced] },
  )

  return (
    <div
      ref={rootRef}
      className="loading-overlay fixed inset-0 z-40 flex items-center justify-center bg-bg"
      aria-busy={stage === STAGES.LOADING}
    >
      <div className="flex flex-col items-center gap-12 text-center">
        <SignalLine />

        <div className="space-y-6">
          <p data-loading="record" className="font-display text-2xl font-light tracking-wide text-text sm:text-3xl">
            A RECORD OF
          </p>
          <p data-loading="true" className="font-display text-4xl font-normal italic text-text sm:text-5xl">
            Something True
          </p>
          <p data-loading="year" className="font-metadata text-sm uppercase tracking-[0.35em] text-accent">
            2025
          </p>
        </div>

        <div data-loading="begin" className="opacity-0">
          <BeginTrigger beginButtonRef={beginButtonRef} onClick={handleBegin} />
        </div>
      </div>
    </div>
  )
}