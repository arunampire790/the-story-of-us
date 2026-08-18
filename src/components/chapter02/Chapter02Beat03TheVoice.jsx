import { Fragment, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  createVoiceIntimacyEntrance,
  createVoiceIntimacyChoreography,
} from '../../animations/chapter02'
import VoiceMotif from './VoiceMotif'

// BEAT 03 — IN THE VOICE (Chapter 02)
// Restrained, small factual fragments — the observed language of the
// connection (thambi / akka / vanga·ponga / Japanese / English). Editorial
// record, NOT a chat thread or dialogue. Two scoped, StrictMode-safe timelines:
// entrance (fragments stagger in) + gentle "voice" breathing on the motif.
//
// Story-safety: "thambi" and "akka" are shown ONLY as a visual pair ("THE WAY
// WE TALKED"): the two words stacked with a thin connector between them. No
// speaker, event, joke, teasing, or invented sentence is assigned to either
// word. A subtle scroll-driven focus shift just moves the eye between them.
// vanga·ponga / 日本語 / english keep only their source-supported notes.
const PAIR_WORDS = new Set(['thambi', 'akka'])

export default function Chapter02Beat03TheVoice({ data }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  const pairFragments = data.fragments.filter((fragment) => PAIR_WORDS.has(fragment.word))
  const noteFragments = data.fragments.filter((fragment) => !PAIR_WORDS.has(fragment.word))

  useGSAP(
    () => {
      const timeline = createVoiceIntimacyEntrance(rootRef.current, { reduced })
      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      const timeline = createVoiceIntimacyChoreography(rootRef.current, { reduced })
      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={rootRef}
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center"
      aria-label={data.title}
    >
      <div data-ch02voice="content" className="w-full max-w-xl">
        <p
          data-ch02voice="heading"
          className="font-display text-2xl font-light leading-relaxed text-text sm:text-3xl"
        >
          {data.title}
        </p>

        {/* the word pair — thambi ↕ akka, a visual relationship only */}
        <div data-ch02voice="pair" className="mt-12">
          <p className="font-metadata text-xs uppercase tracking-[0.35em] text-text-muted">
            THE WAY WE TALKED
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            {pairFragments.map((fragment, index) => (
              <Fragment key={fragment.word}>
                <span
                  data-pair-word={fragment.word}
                  className="font-quote text-4xl font-light text-accent-warm sm:text-5xl"
                  style={{ opacity: 0.72 }}
                >
                  {fragment.word}
                </span>
                {index === 0 && (
                  <span
                    className="block h-6 w-px"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(200,161,101,0.15), rgba(200,161,101,0.6))',
                    }}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <ul className="mt-12 space-y-6">
          {noteFragments.map((fragment) => (
            <li
              key={fragment.word}
              data-ch02voice="fragment"
              className="flex flex-col items-center gap-1"
            >
              <span className="font-quote text-3xl font-light text-accent-warm sm:text-4xl">
                {fragment.word}
              </span>
              <span className="font-metadata text-xs uppercase tracking-[0.3em] text-text-muted">
                {fragment.note}
              </span>
            </li>
          ))}
        </ul>

        <div data-ch02voice="motif" className="mx-auto mt-14 w-32 origin-center sm:w-40">
          <VoiceMotif />
        </div>
      </div>
    </section>
  )
}