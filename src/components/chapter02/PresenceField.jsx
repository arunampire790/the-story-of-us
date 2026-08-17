// PRESENCE FIELD — Chapter 02 persistent room environment.
// Lives inside the chapter's sticky, full-viewport room window: very dark warm
// near-black base with a subtle vertical depth falloff (the back wall recedes)
// and a soft room glow brightened by the master timeline as the presence draws
// near. Purely decorative (aria-hidden). Global grain stays above via
// Atmosphere. No photo, no particles, no blobs, no generic glow pile-up.
export default function PresenceField() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      role="presentation"
    >
      {/* NO opaque full-bleed base: the cinematic base (body #0b0a08 + global
          ambient-light + vignette + grain) is the single continuous source of
          the black/brown grading, mounted once at the app root. If this field
          painted its own opaque layer it would sit above the global ambient in
          main's z-10 context and hide it, creating a hard tonal seam at the
          chapter boundary. Only semi-transparent local atmosphere (glow/atmo)
          is added here so the base film runs uninterrupted across chapters.
          Transform stays Tailwind-owned. */}

      {/* room glow — GSAP animates opacity only (transform stays Tailwind-owned) */}
      <div
        data-presence="glow"
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: 0.35,
          background:
            'radial-gradient(circle, rgba(200,161,101,0.16), rgba(200,161,101,0.03) 55%, transparent 72%)',
        }}
      />

      {/* atmospheric memory layer — CSS gradient wash, lit by the master timeline. */}
      <div
        data-presence="atmo"
        className="absolute inset-0 overflow-hidden"
        style={{
          opacity: 0.12,
          background:
            'radial-gradient(45% 50% at 50% 28%, rgba(200,161,101,0.10), transparent 60%), ' +
            'radial-gradient(60% 45% at 70% 100%, rgba(138,160,184,0.06), transparent 65%), ' +
            'linear-gradient(180deg, transparent 0%, rgba(11,10,8,0.35) 100%)',
        }}
      />
    </div>
  )
}