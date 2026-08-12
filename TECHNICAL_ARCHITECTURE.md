# TECHNICAL_ARCHITECTURE.md

**Status:** Source of truth for the technical architecture, based on the approved **Gemini technical audit** and the **Phase 1 architecture**.
**Rule:** Story data and animation logic must remain completely separate. No undocumented Lenis APIs.

---

## 1. Stack

- **React** + **Vite** (existing scaffold, `react` v19).
- **Tailwind CSS** (v4, CSS-first via `@tailwindcss/vite`; no `tailwind.config.js`).
- **GSAP** (+ **ScrollTrigger**).
- **@gsap/react** (React-safe GSAP lifecycle).
- **Motion** (component-level interactions; supersedes Framer Motion usage here).
- **Lenis** (desktop smooth scroll, desktop only, planned — not yet wired).
- **Lucide React** (icons).

---

## 2. Tool Responsibilities (non-negotiable)

- **GSAP** → cinematic, scroll-driven animation (chapters, reveals, parallax, timelines).
- **Motion** → small component-level interactions (mount reveals, toggles, micro-interactions).
- **@gsap/react** → React-safe GSAP lifecycle management (`useGSAP`), correct cleanup in React/StrictMode.
- **Lenis** → desktop smooth scrolling, only when appropriate.

One tool, one job. GSAP and Motion never compete on the same interaction.

---

## 3. Folder Structure (final)

```
src/
  assets/
    images/
    textures/
    audio/
  components/
    ui/          presentational atoms
    navigation/  scroll indicator, progress, menu
    effects/     Motion-driven component interactions
    shared/      section wrapper, framing
  sections/      one component per chapter of THE SIGNAL
  data/          story content ONLY (no JSX, no animation)
  hooks/         useReducedMotion, useSectionProgress, useSmoothScroll
  utils/         reduced-motion & scroll/media helpers
  animations/    GSAP timelines, ScrollTrigger config, setup
  styles/        Tailwind entry + tokens
```

---

## 4. Separation Rules (critical)

- `src/data/` = story/content data only. No React, no animation.
- `src/animations/` = animation logic only. No story content.
- **`data/` and `animations/` must never import each other.**
- Components compose both: a section reads from `data/` and calls `animations/`, but the two directories remain decoupled.

---

## 5. GSAP Integration (React-safe)

- Register `ScrollTrigger` centrally, once, in `src/animations/setup.js` (already implemented).
- Use **`useGSAP`** from `@gsap/react` inside components — never raw `useEffect` for timeline lifecycle.
- `useGSAP` handles `context.revert()` on unmount and is StrictMode-safe.
- Keep timeline logic in `src/animations/` as reusable functions; components only call them with element refs.

---

## 6. Motion Integration

- Motion handles only component-level interactions (small reveals, state feedback).
- Motion elements are gated by `prefers-reduced-motion` where relevant (`reducedMotion` support).
- Motion and GSAP do not both animate the same element's same property.

---

## 7. Lenis (planned — not yet implemented)

- **Desktop only where appropriate.** Do not initialize on mobile.
- **Respect `prefers-reduced-motion`:** do not initialize when reduced motion is requested.
- Mobile keeps **native scrolling** as the default architecture.
- A placeholder `useSmoothScroll` hook already reserves this location (returns a no-op).
- Integration, when implemented, must be verified against the **installed Lenis version** and its **official documentation**.
- **Do not invent undocumented Lenis APIs, CSS classes, or ScrollTrigger behaviors.**

---

## 8. Reduced Motion

- `prefers-reduced-motion` must be honored globally.
- GSAP timelines collapse to little/no motion.
- Motion interactions respect reduced-motion.
- Lenis not initialized under reduced motion.
- A CSS layer in `styles/index.css` already disables smooth scroll behavior under reduced motion.

---

## 9. Mobile & Performance

- Mobile: **native scrolling** (no Lenis).
- Prefer GPU-friendly properties (`transform`, `opacity`); avoid layout-thrashing.
- Lazy-load images (`loading="lazy"`, `decoding="async"`), proper dimensions to prevent CLS.
- Avoid excessive ScrollTrigger listeners; use batching/scoped triggers where appropriate.
- Keep the bundle lean (no 3D). `[VERIFY]` future performance budget.
- Reduced motion short-circuits the heaviest timelines on all devices.

---

## 10. Accessibility Constraints

- Semantic HTML, clear landmarks, logical reading order.
- WCAG-compliant contrast on the dark base.
- Reduced-motion support (above).
- Keyboard accessible; mobile relies on scroll, not hover.
- Reconstructed artifacts need accessible text/alt.

---

## 11. 3D

- **Not installed.** No Three.js, React Three Fiber, Spline, or any other 3D library yet.
- Future 3D is **isolated integration only**, and only if it provides genuine narrative value.
- The architecture (isolated `sections/` + `components/shared` mount points) must allow later 3D insertion **without restructuring** the app.

---

## 12. Current Implementation Status

Done:
- Vite + React scaffold.
- Tailwind v4 CSS-first.
- `@/` path alias (`vite.config.js`, `jsconfig.json`).
- `src/animations/setup.js` — central ScrollTrigger registration.
- Placeholder hooks: `useReducedMotion` (valid), `useSectionProgress` (no-op), `useSmoothScroll` (no-op, Lenis reserved).
- Documentation files (PROJECT_CONTEXT, DESIGN_BIBLE, MEMORY_MOTIFS).

Not yet implemented (per scope guard):
- No UI components, hero, loading screen, navbar, chapters, animations, 3D, or audio player.