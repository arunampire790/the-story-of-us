// MESSAGE FIELD — Chapter 03 persistent conversation environment.
// Continues Chapter 02's PresenceLights connection-thread language into the
// reconstructed-message record: one thin thread runs the height of the chapter,
// steady and warm, with a soft field glow — NOT the Chapter 02 room scene, and
// NOT a chat UI. The beats scroll over it like a record on an axis.
//
// Purely decorative (aria-hidden). Global grain stays above via Atmosphere.
// No cards, no bubbles, no avatars, no platform logos.
export default function MessageField() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      role="presentation"
    >
      {/* NO opaque full-bleed base: the cinematic base (body #0b0a08 + global
          ambient-light + vignette + grain) is mounted once at the app root and
          is the single continuous source of the black/brown grading. Painting
          an opaque local base here would hide the global ambient in main's
          z-10 context and re-introduce a hard tonal seam at the boundary. Only
          semi-transparent local atmosphere (field glow + thread) is added so
          the base film runs uninterrupted and overlaps the previous chapter's
          atmosphere gradually. */}

      {/* field glow — a faint warm presence behind the thread, lit by master */}
      <div
        data-msg="fieldGlow"
        className="absolute left-1/2 top-1/3 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: 0.3,
          background:
            'radial-gradient(circle, rgba(200,161,101,0.12), rgba(200,161,101,0.03) 55%, transparent 72%)',
        }}
      />

      {/* the connection thread — recedes from the voice room, then runs steady */}
      <div
        data-msg="thread"
        className="absolute left-1/2 top-[5%] h-[90%] w-px -translate-x-1/2"
        style={{
          opacity: 0.2,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(43,39,32,0) 8%, rgba(200,161,101,0.28) 45%, rgba(200,161,101,0.18) 100%)',
        }}
      />
    </div>
  )
}