import gsap, { ScrollTrigger } from './setup'

// Chapter 02 — The Voice Room. GSAP timeline factories.
// Story-agnostic: these functions receive a scope/ref and orchestrate
// animation ONLY. They must never import story data.
//
// Visual direction (text → voice; continuous with Chapter 01):
//   Beat 01 — The Voice Room: the ring emblem reopens as the room where the
//     typed signal becomes a voice (the motif continues from Chapter 01).
//   Beat 02 — The Signal: the HelloTalk connection is fragile ("often weak"),
//     shown as the motif wrapper dimming/flickering on scroll.
//   Beat 03 — In the Voice: restrained language fragments — gentle breathing.
//     The thambi ↔ akka word pair is a visual relationship only (no speaker,
//     event, or joke assigned); a subtle scrubbed focus shift moves the eye
//     between the two words. vanga·ponga / 日本語 / english keep only their
//     source-supported notes.
//   Beat 04 — Continuing: quiet record lines; the motif steadies, then dims
//     on exit as a breathing-space handoff for the next chapter.
//
// Animation ownership: GSAP never touches the CSS-owned opacity/scale pulse
// on the ring circles — it only transforms the VoiceMotif WRAPPER. Pattern
// and scroll-window discipline match animations/chapter01.js (sequential
// windows, no property fights, no pin).

export function createVoiceRoomEntranceTimeline(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scope,
    paused: true,
    delay: reduced ? 0 : 0.2,
  })

  timeline
    .fromTo(
      '[data-ch02room="metadata"]',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
      0,
    )
    .fromTo(
      '[data-ch02room="title"]',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.35,
    )
    .fromTo(
      '[data-ch02room="intro"]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.6,
    )
    .fromTo(
      '[data-ch02room="motif"]',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.9,
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

// Beat 01 — gentle scrubbed "breathing" while in view (matches Chapter 01 cadence).
// Ring circles' own pulse stays CSS-owned; only the wrapper scale is animated.
export function createVoiceRoomScrollChoreography(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'none' }, scope })

  timeline
    .fromTo('[data-ch02room="metadata"]', { y: 0 }, { y: -6, duration: 1 }, 0)
    .fromTo('[data-ch02room="title"]', { y: 0 }, { y: -10, duration: 1 }, 0)
    .fromTo('[data-ch02room="intro"]', { y: 0 }, { y: -14, duration: 1 }, 0)
    .fromTo('[data-ch02room="motif"]', { scale: 0.985 }, { scale: 1.02, duration: 1 }, 0)

  if (!reduced) {
    ScrollTrigger.create({
      trigger: scope,
      start: 'top 60%',
      end: 'top -20%',
      scrub: 0.6,
      animation: timeline,
    })
  }

  return timeline
}

// Beat 02 — entrance (once).
export function createSignalEntranceTimeline(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scope,
    paused: true,
  })

  timeline
    .fromTo(
      '[data-ch02signal="heading"]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      0,
    )
    .fromTo(
      '[data-ch02signal="body"]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.25,
    )
    .fromTo(
      '[data-ch02signal="motif"]',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.5,
    )

  ScrollTrigger.create({
    trigger: scope,
    start: 'top 75%',
    toggleActions: 'play none none none',
    once: true,
    animation: timeline,
  })

  return timeline
}

// Beat 02 — fragility: the motif dims and recovers as the connection proves
// unsteady ("often weak"). Wrapper opacity only; CSS-owned pulse untouched.
export function createSignalFragilityChoreography(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'none' }, scope })

  timeline
    .fromTo('[data-ch02signal="content"]', { y: 0 }, { y: -16, duration: 1 }, 0)
    .fromTo('[data-ch02signal="motif"]', { opacity: 1 }, { opacity: 0.35, duration: 1 }, 0)
    .to('[data-ch02signal="motif"]', { opacity: 0.85, duration: 0.4 })

  if (!reduced) {
    ScrollTrigger.create({
      trigger: scope,
      start: 'top 60%',
      end: 'top -20%',
      scrub: 0.6,
      animation: timeline,
    })
  }

  return timeline
}

