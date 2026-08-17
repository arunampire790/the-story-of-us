import gsap, { ScrollTrigger } from './setup'

// Chapter 03 — Reconstructed Memory. Scroll choreography (Phase 9J content/
// story prototype).
//
// Six approved fragments occupy distinct positions in the field. On scroll,
// each fades into place in sequence at the moment the thin record line reaches
// its node, so the scattered words gradually assemble into ONE remembered
// record by the end. Line draw uses strokeDashoffset (paint property), fragment
// reveals use opacity only — no transform/transform conflicts with the
// centering translate, no layout properties, no loops, no pin. Reverse scroll
// reverses the record naturally (scrub-bound).
//
// Reduced motion: show the fully assembled record immediately, static.

// Fragment reveal windows (as scrub fractions), matched to where the record
// line has reached each node along the polyline:
//   thambi start · akka ~0.12 · 日本語 ~0.34 · english ~0.56 · vanga ~0.81 · ponga end
const FRAGMENT_WINDOWS = [
  [0.0, 0.05], // thambi
  [0.1, 0.16], // akka
  [0.3, 0.38], // 日本語
  [0.52, 0.6], // english
  [0.77, 0.85], // vanga
  [0.94, 1.0], // ponga
]

export function createReconstructedScreenTimeline(scope, { reduced = false } = {}) {
  const line = scope.querySelector('[data-record="line"]')
  const fragments = gsap.utils.toArray('[data-frag]', scope)

  if (!line || fragments.length === 0) {
    return null
  }

  const length = line.getTotalLength()

  // Initial: empty field — record line hidden, all fragments hidden.
  gsap.set(line, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 })
  fragments.forEach((f) => gsap.set(f, { opacity: 0 }))

  if (reduced) {
    // Fully assembled record, static.
    gsap.set(line, { strokeDashoffset: 0, opacity: 0.45 })
    fragments.forEach((f) => gsap.set(f, { opacity: 0.9 }))
    return null
  }

  const timeline = gsap.timeline({ defaults: { ease: 'none' }, paused: true })

  // Record line draws through the whole scroll so it is always "reaching" the
  // next fragment as that fragment appears.
  timeline.to(line, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0)

  // Each fragment fades in during its own window.
  fragments.forEach((f, i) => {
    const [start, end] = FRAGMENT_WINDOWS[i] || [0, 1]
    timeline.fromTo(
      f,
      { opacity: 0 },
      { opacity: 0.9, duration: Math.max(end - start, 0.04), ease: 'power1.out' },
      start,
    )
  })

  // Final assembly: the fully drawn line strengthens — the record is formed.
  timeline.to(line, { opacity: 0.5, duration: 0.08, ease: 'power1.out' }, 0.92)

  ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    animation: timeline,
  })

  return timeline
}