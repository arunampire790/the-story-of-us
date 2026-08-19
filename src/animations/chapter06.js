import gsap, { ScrollTrigger } from './setup'

// Chapter 06 — Confession. "THE HELD LINE" (state-driven presence-only hold).
//
// Replaces the former scroll-scrub with a single, persistent interaction:
// the user presses and holds the dark field and the environment grows heavier
// while the two real confession fragments stay present. Releasing early returns
// to a quiet idle. Holding through the whole silence is the only completion —
// at which point BOTH fragments recede together into unresolved dark.
//
//   Chapter 03 = REMEMBER   (produce knowledge -> unlock)
//   Chapter 06 = STAY       (endure presence -> remain)
//
// THIS FILE CARRIES NO STORY TEXT. It only drives opacity on nodes the
// components expose (data-conf). Opacity-only, no layout/transform/RAF, no
// loops. The recollect hold length is owned by the section, not this file; here
// we expose the visual state transitions (entry / held / idle / carry).
//
// Entry is triggered once when the section scrolls into view (the fragments
// resolve from darkness). Reduced motion collapses to a static, present,
// settled state with an instant single-step carry — no long interaction
// timeline.
//
// State transitions are plain one-shot tweens: every transition first kills
// any in-flight tween on the properties it owns, so release / re-hold / carry
// can never fight a running heaviness ramp and always take over cleanly.

const HEAVY_IN = 'power1.in' // heaviness mounts slowly, then presses harder
const RELAX_OUT = 'power2.out' // settling back down feels weightless
const RECEDE_IN = 'power1.in' // the fragments sink away rather than pop

export function createHeldLineController(scope, { reduced = false } = {}) {
  const frag1 = scope.querySelector('[data-conf="frag-1"]')
  const frag2 = scope.querySelector('[data-conf="frag-2"]')
  const field = scope.querySelector('[data-conf="field"]')
  const press = scope.querySelector('[data-conf="press"]')
  const grain = scope.querySelector('[data-conf="grain"]')
  const thread = scope.querySelector('[data-conf="thread"]')

  if (!frag1 || !frag2 || !field || !press || !grain || !thread) return null

  // Normal interaction path opens on the approved cool confession field (0.9),
  // matching the reduced-motion static state and the previous INSCRIPTION
  // design. The heaviness (press/grain) and thread start quiet at 0.
  gsap.set(field, { opacity: 0.9 })
  gsap.set([press, grain, thread], { opacity: 0 })
  gsap.set([frag1, frag2], { opacity: 0 })

  const targets = { frag1, frag2, field, press, grain, thread }

  // REDUCED MOTION — meaningful settled, present state. A single instant
  // presence step performs the recession. No long interaction timeline.
  if (reduced) {
    gsap.set(field, { opacity: 0.9 })
    gsap.set(press, { opacity: 0.26 })
    gsap.set(grain, { opacity: 0.55 })
    gsap.set(frag1, { opacity: 0.92 })
    gsap.set(frag2, { opacity: 0.92 })

    return {
      reduced: true,
      begin() {},
      release() {},
      carry() {
        gsap.to(frag1, { opacity: 0, duration: 0.5, ease: 'power1.in' })
        gsap.to(frag2, { opacity: 0, duration: 0.5, ease: 'power1.in' })
        gsap.to([press], { opacity: 0.2, duration: 0.4, ease: 'power1.out' })
        gsap.to([grain], { opacity: 0.3, duration: 0.4, ease: 'power1.out' })
      },
      kill() {
        Object.values(targets).forEach((t) => gsap.killTweensOf(t))
      },
    }
  }

  // ENTRY — fragments resolve from darkness (sequential in), then the thread
  // pretaste appears once both are at rest.
  const entryTl = gsap.timeline({ paused: true, defaults: { ease: 'power1.out' } })
  entryTl
    .to(frag1, { opacity: 0.92, duration: 2.2 }, 0)
    .to(frag2, { opacity: 0.92, duration: 2.2 }, 1.4)
    .to(thread, { opacity: 0.16, duration: 2.4 }, 2.8)

  // HELD — the field grows heavier (grain/vignette rise), the thread goes taut.
  // The only feedback is growing weight; there is no progress, no meter.
  const begin = () => {
    gsap.killTweensOf([press, grain, thread])
    gsap.to(press, { opacity: 0.26, duration: 3.5, ease: HEAVY_IN })
    gsap.to(grain, { opacity: 0.55, duration: 3.5, ease: HEAVY_IN })
    gsap.to(thread, { opacity: 0.34, duration: 0.6, ease: RELAX_OUT })
  }

  // IDLE — releasing early settles the heaviness back down; fragments stay.
  const release = () => {
    gsap.killTweensOf([press, grain, thread])
    gsap.to(press, { opacity: 0, duration: 1.4, ease: RELAX_OUT })
    gsap.to(grain, { opacity: 0, duration: 1.4, ease: RELAX_OUT })
    gsap.to(thread, { opacity: 0.16, duration: 1.0, ease: RELAX_OUT })
  }

  // CARRY — completion: BOTH fragments recede together; the field settles and
  // the thread relents. Nothing is resolved, nothing answered.
  const carry = () => {
    gsap.killTweensOf([frag1, frag2, press, grain, thread])
    gsap.to(frag1, { opacity: 0, duration: 3, ease: RECEDE_IN })
    gsap.to(frag2, { opacity: 0, duration: 3, ease: RECEDE_IN })
    gsap.to(press, { opacity: 0.08, duration: 1.2, ease: RELAX_OUT })
    gsap.to(grain, { opacity: 0.18, duration: 1.0, ease: RELAX_OUT })
    gsap.to(thread, { opacity: 0, duration: 1.0, ease: RELAX_OUT })
  }

  let entryStarted = false
  const startEntry = () => {
    if (entryStarted) return
    entryStarted = true
    entryTl.play()
  }

  const entryTrigger = ScrollTrigger.create({
    trigger: scope,
    start: 'top bottom',
    once: true,
    onEnter: () => {
      startEntry()
      entryTrigger.kill()
    },
  })

  return {
    reduced: false,
    startEntry,
    begin,
    release,
    carry,
    kill() {
      entryTl.kill()
      entryTrigger.kill()
      Object.values(targets).forEach((t) => gsap.killTweensOf(t))
    },
  }
}
