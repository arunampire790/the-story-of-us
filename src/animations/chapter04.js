import gsap, { ScrollTrigger } from './setup'

// Chapter 04 — Calls. "THE ROOM REMEMBERS" (visual rework v4 — final).
//
// PLACE FIRST, LIGHT SECOND. One persistent physical environment seen from one
// fixed camera, grounded by a single static physical anchor. Scroll drives six
// beats on ONE timeline (no loops, no time-based animation); reverse scroll
// reverses the state naturally. All motion is opacity only — no layout
// properties, no pin, no wheel/touch handlers, no scrollerProxy. The same DOM
// layers persist across the whole scrub: state is changed on the room, never by
// replacing it.
//
// THE PLACE STAYS. THE LIGHT CHANGES. THE MEMORY CHANGES.
// The anchor is static (never tweened); only the light/shadow layers reveal or
// conceal how much of it is perceived.
//
//   DARK(0) → UNFAMILIAR→DISCOVER(0–20) → FAMILIARITY(20–50) →
//   ESTABLISHED(50–58) → JULY 17 + PHONE CONTINUATION(58–72) →
//   QUIET(72–90) → WITHDRAWAL→DARKNESS(90–100).
//
// July 17 modifies the EXISTING environment (illumination drops, the anchor's
// edge becomes less visible, a shadow deepens) — no new geometry, no glitch,
// no lines. The phone continuation is a narrower, opposite-direction light that
// reveals a DIFFERENT portion of the same anchor.
//
// The approved narrative copy (NarrativeCopy overlay, data-narr) is scrub
// revealed at its beat: opening at the start, July 17 at the disruption, phone
// continuation at the alternate-light reveal, silence transition near the final
// withdrawal. No timestamp is displayed.
//
// Reduced motion: show a meaningful settled state statically (the established
// place-first composition at rest, physical anchor restrained, with the opening
// line), no animation. Uses the same v4 visual language.

const R = (key) => `[data-room="${key}"]`
const N = (key) => `[data-narr="${key}"]`

