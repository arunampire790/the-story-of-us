import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createSignalEntranceTimeline, createSignalFragilityChoreography } from '../../animations/chapter02'
import VoiceMotif from './VoiceMotif'

export default function Chapter02Beat02TheSignal({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  useGSAP(() => { const timeline = createSignalEntranceTimeline(rootRef.current, { reduced }); return () => timeline.kill() }, { scope: rootRef, dependencies: [reduced] })
  useGSAP(() => { const timeline = createSignalFragilityChoreography(rootRef.current, { reduced }); return () => timeline.kill() }, { scope: rootRef, dependencies: [reduced] })
  return (
    <section ref={rootRef} className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center" aria-label={data.title}>
      <div data-ch02signal="content" className="w-full max-w-xl">
        <p data-ch02signal="heading" className="font-display text-2xl font-light leading-relaxed text-text sm:text-3xl">{data.title}</p>
        <div data-ch02signal="body" className="mt-6 space-y-3">{data.bodyLines.map((line) => <p key={line} className="font-metadata text-xs uppercase tracking-[0.3em] text-text-muted">{line}</p>)}</div>
        <div data-ch02signal="motif" className="mx-auto mt-14 w-32 origin-center sm:w-40"><VoiceMotif /></div>
      </div>
    </section>
  )
}