import gsap, { ScrollTrigger } from './setup'

// Chapter 06 — Confession. "INSCRIPTION" (locked, stripped-down).
//
// Words have been spoken -> the space holds them -> prolonged silence -> the
// scene releases quietly into Distance. One scrubbed timeline drives the beats
// on persistent layers (ConfessionField) plus the two real-text confession
// lines (ConfessionLine). Opacity only; no layout animation, no RAF, no
// particles, no continuous grain animation. A restrained abstract atmospheric
// pulse (soft warm/cool-neutral luminance, far right, vertically centered) runs
// through the same scrubbed timeline: it appears with the first fragment,
// stays subtly present, and during the silence continues a very restrained
// IRREGULAR lub-dub cadence (organic, not a metronome). It is a visual metaphor
// inspired by "en heart beat fast agudhu" — never presented as a real heartbeat.
//
//   0–6    OPENING / HANDOFF — hold the cool near-black field continuous with
//                              Chapter 05's void. No new element, no cut.
//   6–18   FIRST CONFESSION  — frag-1 "en heart beat fast agudhu" rises as a
//                              whole line (no typing, no movement).
//   18–28  HOLD              — frag-1 stays completely unchanged; no activity.
//   28–40  SECOND CONFESSION — frag-2 "oruvela idhu love ah irukumo" rises as
//                              a whole line. Both now visible together.
//   40–88  SILENCE (~150vh)  — BOTH lines completely static. ONLY the
//                              environment pressurizes: grain 0->0.55 and
//                              vignette/depth (press) 0->0.26. No timer, no
//                              progress, no scroll resistance.
//   88–96  RELEASE           — both fragments gradually recede together into
//                              near-black (not sequentially); env settles.
//   96–100 CH07 HANDOFF      — sparse near-black; no symbolic object remains.
//
// All motion is opacity only (whole-line reveals use a restrained power1.out;
// the release drain uses power1.in; the scrub drive is linear). No pin, no
// wheel/touch handlers, no scrollerProxy, no loops, no time-based animation.
// Reverse scroll reverses the inscription naturally.

const S = (key) => `[data-conf="${key}"]`

export function createConfessionTimeline(scope, { reduced = false } = {}) {
  const field = S('field')
  const frag1 = S('frag-1')
  const frag2 = S('frag-2')
  const press = S('press')
  const grain = S('grain')
  const pulse = S('pulse')

  // State 00 — OPENING: continuous with Chapter 05's near-black holding field.
  gsap.set(field, { opacity: 0.9 })
  gsap.set(frag1, { opacity: 0 })
  gsap.set(frag2, { opacity: 0 })
  gsap.set(press, { opacity: 0 })
  gsap.set(grain, { opacity: 0 })
  gsap.set(pulse, { opacity: 0 })

  if (reduced) {
    // Meaningful settled state: both confession lines at rest over the cool
    // field, with a restrained vignette + grain. The pulse is completely static
    // and off. Static only — no ScrollTrigger, no animation, no loop.
    gsap.set(field, { opacity: 0.9 })
    gsap.set(frag1, { opacity: 0.92 })
    gsap.set(frag2, { opacity: 0.92 })
    gsap.set(press, { opacity: 0.26 })
    gsap.set(grain, { opacity: 0.55 })
    gsap.set(pulse, { opacity: 0 })
    return null
  }

  const t = gsap.timeline({ defaults: { ease: 'none' }, scope, paused: true })

  // 0–6 HANDOFF — field held; no new element.

  // BEAT 01 — FIRST CONFESSION (6–18): frag-1 whole-line rise to 0.92.
  // The atmospheric pulse gradually becomes perceptible alongside it.
  t.to(frag1, { opacity: 0.92, duration: 12, ease: 'power1.out' }, 6).to(
    pulse,
    { opacity: 0.2, duration: 12, ease: 'power1.out' },
    6,
  )

  // 18–28 HOLD — frag-1 stays at 0.92; no environmental change (untouched).

  // BEAT 02 — SECOND CONFESSION (28–40): frag-2 whole-line rise to 0.92.
  // The pulse remains subtly present (a slight, restrained increase).
  t.to(frag2, { opacity: 0.92, duration: 12, ease: 'power1.out' }, 28).to(
    pulse,
    { opacity: 0.24, duration: 22, ease: 'power1.out' },
    18,
  )

  // BEAT 03 — SILENCE (40–88, ~144svh): both lines static; environment only.
  // The atmosphere pressurizes (press/grain) while the pulse continues a very
  // restrained, IRREGULAR lub-dub cadence (not mathematically uniform; organic
  // rather than a metronome). No timer, no progress, no scroll resistance.
  t.to(press, { opacity: 0.26, duration: 48, ease: 'power1.out' }, 40).to(
    grain,
    { opacity: 0.55, duration: 48, ease: 'power1.out' },
    40,
  )

  // Lub-dub pulse pairs inside the silence: each pair is one "lub" (quick,
  // quieter) followed by one "dub" (slightly stronger, slower fall). Spacing,
  // durations and peak heights vary between pairs so the cadence feels organic.
  const BEATS = [
    // [start, lubDur, lubPeak, dubDur, dubPeak]
    [46.0, 1.0, 0.32, 1.9, 0.38],
    [51.5, 1.3, 0.31, 2.2, 0.36],
    [57.5, 0.9, 0.34, 1.6, 0.39],
    [61.5, 1.2, 0.32, 2.0, 0.37],
    [66.5, 1.1, 0.33, 1.7, 0.38],
    [71.0, 1.4, 0.31, 2.1, 0.35],
    [76.5, 0.95, 0.34, 1.8, 0.39],
    [81.0, 1.15, 0.32, 1.65, 0.37],
  ]
  for (const [s, ld, lp, dd, dp] of BEATS) {
    const lubFall = s + ld
    const dubStart = s + ld * 2.35
    const dubRise = dd * 0.55
    t.to(pulse, { opacity: lp, duration: ld, ease: 'power1.out' }, s)
      .to(pulse, { opacity: 0.24, duration: ld * 1.35, ease: 'power1.out' }, lubFall)
      .to(pulse, { opacity: dp, duration: dubRise, ease: 'power1.out' }, dubStart)
      .to(pulse, { opacity: 0.24, duration: dd, ease: 'power1.out' }, dubStart + dubRise)
  }

  // BEAT 04 — RELEASE (88–96): both fragments recede together into near-black,
  // quietly and unresolved; the pulse fades with the confession; env settles.
  t.to(frag1, { opacity: 0, duration: 8, ease: 'power1.in' }, 88)
    .to(frag2, { opacity: 0, duration: 8, ease: 'power1.in' }, 88)
    .to(pulse, { opacity: 0, duration: 8, ease: 'power1.in' }, 88)
    .to(press, { opacity: 0.08, duration: 8, ease: 'power1.out' }, 88)
    .to(grain, { opacity: 0.15, duration: 8, ease: 'power1.out' }, 88)

  // 96–100 CH07 HANDOFF — sparse near-black holds (fragments already drained).

  ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    animation: t,
  })

  return t
}