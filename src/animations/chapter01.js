import gsap, { ScrollTrigger } from './setup'

// Chapter 01 — GSAP timeline factories.
// Story-agnostic: these functions receive a scope/ref and orchestrate
// animation ONLY. They must never import story data.
//
// Entrance (Phase 5A):
//   - Single finite timeline (transform/opacity only), paused until the
//     section top reaches 80% of the viewport, plays exactly once.
//   - Rings scale 0.85 → 1 and reveal; opacity reveal only.
//
// Scroll choreography (Phase 5B):
//   - A separate, scrubbed timeline drives subtle parallax "breathing"
//     as Beat 01 passes through the viewport. No pinning.
//   - Continuous opacity on the rings is left to the CSS pulse; this
//     timeline only touches transforms.

export function createRoomEntranceTimeline(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' },
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
      '[data-beat01="rings"]',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.7,
    )
    .fromTo(
      '[data-beat01="memory"]',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.8 },
      reduced ? 0 : 1.05,
    )

  ScrollTrigger.create({
    trigger: scope,
    start: 'top 80%',
    toggleActions: 'play none none none',
    once: true,
    animation: timeline,
  })

  return timeline
}

// Phase 5B — subtle, scrubbed parallax for Beat 01.
// Gentler than the entrance: text drifts at slightly different speeds and
// the rings breathe (scale only) as the section scrolls through the viewport.
// Continuous ring opacity stays owned by the CSS pulse (independent).
// Reduced motion: no scroll choreography at all (timeline created, never run).
export function createRoomScrollChoreography(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scope,
  })

  timeline
    .fromTo(
      '[data-beat01="metadata"]',
      { y: 0 },
      { y: -8, duration: 1 },
      0,
    )
    .fromTo(
      '[data-beat01="title"]',
      { y: 0 },
      { y: -14, duration: 1 },
      0,
    )
    .fromTo(
      '[data-beat01="rings"]',
      { scale: 0.985 },
      { scale: 1.015, duration: 1 },
      0,
    )
    .fromTo(
      '[data-beat01="memory"]',
      { y: 0 },
      { y: 18, duration: 1 },
      0,
    )

  if (!reduced) {
    ScrollTrigger.create({
      trigger: scope,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 0.6,
      animation: timeline,
    })
  }

  return timeline
}