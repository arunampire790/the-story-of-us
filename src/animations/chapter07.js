import gsap, { ScrollTrigger } from './setup'

// Chapter 07 — Distance. "THE 7-YEAR HORIZON".
//
// A pure narrative chapter: three real, source-supported lines about the
// designed pause and the shared future (the same feeling; the seven years;
// the financial stability). No interaction, no lock, no dialogue beyond the
// approved lines, no invented fight details.
//
// Unlike the sticky-stage chapters, this chapter LIVES IN THE FLOW: the three
// lines are physically separated by tall vertical padding (the scroll runway),
// so the distance between the words is literal. Each line is scrubbed in as it
// crosses the viewport — a soft opacity rise with a slight upward settle.
//
// A small decorative scene rides behind each line to give the distance a
// visual shape without pinning anything:
//   line 1 — two soft glowing memory orbs in subtle proximity;
//   line 2 — the orbs drift apart over a faint ruled grid + horizon glow;
//   line 3 — the grid/horizon converges into a single vertical track that
//            draws downward, handing the eye to the guide toward Chapter 08.
// These scene tweens are opacity/scale/translate only (GPU-friendly).
//
// Reduced motion collapses everything to a simple cross-fade: each line (and
// the guide) fades to its resting opacity once, with no spatial drift and no
// scrub, and the scenes sit in calm, gentle resting states.

const S = (key) => `[data-dst="${key}"]`

export function createDistanceTimeline(scope, { reduced = false } = {}) {
  const line1 = scope.querySelector(S('line-1'))
  const line2 = scope.querySelector(S('line-2'))
  const line3 = scope.querySelector(S('line-3'))
  const guide = scope.querySelector(S('guide'))

  if (!line1 || !line2 || !line3 || !guide) return () => {}

  const node = (name) => scope.querySelector(S(name))
  const nodes = {
    a1: node('node-a-1'),
    b1: node('node-b-1'),
    a2: node('node-a-2'),
    b2: node('node-b-2'),
    a3: node('node-a-3'),
    b3: node('node-b-3'),
  }
  const grid2 = node('grid-2')
  const glow2 = node('glow-2')
  const grid3 = node('grid-3')
  const glow3 = node('glow-3')
  const track3 = node('track-3')

  const scene1 = [nodes.a1, nodes.b1].every(Boolean)
  const scene2 = [grid2, glow2, nodes.a2, nodes.b2].every(Boolean)
  const scene3 = [grid3, glow3, track3, nodes.a3, nodes.b3].every(Boolean)

  gsap.set([line1, line2, line3], { opacity: 0, y: 48 })
  gsap.set(guide, { opacity: 0, scaleY: 0 })

  if (scene1) gsap.set([nodes.a1, nodes.b1], { opacity: 0, x: 0 })
  if (scene2) {
    gsap.set([nodes.a2, nodes.b2], { opacity: 0, x: 0 })
    gsap.set([grid2, glow2], { opacity: 0, scaleY: 1 })
  }
  if (scene3) {
    // Start apart (as the separated lights) and converge into the track.
    gsap.set(nodes.a3, { opacity: 0, x: '-38vw' })
    gsap.set(nodes.b3, { opacity: 0, x: '38vw' })
    gsap.set([grid3, glow3], { opacity: 0, scaleY: 1 })
    gsap.set(track3, { opacity: 0, scaleY: 0 })
  }

  if (reduced) {
    // Simple cross-fade fallback — no movement, no scrub, no drift.
    gsap.set([line1, line2, line3], { y: 0 })
    if (scene1) {
      gsap.set(nodes.a1, { x: -30 })
      gsap.set(nodes.b1, { x: 30 })
      gsap.set([nodes.a1, nodes.b1], { opacity: 0.55 })
    }
    if (scene2) {
      gsap.set(nodes.a2, { x: '-34vw' })
      gsap.set(nodes.b2, { x: '34vw' })
      gsap.set([nodes.a2, nodes.b2], { opacity: 0.4 })
      gsap.set([grid2, glow2], { opacity: 0.28 })
    }
    if (scene3) {
      gsap.set([nodes.a3, nodes.b3], { opacity: 0.28, x: 0 })
      gsap.set([grid3, glow3], { opacity: 0.2 })
      gsap.set(track3, { opacity: 0.45, scaleY: 1 })
    }
    const tl = gsap.timeline({ defaults: { ease: 'power1.out', duration: 0.9 } })
    tl.to(line1, { opacity: 0.95 })
      .to(line2, { opacity: 0.95 }, '+=0.2')
      .to(line3, { opacity: 0.95 }, '+=0.2')
      .to(guide, { opacity: 0.5, scaleY: 1 }, '+=0.2')
    return () => tl.kill()
  }

  const reveal = (el) =>
    ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      end: 'top 35%',
      scrub: 1,
      animation: gsap.fromTo(
        el,
        { opacity: 0, y: 48 },
        { opacity: 0.95, y: 0, ease: 'none', immediateRender: false },
      ),
    })

  const t1 = reveal(line1)
  const t2 = reveal(line2)
  const t3 = reveal(line3)

  // The guide draws down toward Chapter 08 only at the very end, after the
  // lines have passed. scaleY keeps it GPU-friendly (opacity + transform).
  // Trailing runout below the guide gives it room to complete in the flow.
  const tGuide = ScrollTrigger.create({
    trigger: guide,
    start: 'top 78%',
    end: 'top 30%',
    scrub: 1,
    animation: gsap.fromTo(
      guide,
      { opacity: 0, scaleY: 0 },
      { opacity: 0.55, scaleY: 1, ease: 'none', immediateRender: false },
    ),
  })

  const tScene1 = scene1
    ? ScrollTrigger.create({
        trigger: line1,
        start: 'top 78%',
        end: 'top 35%',
        scrub: 1,
        animation: gsap
          .timeline({ defaults: { ease: 'none', immediateRender: false } })
          .to(nodes.a1, { opacity: 0.8, x: -28, duration: 1 }, 0)
          .to(nodes.b1, { opacity: 0.8, x: 28, duration: 1 }, 0),
      })
    : null

  const tScene2 = scene2
    ? ScrollTrigger.create({
        trigger: line2,
        start: 'top 78%',
        end: 'top 35%',
        scrub: 1,
        animation: gsap
          .timeline({ defaults: { ease: 'none', immediateRender: false } })
          .to(nodes.a2, { opacity: 0.8, x: '-38vw', duration: 1 }, 0)
          .to(nodes.b2, { opacity: 0.8, x: '38vw', duration: 1 }, 0)
          .to(grid2, { opacity: 0.5, duration: 1 }, 0)
          .to(glow2, { opacity: 0.7, duration: 1 }, 0),
      })
    : null

  const tScene3 = scene3
    ? ScrollTrigger.create({
        trigger: line3,
        start: 'top 78%',
        end: 'top 35%',
        scrub: 1,
        animation: gsap
          .timeline({ defaults: { ease: 'none', immediateRender: false } })
          .to([nodes.a3, nodes.b3], { opacity: 0.28, x: 0, duration: 1 }, 0)
          .to([grid3, glow3], { opacity: 0, scaleY: 0.3, duration: 1 }, 0)
          .to(track3, { opacity: 0.5, scaleY: 1, duration: 1 }, 0),
      })
    : null

  return () => {
    t1.kill()
    t2.kill()
    t3.kill()
    tGuide.kill()
    tScene1?.kill()
    tScene2?.kill()
    tScene3?.kill()
  }
}