// Beat 03 — entrance (once), fragments stagger in.
export function createVoiceIntimacyEntrance(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scope,
    paused: true,
  })

  timeline
    .fromTo(
      '[data-ch02voice="heading"]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      0,
    )
    .fromTo(
      '[data-ch02voice="pair"]',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.6 },
      reduced ? 0 : 0.2,
    )
    .fromTo(
      '[data-ch02voice="fragment"]',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.5, stagger: reduced ? 0 : 0.12 },
      reduced ? 0 : 0.25,
    )
    .fromTo(
      '[data-ch02voice="motif"]',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.6,
    )

  ScrollTrigger.create({
    trigger: scope,
    start: 'top 75%',
    toggleActions: 'play none none none',
    once: true,
    animation: timeline,
  })

  return timeline
}

// Beat 03 — gentle "voice" breathing: slow wrapper scale on the motif, plus a
// subtle reciprocal focus shift between the thambi / akka word pair. The pair
// tweens only move opacity/scale (local foreground transforms); they assign no
// meaning — the eye just drifts between the two words across the scroll.
export function createVoiceIntimacyChoreography(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'none' }, scope })

  timeline
    .fromTo('[data-ch02voice="content"]', { y: 0 }, { y: -18, duration: 1 }, 0)
    .fromTo('[data-ch02voice="motif"]', { scale: 1 }, { scale: 1.035, duration: 1 }, 0)
    .fromTo(
      '[data-pair-word="thambi"]',
      { opacity: 0.72, scale: 1 },
      { opacity: 0.6, scale: 0.97, duration: 0.6 },
      0,
    )
    .fromTo(
      '[data-pair-word="akka"]',
      { opacity: 0.72, scale: 1 },
      { opacity: 0.84, scale: 1.02, duration: 0.6 },
      0,
    )
    .fromTo(
      '[data-pair-word="thambi"]',
      { opacity: 0.6, scale: 0.97 },
      { opacity: 0.7, scale: 0.995, duration: 0.4 },
      0.6,
    )
    .fromTo(
      '[data-pair-word="akka"]',
      { opacity: 0.84, scale: 1.02 },
      { opacity: 0.74, scale: 1.005, duration: 0.4 },
      0.6,
    )

  if (!reduced) {
    ScrollTrigger.create({
      trigger: scope,
      start: 'top 60%',
      end: 'top -20%',
      scrub: 0.6,
      animation: timeline,
    })
  }

  return timeline
}

// Beat 04 — entrance (once).
export function createContinuingEntranceTimeline(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scope,
    paused: true,
  })

  timeline
    .fromTo(
      '[data-ch02continuing="heading"]',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.7 },
      0,
    )
    .fromTo(
      '[data-ch02continuing="record"]',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: reduced ? 0 : 0.55, stagger: reduced ? 0 : 0.15 },
      reduced ? 0 : 0.25,
    )
    .fromTo(
      '[data-ch02continuing="motif"]',
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: reduced ? 0 : 0.7 },
      reduced ? 0 : 0.5,
    )

  ScrollTrigger.create({
    trigger: scope,
    start: 'top 75%',
    toggleActions: 'play none none none',
    once: true,
    animation: timeline,
  })

  return timeline
}

// Beat 04 — gentle parallax while in view.
export function createContinuingChoreography(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'none' }, scope })

  timeline.fromTo('[data-ch02continuing="content"]', { y: 0 }, { y: -16, duration: 1 }, 0)

  if (!reduced) {
    ScrollTrigger.create({
      trigger: scope,
      start: 'top 60%',
      end: 'top -20%',
      scrub: 0.6,
      animation: timeline,
    })
  }

  return timeline
}

// Chapter exit / breathing-space handoff: as Beat 04 leaves, the motif dims
// and recedes small — a quiet resting state for the next chapter, before the
// daily-call period / confession. Wrapper transform/opacity only.
export function createChapter02Exit(scope, { reduced = false } = {}) {
  const timeline = gsap.timeline({ defaults: { ease: 'none' }, scope })

  timeline
    .fromTo('[data-ch02continuing="content"]', { opacity: 1 }, { opacity: 0, duration: 0.4 }, 0)
    .fromTo(
      '[data-ch02continuing="motif"]',
      { opacity: 1, y: 0, scale: 1 },
      { opacity: 0.45, y: -48, scale: 0.9, duration: 0.5 },
      0.2,
    )

  if (!reduced) {
    ScrollTrigger.create({
      trigger: scope,
      start: 'top -20%',
      end: 'top -100%',
      scrub: 0.7,
      animation: timeline,
    })
  }

  return timeline
}