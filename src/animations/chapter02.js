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

// ---- NARRATIVE MECHANISM — "THE SIGNAL TRAVELS" (Phase 9I) -------------------
//
// One continuous scroll scene that tells the memory story through six visual
// states, driven entirely by the existing scrub (no loops, no time-based
// animation). Scroll progress maps onto the narrative; reverse scroll reverses
// the state naturally. The string geometry itself is unchanged — these states
// come from opacity/scale on existing layers plus restrained atmosphere
// (PresenceField glow/atmo) and the approved typographic voice labels.
//
//   STATE 01 TRANSMISSION   (0–4)     origin kindles — the signal continues
//                                     from Chapter 01; digital/systemic feel.
//   STATE 02 DISTANCE       (15–55)   path extends through negative space; a
//                                     system/metadata label marks the "typing"
//                                     identity; destination stays unreadable.
//   STATE 03 ANTICIPATION   (55–70)   string nears the destination; destination
//                                     faintly present + glow nudges — something
//                                     is about to happen.
//   STATE 04 RESPONSE       (70–82)   KEY BEAT — string arrives; destination
//                                     becomes defined and quietly illuminated
//                                     (halo + brighten); warmth rises.
//   STATE 05 VOICE          (80–92)   system label crossfades to the editorial
//                                     display label — typing → voice.
//   STATE 06 CONNECTION     (92–end)  settle: string reads as an established
//                                     connection, not a transmission; warmth
//                                     blends back toward the global atmosphere.
//
// Reduced motion: show the final meaningful state immediately (connection
// settled, editorial voice visible), no animation.

export function createSignalTravelTimeline(scope, { reduced = false } = {}) {
  const path = scope.querySelector('[data-travel="path"]')
  const origin = scope.querySelector('[data-travel="origin"]')
  const destination = scope.querySelector('[data-travel="destination"]')
  const halo = scope.querySelector('[data-travel="halo"]')
  const typeLabel = scope.querySelector('[data-travel="typeLabel"]')
  const voiceLabel = scope.querySelector('[data-travel="voiceLabel"]')

  if (!path || !origin || !destination || !halo) {
    return null
  }

  const length = path.getTotalLength()

  // Initial (start) state.
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0.3 })
  gsap.set(origin, { opacity: 0, scale: 0.6 })
  gsap.set(destination, { opacity: 0, scale: 0.85 })
  gsap.set(halo, { opacity: 0, scale: 0.9 })
  gsap.set(typeLabel, { opacity: 0, y: 6 })
  gsap.set(voiceLabel, { opacity: 0 })

  if (reduced) {
    // Final meaningful state, no animation.
    gsap.set(path, { strokeDashoffset: 0, opacity: 0.3 })
    gsap.set(origin, { opacity: 0.9, scale: 1 })
    gsap.set(destination, { opacity: 0.85, scale: 1 })
    gsap.set(halo, { opacity: 0.28, scale: 1 })
    gsap.set(typeLabel, { opacity: 0 })
    gsap.set(voiceLabel, { opacity: 0.7 })
    gsap.set('[data-presence="glow"]', { opacity: 0.45 })
    gsap.set('[data-presence="atmo"]', { opacity: 0.14 })
    return null
  }

  const timeline = gsap.timeline({ defaults: { ease: 'none' }, paused: true })

  // STATE 01 — TRANSMISSION: signal kindles, continuing Chapter 01.
  timeline.to(origin, { opacity: 0.9, scale: 1, duration: 4, ease: 'power1.out' }, 0)

  // STATE 02 — DISTANCE: path draws through negative space; system label marks
  // the digital "typing" identity while the destination stays unreadable.
  timeline
    .to(path, { strokeDashoffset: 0, duration: 55, ease: 'none' }, 15)
    .to(typeLabel, { opacity: 0.55, y: 0, duration: 8, ease: 'power1.out' }, 22)

  // STATE 03 — ANTICIPATION: string nears the destination; destination faintly
  // present, glow nudges — "something may be there."
  timeline
    .to(halo, { opacity: 0.16, scale: 0.95, duration: 7, ease: 'power1.out' }, 55)
    .to(destination, { opacity: 0.25, duration: 7, ease: 'none' }, 55)
    .to('[data-presence="glow"]', { opacity: 0.42, duration: 8, ease: 'none' }, 56)

  // STATE 04 — RESPONSE (KEY BEAT): string arrives; destination becomes defined
  // and quietly illuminated; connection becomes more present; warmth rises.
  timeline
    .to(path, { opacity: 0.42, duration: 6, ease: 'none' }, 70)
    .to(destination, { opacity: 1, scale: 1, duration: 8, ease: 'power1.out' }, 70)
    .to(halo, { opacity: 0.28, scale: 1, duration: 8, ease: 'power1.out' }, 70)
    .to('[data-presence="glow"]', { opacity: 0.55, duration: 8, ease: 'none' }, 70)

  // STATE 05 — VOICE: typing → voice typographic transition; warmth peaks.
  timeline
    .to(typeLabel, { opacity: 0, duration: 6, ease: 'power1.out' }, 80)
    .to(voiceLabel, { opacity: 0.85, duration: 8, ease: 'power1.out' }, 81)
    .to('[data-presence="glow"]', { opacity: 0.6, duration: 8, ease: 'none' }, 80)
    .to('[data-presence="atmo"]', { opacity: 0.2, duration: 8, ease: 'none' }, 80)

  // STATE 06 — CONNECTION: settle; established connection, not a transmission;
  // warmth blends back toward the global atmosphere, ready for Chapter 03.
  timeline
    .to(voiceLabel, { opacity: 0.7, duration: 8, ease: 'power1.out' }, 92)
    .to(destination, { opacity: 0.85, duration: 8, ease: 'none' }, 92)
    .to('[data-presence="glow"]', { opacity: 0.45, duration: 10, ease: 'none' }, 92)
    .to('[data-presence="atmo"]', { opacity: 0.14, duration: 10, ease: 'none' }, 92)
    .to(path, { opacity: 0.3, duration: 10, ease: 'none' }, 92)

  ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    animation: timeline,
  })

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