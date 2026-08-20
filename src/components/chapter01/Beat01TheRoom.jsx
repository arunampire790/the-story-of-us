import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '../../animations/setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  createRoomEntranceTimeline,
  createRoomScrollChoreography,
  createRoomToEntryTransition,
} from '../../animations/chapter01'
import SignalRings from './SignalRings'

// BEAT 01 — THE ROOM
// The visitor discovers the first trace of the relationship.
// Editorial cinematic composition, NOT a HelloTalk clone/chat/screenshot/UI.
// Three GSAP timelines on the same section, all scoped and StrictMode-safe:
//   1. Entrance — played once when the section approaches the viewport.
//   2. Subtle scrubbed parallax — gentle "breathing" tied to scroll.
//   3. Beat 01 → Beat 02 decompression — Beat 01 recedes as it exits.
// No pinning, no scene transitions, no scroll drivers.
//
// Initial-load guard: ScrollTrigger measures trigger positions at creation,
// which on a cold first visit can happen before fonts/images/svh settle — the
// entrance start would be wrong and the hero could stay hidden until a manual
// reload. We re-measure on the next frame and again after the window 'load'
// event so the first phrase reveals without a scroll event or refresh. The
// entrance tweens also use immediateRender:false (see chapter01.js), so the
// hero mounts visible by default and can never be stranded blank.
export default function Beat01TheRoom({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const entrance = createRoomEntranceTimeline(rootRef.current, { reduced })

      const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
      const onLoad = () => ScrollTrigger.refresh()
      window.addEventListener('load', onLoad)

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('load', onLoad)
        entrance.kill()
      }
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      const parallax = createRoomScrollChoreography(rootRef.current, { reduced })
      return () => parallax.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      const transition = createRoomToEntryTransition(rootRef.current, { reduced })
      return () => transition.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={rootRef}
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
      aria-label={data.chapter}
    >
      <p
        data-beat01="metadata"
        className="font-metadata text-xs uppercase tracking-[0.35em] text-text-muted"
      >
        {data.chapter}
      </p>

      <h1
        data-beat01="title"
        className="mt-6 font-display text-3xl font-medium leading-none text-text sm:text-5xl"
      >
        {data.title}
      </h1>

      <blockquote
        data-beat01="memory"
        className="mt-10 max-w-2xl font-quote text-4xl font-light leading-relaxed text-accent-warm sm:text-6xl"
      >
        {data.roomDescription}
      </blockquote>

      <div data-beat01="rings" className="mt-14 w-40 origin-center sm:w-52">
        <SignalRings />
      </div>
    </section>
  )
}