export function createRoomsFieldTimeline(scope, { reduced = false } = {}) {
  const texture = R('texture')
  const shadow = R('shadow')
  const horizon = R('horizon')
  const light = R('light')
  const narrow = R('narrow')
  const warm = R('warm')
  const narrOpening = N('opening')
  const narrJuly = N('july17')
  const narrPhone = N('phone')
  const narrSilence = N('silence')

  // The wall + floor bases and the physical anchor are ALWAYS present. The
  // anchor is static — it is never tweened. State 01 — UNFAMILIAR: almost
  // black; the anchor is barely detectable, with only one faint boundary and
  // no light.
  gsap.set(texture, { opacity: 0 })
  gsap.set(shadow, { opacity: 0 })
  gsap.set(horizon, { opacity: 0.06 })
  gsap.set(light, { opacity: 0 })
  gsap.set(narrow, { opacity: 0 })
  gsap.set(warm, { opacity: 0 })
  gsap.set(narrOpening, { opacity: 0 })
  gsap.set(narrJuly, { opacity: 0 })
  gsap.set(narrPhone, { opacity: 0 })
  gsap.set(narrSilence, { opacity: 0 })

  if (reduced) {
    // Meaningful settled state: the established place-first composition at rest
    // with the opening line. No animation. No diagonal beam — the soft wash
    // only.
    gsap.set(texture, { opacity: 0.5 })
    gsap.set(shadow, { opacity: 0.5 })
    gsap.set(horizon, { opacity: 0.7 })
    gsap.set(light, { opacity: 0.7 })
    gsap.set(narrow, { opacity: 0.12 })
    gsap.set(warm, { opacity: 0.35 })
    gsap.set(narrOpening, { opacity: 0.9 })
    return null
  }

  const t = gsap.timeline({ defaults: { ease: 'none' }, scope, paused: true })

  // BEAT 02 — DISCOVER (0–20): a small edge of the anchor becomes visible; the
  // environment begins to reveal itself through a growing soft light.
  //
  // Opening line: strictly sequential editorial fade — in (4–9), hold, out to
  // EXACTLY 0 (22–27), then a breathing gap before the next line (next starts 54).
  t.to(light, { opacity: 0.35, duration: 20, ease: 'power1.out' }, 0)
    .to(horizon, { opacity: 0.4, duration: 20, ease: 'power1.out' }, 0)
    .to(narrOpening, { opacity: 0.85, duration: 5, ease: 'power1.out' }, 4)
    .to(narrOpening, { opacity: 0, duration: 5, ease: 'power1.in' }, 22)

  // BEAT 03 — FAMILIARITY (20–50): more of the SAME anchor resolves — material,
  // edge, subtle shadow, surrounding surface. Persistence is recognized.
  t.to(light, { opacity: 0.72, duration: 30, ease: 'power1.out' }, 20)
    .to(texture, { opacity: 0.5, duration: 30, ease: 'power1.out' }, 20)
    .to(shadow, { opacity: 0.5, duration: 30, ease: 'power1.out' }, 20)
    .to(horizon, { opacity: 0.72, duration: 30, ease: 'power1.out' }, 20)
    .to(warm, { opacity: 0.35, duration: 30, ease: 'power1.out' }, 20)

  // BEAT 04 — ESTABLISHED (50–58): the HERO FRAME. The anchor is clearly
  // readable while the environment stays dark and cinematic. Not the brightest —
  // the most complete.
  t.to(light, { opacity: 0.85, duration: 8, ease: 'power1.out' }, 50)
    .to(texture, { opacity: 0.55, duration: 8, ease: 'power1.out' }, 50)
    .to(shadow, { opacity: 0.55, duration: 8, ease: 'power1.out' }, 50)
    .to(horizon, { opacity: 0.8, duration: 8, ease: 'power1.out' }, 50)
    .to(warm, { opacity: 0.4, duration: 8, ease: 'power1.out' }, 50)

  // BEAT 05 — JULY 17 (58–72). First the established lighting fails (no new
  // object): illumination drops, the anchor's edge becomes less visible, a
  // shadow deepens. The July 17 line fades in at the disruption.
  //
  // SEQUENTIAL: July 17 in (54–59), hold, out to EXACTLY 0 (66–71), breathing
  // gap, then Phone line begins at 76. Zero simultaneous visibility.
  t.to(light, { opacity: 0.4, duration: 4, ease: 'power1.in' }, 58)
    .to(texture, { opacity: 0.2, duration: 4, ease: 'power1.in' }, 58)
    .to(warm, { opacity: 0.2, duration: 4, ease: 'power1.in' }, 58)
    .to(shadow, { opacity: 0.72, duration: 4, ease: 'power1.in' }, 58)
    .to(horizon, { opacity: 0.5, duration: 4, ease: 'power1.in' }, 58)
    .to(narrJuly, { opacity: 0.85, duration: 5, ease: 'power1.out' }, 54)
    .to(narrJuly, { opacity: 0, duration: 5, ease: 'power1.in' }, 66)

  t.to(light, { opacity: 0.28, duration: 8, ease: 'power1.out' }, 64)
    .to(narrow, { opacity: 0.7, duration: 8, ease: 'power1.out' }, 64)
    .to(shadow, { opacity: 0.4, duration: 8, ease: 'power1.out' }, 64)
    .to(texture, { opacity: 0.16, duration: 8, ease: 'power1.out' }, 64)
    .to(warm, { opacity: 0.28, duration: 8, ease: 'power1.out' }, 64)
    .to(horizon, { opacity: 0.4, duration: 8, ease: 'power1.out' }, 64)
    .to(narrPhone, { opacity: 0.85, duration: 5, ease: 'power1.out' }, 76)
    .to(narrPhone, { opacity: 0, duration: 5, ease: 'power1.in' }, 88)

  // BEAT 06 — QUIET (72–90): the visual system quiets; the physical environment
  // stays stable.
  t.to(narrow, { opacity: 0.6, duration: 18, ease: 'power1.out' }, 72)
    .to(light, { opacity: 0.2, duration: 18, ease: 'power1.out' }, 72)
    .to(texture, { opacity: 0.1, duration: 18, ease: 'power1.out' }, 72)
    .to(warm, { opacity: 0.3, duration: 18, ease: 'power1.out' }, 72)

  // BEAT 07 — WITHDRAWAL (90–100): light retreats; the physical anchor
  // gradually becomes unreadable. The silence-transition line fades in near the
  // end (SEQUENTIAL — Phone reached exactly 0 by 93, breathing gap, then Silence
  // begins at 94), then the place returns toward the global near-black,
  // preparing Chapter 05: Silence.
  t.to(light, { opacity: 0.05, duration: 8, ease: 'power1.in' }, 92)
    .to(narrow, { opacity: 0, duration: 8, ease: 'power1.in' }, 92)
    .to(horizon, { opacity: 0.08, duration: 8, ease: 'power1.in' }, 92)
    .to(shadow, { opacity: 0.1, duration: 8, ease: 'power1.in' }, 92)
    .to(texture, { opacity: 0, duration: 8, ease: 'power1.in' }, 92)
    .to(warm, { opacity: 0.05, duration: 8, ease: 'power1.in' }, 92)
    .to(narrSilence, { opacity: 0.85, duration: 5, ease: 'power1.out' }, 94)
    .to(narrSilence, { opacity: 0, duration: 5, ease: 'power1.in' }, 101)

  ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    animation: t,
  })

  return t
}