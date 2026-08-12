# DESIGN_BIBLE.md

**Status:** Final design specification. Source of truth for the visual system.
**Creative direction:** approved and locked in prior reviews. Not to be redesigned.
**Rule:** This document is a specification — no implementation code. Any uncertain color or value carries `[VERIFY]`.

---

## 1. Core Concept: THE SIGNAL

The relationship progresses through a fixed signal sequence:

```
code
→ voice room
→ messages
→ calls
→ silence
→ confession
→ distance
→ train journey
→ physical presence
```

The website is **not** a generic romantic website. It is:

> a carefully reconstructed record of a relationship.

The defining reader response is:

> **"How did they know that?"**

Everything — tone, texture, pacing, imagery — serves this.

---

## 2. Visual Direction

- **Cinematic** — scroll feels like a film, not a blog.
- **Intimate** — one-on-one, up close, personal.
- **Restrained** — nothing shouts; emotion comes from precision.
- **Editorial** — typography-led, magazine composition.
- **Nostalgic** — analog weight, grain, memory.
- **Dark** — deep, low-light base.
- **Sophisticated** — considered, not cute.
- **Specific** — real records, dates, timestamps, artifacts.
- **Occasionally funny** — dry, human humor in microcopy.
- **Never generic Valentine's** — no bubblegum pastels, no cliché hearts.

---

## 3. Explicit Non-Goals / Anti-patterns

Never include:

- Bubblegum pink.
- Excessive hearts.
- Floating hearts.
- Generic love animations.
- Excessive glassmorphism.
- Generic AI couple imagery.
- Fake future ("happily ever after" fabricated).
- Invented conversations.
- Invented memories.

---

## 4. No-Photograph Strategy

No real photos of the people. Instead, the record reconstructs the story through:

- Interfaces (reconstructed app/chat UI).
- Typography.
- Timestamps.
- Objects.
- Textures.
- Maps (the Salem → Kovilpatti route).
- Sound.
- Reconstructed digital artifacts (the leap-year C program, the HelloTalk line).

---

## 5. Typography

Primary source-of-truth families:

- **Cormorant Garamond** — display / editorial serif (headings, key lines).
- **Inter** — UI / body sans (labels, times, systems).

Principles:

- Serif carries the emotional, editorial voice.
- Sans carries the "system" voice (timestamps, platforms, coordinates).
- Contrast between the two *is* the design tension (organic memory vs. precise record).

---

## 6. Color System

Preserve the approved palette from the Design Bible and the prior creative direction.

The base is **dark** with restrained, specific accents.

> Color tokens (names → target values) are set out for implementation but exact hexes are `[VERIFY]` against the approved palette:

- **Base / background** (deep near-black, warm-leaning) `[VERIFY]`
- **Surface / raised** (slightly lifted dark) `[VERIFY]`
- **Primary text** (warm off-white) `[VERIFY]`
- **Muted text** (lower-contrast warm gray) `[VERIFY]`
- **Accent / signal** (a restrained non-pink accent — e.g. a warm gold / ember) `[VERIFY]`
- **Silence / absence** (cool, removed tone for the silence beats) `[VERIFY]`
- **Danger / warning accent** (muted, low saturation, used sparingly) `[VERIFY]`

Rules:

- Never bubblegum. Accent must read as restrained and sophisticated.
- Contrast-driven hierarchy; nothing floats on pastel.

---

## 7. Typography Scale

Editorial, largely scale-based:

- Display headline — large serif, tight leading. `[VERIFY]` exact sizes.
- Chapter header — medium serif. `[VERIFY]`
- Body — small, comfortable sans or serif depending on role. `[VERIFY]`
- Micro / timestamp / label — small caps sans, wide tracking. `[VERIFY]`
- Code / artifact — mono treatment for the leap-year program. `[VERIFY]` whether a dedicated mono face is used or system mono.

---

## 8. Spacing Philosophy

- Generous, cinematic whitespace.
- Pace is built through **space**, not decoration.
- Consistent rhythm (e.g. a base spacing unit applied across section padding, chapter gaps, gutters). Exact unit `[VERIFY]`.

