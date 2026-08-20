import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { createTrainTimeline } from '../animations/chapter08'

// CHAPTER 08 — TRAIN JOURNEY. "THE PINNED NIGHT SPINE".
//
// Pure scroll-driven narrative, zero interaction. Three exact Tamil lines:
//   1. "sathame illadha andha rathiri..."
//   2. "melliya payanam..."
//   3. "unai adaiyum varai."
//
// The section is EXPLICITLY PINNED by GSAP (pin: true, 2800px). While pinned,
// a single scrubbed timeline plays the cinematic layers over the text timeline
// (which already reads correctly):
//   LAYER 1 — a central railway track spine: two ultra-thin rails continuing
//     Chapter 07's centre guide, softly pulsing.
//   LAYER 2 — two borderless ambient signal glows (warm amber / deep indigo),
//     heavily blurred, drifting slowly as passing night signal lights.
//   LAYER 3 — fine horizontal speed streaks gliding across X + a full-screen
//     vignette for subtle depth.
//   LAYER 4 — the three lines, high-end editorial type at centre stage.
// No boxes, no borders, no floating cards — transparent, dark-slate integrated.
// Reduced motion collapses to a calm static, readable frame.

const LINE =
  'w-[min(88vw,620px)] font-serif text-2xl tracking-[0.25em] text-slate-100 text-center px-6 md:text-4xl drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]'

// The two ultra-thin rails, dead-centre, exactly ±10px apart, full height,
// continuing the line Chapter 07 drew down (50% centre).
const RAIL_STYLE = {
  y1: '0%',
  y2: '100%',
  stroke: 'rgba(255,255,255,0.15)',
  strokeWidth: '1.2',
}

// Fine horizontal speed streaks — the passing speed layer that glides across X.
const STREAKS = [
  { top: '26%', left: '10%', width: 190 },
  { top: '40%', left: '56%', width: 170 },
  { top: '58%', left: '16%', width: 210 },
  { top: '76%', left: '48%', width: 180 },
]

export default function Chapter08() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const cleanup = createTrainTimeline(sectionRef.current, { reduced })
      return cleanup
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <section
      id="chapter-08"
      data-anchor="train-journey"
      ref={sectionRef}
      className="ch08-container relative h-screen w-full overflow-hidden bg-transparent text-slate-100"
    >
      <div aria-hidden="true" className="edge-fade edge-fade-top pointer-events-none z-30" />
      <div aria-hidden="true" className="edge-fade edge-fade-bottom pointer-events-none z-30" />

      {/* ch08-stage — the full-screen pinned content */}
      <div className="ch08-stage absolute inset-0 z-0 flex items-center justify-center">
        {/* LAYER 1 — central railway track spine (rails pulse via GSAP) */}
        <svg
          data-train="spine"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          <line
            data-train="rail-left"
            className="ch08-rail-left"
            style={{ x1: 'calc(50% - 10px)', x2: 'calc(50% - 10px)', ...RAIL_STYLE }}
          />
          <line
            data-train="rail-right"
            className="ch08-rail-right"
            style={{ x1: 'calc(50% + 10px)', x2: 'calc(50% + 10px)', ...RAIL_STYLE }}
          />
        </svg>

        {/* LAYER 2 — passing signal ambient glows (borderless, deep blur) */}
        <div
          data-train="signal-amber"
          aria-hidden="true"
          className="ch08-signal-amber pointer-events-none absolute left-1/4 top-1/3 z-0 h-[350px] w-[350px] rounded-full bg-amber-500/10 blur-[130px]"
        />
        <div
          data-train="signal-indigo"
          aria-hidden="true"
          className="ch08-signal-indigo pointer-events-none absolute bottom-1/4 right-1/4 z-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[150px]"
        />

        {/* LAYER 3 — speed streaks + full-screen vignette */}
        {STREAKS.map((s, i) => (
          <span
            key={i}
            data-train="streak"
            aria-hidden="true"
            className="ch08-streak h-px w-[180px] bg-gradient-to-r from-transparent via-slate-200/20 to-transparent"
            style={{ top: s.top, left: s.left, width: s.width }}
          />
        ))}
        <div
          data-train="vignette"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(5,6,9,0.85)_95%)]"
        />

        {/* LAYER 4 — narrative text at centre stage */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <p data-train="line-1" className={`ch08-line-1 ${LINE}`}>
              sathame illadha andha rathiri...
            </p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p data-train="line-2" className={`ch08-line-2 ${LINE}`}>
              melliya payanam...
            </p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p data-train="line-3" className={`ch08-line-3 ${LINE}`}>
              unai adaiyum varai.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}