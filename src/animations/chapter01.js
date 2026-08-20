import gsap, { ScrollTrigger } from './setup'

// Chapter 01 — GSAP timeline factories.
// Story-agnostic: these functions receive a scope/ref and orchestrate
// animation ONLY. They must never import story data.
//
// Visual direction (correction pass):
//   Beat 01's question is the emotional focal point; the concentric rings
//   are a quiet secondary motif that BECOMES the bridge during the exit
//   seam. Scroll windows are sequential (no property fights):
//     entrance  : top 80%            (plays once)
//     parallax  : top 60% → top -20% (scrubbed "breathing")
//     exit seam : top -20% → -100%   (question recedes, rings take over)
//
// Animation ownership: GSAP never touches the CSS-owned opacity/scale pulse
// on the ring circles — it only transforms the rings WRAPPER.
//
// Initial-load safety: every fromTo uses immediateRender:false, so on mount
// NOTHING is force-hidden inline. The hero mounts visibly by default (CSS
// fallback) and only the entrance ScrollTrigger fades it in once it fires —
// a stale first measurement can no longer strand the chapter blank/dark
// until a manual reload. Each factory returns a `kill()` that tears down the
// timeline AND its ScrollTrigger (StrictMode double-mount safe).

export function createRoomEntranceTimeline(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out', immediateRender: false },
    scope,
    paused: true,
    delay: reduced ? 0 : 0.2,
  })

  timeline
    .fromTo(
      '[data-beat01="metadata"]',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
      0,
    )
    .fromTo(
      '[data-beat01="title"]',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.35,
    )
    .fromTo(
      '[data-beat01="memory"]',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.8 },
      reduced ? 0 : 0.7,
    )
    .fromTo(
      '[data-beat01="rings"]',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 1.05,
    )

  const trigger = ScrollTrigger.create({
    trigger: scope,
    start: 'top 80%',
    toggleActions: 'play none none none',
    once: true,
    animation: timeline,
  })

  return {
    timeline,
    kill() {
      timeline.kill()
      trigger.kill()
    },
  }
}

// Phase 5B — subtle, scrubbed parallax while Beat 01 is in view.
// The question recedes gently upward (leading the eye toward the rings).
// Continuous ring opacity stays owned by the CSS pulse.
// Reduced motion: no scroll choreography (timeline created, never run).
export function createRoomScrollChoreography(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'none', immediateRender: false },
    scope,
  })

  timeline
    .fromTo(
      '[data-beat01="metadata"]',
      { y: 0 },
      { y: -6, duration: 1 },
      0,
    )
    .fromTo(
      '[data-beat01="title"]',
      { y: 0 },
      { y: -10, duration: 1 },
      0,
    )
    .fromTo(
      '[data-beat01="memory"]',
      { y: 0 },
      { y: -16, duration: 1 },
      0,
    )
    .fromTo(
      '[data-beat01="rings"]',
      { scale: 0.985 },
      { scale: 1.02, duration: 1 },
      0,
    )

  if (!reduced) {
    const trigger = ScrollTrigger.create({
      trigger: scope,
      start: 'top 60%',
      end: 'top -20%',
      scrub: 0.6,
      animation: timeline,
    })

    return {
      timeline,
      kill() {
        timeline.kill()
        trigger.kill()
      },
    }
  }

  return {
    timeline,
    kill() {
      timeline.kill()
    },
  }
}

// Phase 5C — Beat 01 → Beat 02 transition. One memory → the next.
// As Beat 01 leaves the viewport, visual attention shifts from the question
// to the rings: the question recedes upward while the rings expand outward
// (wrapper transform only — the CSS pulse is untouched) and hold the center
// of the frame as Beat 02's content emerges below. No pin, no scroll hijack.
// Reduced motion: no transition (timeline created, never run).
export function createRoomToEntryTransition(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'none', immediateRender: false },
    scope,
  })

  timeline
    .fromTo(
      '[data-beat01="metadata"]',
      { opacity: 1 },
      { opacity: 0, duration: 0.35 },
      0,
    )
    .fromTo(
      '[data-beat01="title"]',
      { opacity: 1 },
      { opacity: 0, duration: 0.35 },
      0,
    )
    .fromTo(
      '[data-beat01="memory"]',
      { opacity: 1, y: -16 },
      { opacity: 0, y: -24, duration: 0.45 },
      0.15,
    )
    .fromTo(
      '[data-beat01="rings"]',
      { y: 0, scale: 1.02 },
      { y: -48, scale: 1.4, duration: 0.5 },
      0.4,
    )

  if (!reduced) {
    const trigger = ScrollTrigger.create({
      trigger: scope,
      start: 'top -20%',
      end: 'top -100%',
      scrub: 0.7,
      animation: timeline,
    })

    return {
      timeline,
      kill() {
        timeline.kill()
        trigger.kill()
      },
    }
  }

  return {
    timeline,
    kill() {
      timeline.kill()
    },
  }
}
