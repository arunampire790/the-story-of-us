// PRESENCE LIGHTS — the geometry that makes the voice room feel alive.
// A two-point presence composition: a narrator/reference point near the bottom
// and the other person's presence near the upper area, linked by one thin
// connecting thread.
//
// The presence is built from TWO co-located static layers — a cool presence and
// a warm presence. Only opacity is animated (crossfade cool → warm), never
// their fill/stroke color (transform/opacity-only rule). The thread's stroke is
// static; its character change is communicated by presence position/opacity.
//
// Decorative SVG only (aria-hidden). No avatars, no usernames.
export default function PresenceLights() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
    >
      {/* one thin connecting thread — stroke stays static */}
      <line
        data-presence="thread"
        x1="50"
        y1="86"
        x2="50"
        y2="32"
        stroke="#2b2720"
        strokeWidth="0.3"
        strokeDasharray="1 0.6"
        style={{ opacity: 0.2 }}
      />

      {/* the other person's presence (transform + opacity only) */}
      <g data-presence="presence" opacity="1">
        {/* cool presence layer (far / fragile) — opacity animates 1 → 0 */}
        <g data-presence="cool" opacity="1">
          <circle cx="50" cy="30" r="7" fill="#8aa0b8" opacity="0.22" />
          <circle cx="50" cy="30" r="1.6" fill="#8aa0b8" opacity="0.8" />
        </g>
        {/* warm presence layer (near / warmth) — opacity animates 0 → 1 */}
        <g data-presence="warm" opacity="0">
          <circle cx="50" cy="30" r="7" fill="#e8b06a" opacity="0.3" />
          <circle cx="50" cy="30" r="1.6" fill="#e8b06a" opacity="0.9" />
        </g>
      </g>

      {/* narrator / reference point */}
      <g data-presence="narrator">
        <circle cx="50" cy="88" r="1.2" fill="#ece7dd" opacity="0.6" />
      </g>
    </svg>
  )
}