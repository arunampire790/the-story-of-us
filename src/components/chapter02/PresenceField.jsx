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
      {/* room-depth falloff — starts at the page base (#0b0a08) so the chapter
          enters seamlessly from Chapter 01's closing darkness (no light band /
          hard tonal step at the top edge); depth recedes subtly toward the
          bottom, led by the glow/atmo layers, not a boundary line. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0b0a08 0%, #0b0a08 65%, #0d0b09 100%)',
        }}
      />

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