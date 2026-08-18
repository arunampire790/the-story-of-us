import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createVoiceRoomEntranceTimeline, createVoiceRoomScrollChoreography } from '../../animations/chapter02'
import VoiceMotif from './VoiceMotif'

export default function Chapter02Beat01TheRoom({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  useGSAP(() => { const timeline = createVoiceRoomEntranceTimeline(rootRef.current, { reduced }); return () => timeline.kill() }, { scope: rootRef, dependencies: [reduced] })
  useGSAP(() => { const timeline = createVoiceRoomScrollChoreography(rootRef.current, { reduced }); return () => timeline.kill() }, { scope: rootRef, dependencies: [reduced] })
  return (
    <section ref={rootRef} className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center" aria-label={data.chapter}>
      <p data-ch02room="metadata" className="font-metadata text-xs uppercase tracking-[0.35em] text-text-muted">{data.chapter}</p>
      <h1 data-ch02room="title" className="mt-6 font-display text-3xl font-medium leading-none text-text sm:text-5xl">{data.title}</h1>
      <div data-ch02room="intro" className="mt-8 flex flex-col items-center gap-4">
        <p className="font-metadata text-xs uppercase tracking-[0.35em] text-accent">{data.platform} · {data.roomLabel}</p>
        <div className="space-y-2">{data.introLines.map((line) => <p key={line} className="font-quote text-xl font-light text-text-muted sm:text-2xl">{line}</p>)}</div>
      </div>
      <div data-ch02room="motif" className="mt-14 w-40 origin-center sm:w-52"><VoiceMotif /></div>
    </section>
  )
}