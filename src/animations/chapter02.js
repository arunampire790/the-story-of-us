import gsap, { ScrollTrigger } from './setup'

// Chapter 02 — The Voice Room. GSAP timeline factories.
//
// One chapter-scoped master controls ONLY the environment (presence distance,
// color, focus, room glow, connecting thread). Beat-level timelines control
// ONLY narrative text / spectral fragments / local foreground transforms.
// Distinct targets → no property fights. No pin, no wheel/touch handlers, no
// scrollerProxy, no custom RAF. Reduced motion skips the scrubbed master and
// collapses content reveals to instant/fade-only.

export function createPresenceMasterTimeline(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'none' }, scope, paused: true })

  // A → B  | arrival → fragile signal: presence dims, recedes (cool visible)
  timeline
    .to('[data-presence="presence"]', { y: -8, opacity: 0.3, duration: 0.18 }, 0)
    .to('[data-presence="glow"]', { opacity: 0.16, duration: 0.18 }, 0)
    .to('[data-presence="atmo"]', { opacity: 0.08, duration: 0.18 }, 0)
    .to('[data-presence="thread"]', { opacity: 0.1, duration: 0.18 }, 0)

  // B → C  | signal → voice (warmth peak): presence returns near, crossfade
  //          cool→warm layers (opacity only), room glow + atmosphere rise
  timeline
    .to('[data-presence="presence"]', { y: 48, opacity: 0.95, duration: 0.37 })
    .to('[data-presence="cool"]', { opacity: 0, duration: 0.37 })
    .to('[data-presence="warm"]', { opacity: 1, duration: 0.37 })
    .to('[data-presence="glow"]', { opacity: 0.6, duration: 0.37 })
    .to('[data-presence="atmo"]', { opacity: 0.22, duration: 0.37 })
    .to('[data-presence="thread"]', { opacity: 0.5, duration: 0.37 })

  // C → D  | voice → continuing: presence settles, thread steady
  timeline
    .to('[data-presence="presence"]', { y: 52, opacity: 0.9, duration: 0.27 })
    .to('[data-presence="thread"]', { opacity: 0.85, duration: 0.27 })
    .to('[data-presence="glow"]', { opacity: 0.48, duration: 0.27 })
    .to('[data-presence="atmo"]', { opacity: 0.18, duration: 0.27 })

  // D → E  | continuing → rest: dimmed breathing core
  timeline
    .to('[data-presence="presence"]', { y: 42, opacity: 0.72, duration: 0.18 })
    .to('[data-presence="glow"]', { opacity: 0.4, duration: 0.18 })
    .to('[data-presence="atmo"]', { opacity: 0.15, duration: 0.18 })
    .to('[data-presence="thread"]', { opacity: 0.5, duration: 0.18 })

  if (!reduced) {
    ScrollTrigger.create({
      trigger: scope,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      animation: timeline,
    })
  } else {
    // Reduced motion: static settled room (no scrubbed environment animation).
    timeline.progress(1).pause()
  }

  return timeline
}

// Content reveals (per beat). Play once on scroll into view. Reduced motion
// collapses to an instant/no-op reveal.

export function createArrivalEntrance(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'power2.out' }, scope, paused: true })
  timeline
    .fromTo(
      '[data-arrival="kicker"]',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
      0,
    )
    .fromTo(
      '[data-arrival="title"]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.25,
    )
    .fromTo(
      '[data-arrival="record"]',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
      reduced ? 0 : 0.5,
    )
    .fromTo(
      '[data-arrival="aperture"]',
      { opacity: 0, scale: 0.86 },
      { opacity: 1, scale: 1, duration: reduced ? 0 : 0.8 },
      reduced ? 0 : 0.6,
    )
  ScrollTrigger.create({
    trigger: scope,
    start: 'top 70%',
    toggleActions: 'play none none none',
    once: true,
    animation: timeline,
  })
  return timeline
}

export function createSignalEntrance(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'power2.out' }, scope, paused: true })
  timeline
    .fromTo(
      '[data-signal="heading"]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      0,
    )
    .fromTo(
      '[data-signal="record"]',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
      reduced ? 0 : 0.25,
    )
  ScrollTrigger.create({
    trigger: scope,
    start: 'top 70%',
    toggleActions: 'play none none none',
    once: true,
    animation: timeline,
  })
  return timeline
}

export function createVoiceEntrance(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'power2.out' }, scope, paused: true })
  timeline
    .fromTo(
      '[data-voice="heading"]',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
      0,
    )
    .fromTo(
      '[data-voice="fragment"]',
      { opacity: 0, y: 12 },
      { opacity: 0.85, y: 0, duration: reduced ? 0 : 0.8, stagger: reduced ? 0 : 0.18 },
      reduced ? 0 : 0.2,
    )
    .to(
      '[data-voice="light"]',
      { opacity: 0.9, duration: reduced ? 0 : 0.6 },
      reduced ? 0 : 1.1,
    )
  ScrollTrigger.create({
    trigger: scope,
    start: 'top 65%',
    toggleActions: 'play none none none',
    once: true,
    animation: timeline,
  })
  return timeline
}

export function createContinuingEntrance(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'power2.out' }, scope, paused: true })
  timeline
    .fromTo(
      '[data-continuing="heading"]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      0,
    )
    .fromTo(
      '[data-continuing="record"]',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
      reduced ? 0 : 0.25,
    )
  ScrollTrigger.create({
    trigger: scope,
    start: 'top 70%',
    toggleActions: 'play none none none',
    once: true,
    animation: timeline,
  })
  return timeline
}