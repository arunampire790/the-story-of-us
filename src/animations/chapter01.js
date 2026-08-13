import gsap from './setup'

// Chapter 01 — GSAP timeline factories.
// Story-agnostic: these functions receive a scope/ref and orchestrate
// animation ONLY. They must never import story data.
//
// Single finite entrance timeline (transform/opacity only), no pinning,
// no scroll drivers. Selector text is resolved against `scope`.
// ScrollTrigger is intentionally NOT used here yet.

export function createRoomEntranceTimeline(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scope,
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

  return timeline
}