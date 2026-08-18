import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { createVoiceIntimacyEntrance, createVoiceIntimacyChoreography } from '../../animations/chapter02'
import VoiceMotif from './VoiceMotif'

export default function Chapter02Beat03TheVoice({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  useGSAP(() => { const timeline = createVoiceIntimacyEntrance(rootRef.current, { reduced }); return () => timeline.kill() }, { scope: rootRef, dependencies: [reduced] })
  useGSAP(() => { const timeline = createVoiceIntimacyChoreography(rootRef.current, { reduced }); return () => timeline.kill() }, { scope: rootRef, dependencies: [reduced] })
  return (
    <section ref={rootRef} className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center" aria-label={data.title}>
      <div data-ch02voice="content" className="w-full max-w-xl">
        <p data-ch02voice="heading" className="font-display text-2xl font-light leading-relaxed text-text sm:text-3xl">{data.title}</p>
        <ul className="mt-10 space-y-6">{data.fragments.map((fragment) => <li key={fragment.word} data-ch02voice="fragment" className="flex flex-col items-center gap-1"><span className="font-quote text-3xl font-light text-accent-warm sm:text-4xl">{fragment.word}</span><span className="font-metadata text-xs uppercase tracking-[0.3em] text-text-muted">{fragment.note}</span></li>)}</ul>
        <div data-ch02voice="motif" className="mx-auto mt-14 w-32 origin-center sm:w-40"><VoiceMotif /></div>
      </div>
    </section>
  )
}