import gsap, { ScrollTrigger } from './setup'

// Chapter 05 — Silence. "THE EMPTY SPACE" — The Cooling Hearth (locked).
//
// Absence through SUBTRACTION. A single scrubbed timeline drives four quiet
// beats of cooling on the SAME persistent layers (SilenceField) — nothing is
// ever replaced, no new dramatic object appears:
//
//   0–10   RESIDUAL WARMTH    — opens on the warm ember-presence, continuous
//                               with Chapter 04's withdrawal into darkness.
//   10–45  COOL DESATURATION  — a rising cool wash desaturates the warmth
//                               toward the silence/absence tone.
//   45–68  TEXTURE THINS      — the faint seams are removed; physical/textural
//                               information recedes.
//   68–85  EMPTY HELD         — negative space dominates; cool haze settles;
//                               a quiet "Silence." label appears and holds.
//   85–100 AXIAL WARM HANDOFF — a single faint warm vertical stir returns down
//                               the central axis, handing off to Confession.
//
// All motion is opacity only (plus the handoff being a persistent faint line —
// it is static, never tweened). No pin, no wheel/touch handlers, no
// scrollerProxy, no loops, no time-based animation. Reverse scroll reverses the
// cooling naturally. The label is the only non-aria-hidden element.
//
// Reduced motion: show the meaningful settled state statically — the cool empty
// field with the faint cool haze and the "Silence." label at rest, no animation.

const S = (key) => `[data-sil="${key}"]`

export function createSilenceTimeline(scope, { reduced = false } = {}) {
  const warm = S('warm')
  const cool = S('cool')
  const seams = S('seams')
  const haze = S('haze')
  const handoff = S('handoff')
  const label = S('label')

  // State 00 — RESIDUAL WARMTH: warmth present, nothing cooled yet.
  gsap.set(warm, { opacity: 0.9 })
  gsap.set(cool, { opacity: 0 })
  gsap.set(seams, { opacity: 0.5 })
  gsap.set(haze, { opacity: 0 })
  gsap.set(handoff, { opacity: 0 })
  gsap.set(label, { opacity: 0 })

  if (reduced) {
    // Meaningful settled state: the cool empty field + faint cool haze + label.
    gsap.set(warm, { opacity: 0.1 })
    gsap.set(cool, { opacity: 0.56 })
    gsap.set(seams, { opacity: 0 })
    gsap.set(haze, { opacity: 0.76 })
    gsap.set(handoff, { opacity: 0 })
    gsap.set(label, { opacity: 0.92 })
    return null
  }

  const t = gsap.timeline({ defaults: { ease: 'none' }, scope, paused: true })

  // BEAT 01 — RESIDUAL WARMTH (0–10): hold the warm ember briefly so the
  // chapter reads as continuous with Chapter 04, then begin the cooling.
  t.to(warm, { opacity: 0.8, duration: 10, ease: 'power1.out' }, 0)

  // BEAT 02 — COOL DESATURATION (10–45): a cool wash rises and drains the
  // warmth toward the cool silence/absence tone. Warmth recedes, cool grows.
  t.to(warm, { opacity: 0.12, duration: 35, ease: 'power1.in' }, 10)
    .to(cool, { opacity: 0.66, duration: 35, ease: 'power1.out' }, 10)

  // BEAT 03 — TEXTURE THINS (45–68): the faint seams fade out; the field loses
  // its physical/textural information and becomes plain.
  t.to(seams, { opacity: 0, duration: 23, ease: 'power1.in' }, 45)

  // BEAT 04 — EMPTY HELD (68–85): negative space dominates. The cool haze
  // settles into a quiet empty field, and the "Silence." label reveals and
  // holds for the rest of the chapter.
  t.to(haze, { opacity: 0.76, duration: 17, ease: 'power1.out' }, 68)
    .to(label, { opacity: 0.92, duration: 8, ease: 'power1.out' }, 70)

  // BEAT 05 — AXIAL WARM HANDOFF (85–100): one faint warm vertical returns
  // down the central axis. It is static (never tweened beyond this reveal),
  // reading as a quiet first stirring before Confession.
  t.to(handoff, { opacity: 0.66, duration: 10, ease: 'power1.out' }, 88)

  ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    animation: t,
  })

  return t
}