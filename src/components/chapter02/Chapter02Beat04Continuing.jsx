import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createContinuingEntranceTimeline, createContinuingChoreography, createChapter02Exit } from '../../animations/chapter02'
import VoiceMotif from './VoiceMotif'

export default function Chapter02Beat04Continuing({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  useGSAP(() => { const timeline = createContinuingEntranceTimeline(rootRef.current, { reduced }); return () => timeline.kill() }, { scope: rootRef, dependencies: [reduced] })
  useGSAP(() => { const timeline = createContinuingChoreography(rootRef.current, { reduced }); return () => timeline.kill() }, { scope: rootRef, dependencies: [reduced] })
  useGSAP(() => { const timeline = createChapter02Exit(rootRef.current, { reduced }); return () => timeline.kill() }, { scope: rootRef, dependencies: [reduced] })
  return (
    <section ref={rootRef} className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center" aria-label={data.title}>
      <div data-ch02continuing="content" className="w-full max-w-xl">
        <p data-ch02continuing="heading" className="font-display text-2xl font-light leading-relaxed text-text sm:text-3xl">{data.title}</p>
        <div className="mt-8 space-y-4">{data.recordLines.map((line) => <p key={line} data-ch02continuing="record" className="font-metadata text-sm uppercase tracking-[0.3em] text-text-muted">{line}</p>)}</div>
        <div data-ch02continuing="motif" className="mx-auto mt-16 w-32 origin-center sm:w-40"><VoiceMotif /></div>
      </div>
    </section>
  )
}