---

## 9. Layout Grid

- A restrained, editorial grid (typically a 12-column container with generous gutters).
- Content is often **left/bottom aligned**, editorial in feel.
- Full-bleed moments reserved for cinematic chapter breaks.
- Grid must serve the "record" metaphor — like looking through an archive/specimen sheet. Exact column/gutter values `[VERIFY]`.

---

## 10. Chapter Layout Rules

Each chapter of THE SIGNAL may vary, but a shared grammar applies:

- Consistent chapter framing (header pattern, label, spacing).
- Chapters are compositionally distinct but visually coherent.
- The "distance" chapter is a designed pause — sparser.
- The "silence" chapter is the emotional low point — reduced, quiet.
- The "physical presence" chapter is the arrival — full-bleed, warm, close.

---

## 11. Texture Rules

- Texture is used to signal "memory / analog / record," not decoration.
- Applied subtly, at low opacity, over dark surfaces.
- Never competes with content legibility.
- Types of texture approved: grain, faint paper/matter, film-like wear. `[VERIFY]` which are in the approved set.

---

## 12. Grain Rules

- **Grain** is an approved device to add cinematic, filmic memory.
- Must remain fine and restrained — a subtle overlay, not a noise storm.
- Respect `prefers-reduced-motion` (grain should not be animated where reduced motion is set, and static grain is preferred as the baseline).
- Applied globally or per-chapter; `[VERIFY]` extent.

---

## 13. Visual Hierarchy

Priority order:

1. **Story signal** (the current chapter / line).
2. **Supporting record** (timestamps, coordinates, platform labels).
3. **Texture / atmosphere** (always behind content).

Design ensures the last content layer is always most legible.

---

## 14. Responsive Design Rules

- **Mobile uses native scrolling** (no Lenis) — a core architectural rule.
- Layout collapses from editorial multi-column to a tight single column.
- Type scales down but retains hierarchy.
- Touch targets comfortable; no hover-dependent meaning on mobile.
- Performance prioritized on mobile (fewer, cheaper effects). `[VERIFY]` specific breakpoints.

---

## 15. Motion Principles

Two tools, two responsibilities (see TECHNICAL_ARCHITECTURE.md):

- **GSAP** — cinematic, scroll-driven chapter and reveal motion.
- **Motion** — small component interactions.

Principles:

- Motion serves narrative pacing, not decoration.
- Long, slow, smooth for emotional beats; quick, tight for system/UI moments.
- `prefers-reduced-motion` collapses motion to near-zero.

---

## 16. Interaction Principles

- Restrained interactions: hover/scroll responds with purpose.
- The record unfolds as the user scrolls — scroll is the primary interaction.
- Ambiguous or decorative UI is avoided; everything has a reason.
- Mobile interactions rely on scroll, not hover.

---

## 17. Accessibility Principles

- Full `prefers-reduced-motion` support (collapse animation, keep native scroll).
- Semantic HTML, clear landmarks, logical reading order.
- WCAG-compliant contrast (on the dark base, muted text must still meet contrast). `[VERIFY]` final tokens against contrast.
- Alt text and ARIA where needed for reconstructed artifacts.
- Keyboard accessible.

---

## 18. Anti-patterns Log

Explicitly forbidden in implementation:

- Bubblegum pink palettes.
- Floating/excessive hearts.
- Generic AI-generated couple imagery.
- Fabricated dates, timestamps, quotes, stations, train info, or conversations.
- Invented memories.
- Fake future / fake "happily ever after."
- Over-glassmorphism.
- Decorative-only animations.

---

## 19. Open Design Decisions (for next phase)

- Exact hex values for the approved palette. `[VERIFY]`
- Typography scale numbers. `[VERIFY]`
- Base spacing unit and grid column/gutter values. `[VERIFY]`
- Whether a dedicated mono face is used for code artifacts. `[VERIFY]`
- Extent of grain/texture and whether grain animates. `[VERIFY]`
- Breakpoint values for the responsive rules. `[VERIFY]`