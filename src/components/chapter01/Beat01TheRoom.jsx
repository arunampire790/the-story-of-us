import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
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
export default function Beat01TheRoom({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const timeline = createRoomEntranceTimeline(rootRef.current, { reduced })
      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      const timeline = createRoomScrollChoreography(rootRef.current, { reduced })
      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      const timeline = createRoomToEntryTransition(rootRef.current, { reduced })
      return () => timeline.kill()
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