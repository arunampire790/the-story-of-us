// ROOMS FIELD — Chapter 04 "THE ROOM REMEMBERS" (visual rework v4 — final).
//
// PLACE FIRST, LIGHT SECOND. One persistent physical environment seen from one
// fixed camera. A single believable, asymmetric PHYSICAL ANCHOR — a draped
// fabric-covered object — grounds the place so it reads as "a physical place"
// and not "an abstract rectangle on black."
//
//   THE PLACE STAYS.  THE LIGHT CHANGES.  THE MEMORY CHANGES.
//
// The anchor is STATIC (never moved/scaled/rotated); only its readability
// changes, through directional illumination and shadow. Around it the room is
// the minimum: the warm near-black wall plane, faint surface texture, an
// architectural wall-to-floor boundary, and a soft pooled shadow. A soft, wide,
// low-contrast wash illuminates the surfaces (never a dominant beam); a second,
// narrower / opposite-direction signature later reveals a DIFFERENT portion of
// the same anchor — the phone continuation. Narrative copy is carried by the
// sibling NarrativeCopy overlay (not aria-hidden); no timestamp is shown.
//
// Scrub map: 0–20 UNFAMILIAR→DISCOVER · 20–50 FAMILIARITY · 50–58 ESTABLISHED
// · 58–72 JULY 17 → PHONE CONTINUATION · 72–90 QUIET · 90–100
// WITHDRAWAL → DARKNESS.
//
// The wall + floor bases are always present and near-black (continuous with the
// global base, no tonal seam). Purely decorative; aria-hidden.

export default function RoomsField() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      role="presentation"
    >
      {/* the room's receding back wall — warm near-black, always present */}
      <div
        data-room="wall"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(172deg, #16120e 0%, #100c09 32%, #0b0907 58%, #080605 100%)',
        }}
      />

      {/* surface texture — faint vertical seams, revealed only as light rises */}
      <div
        data-room="texture"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'repeating-linear-gradient(90deg, rgba(0,0,0,0.045) 0 1px, transparent 1px 46px)',
        }}
      />

      {/* soft believable shadow pooling toward the floor / under the anchor */}
      <div
        data-room="shadow"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'linear-gradient(180deg, transparent 62%, rgba(3,3,2,0.30) 72%, rgba(4,3,2,0.52) 88%, rgba(3,2,2,0.72) 100%)',
        }}
      />

      {/* the architectural boundary — where the wall meets the floor */}
      <div
        data-room="horizon"
        className="absolute left-0 right-0 top-[68%] h-px"
        style={{
          opacity: 0,
          background:
            'linear-gradient(90deg, transparent 30%, rgba(224,192,138,0.36) 50%, transparent 70%)',
        }}
      />

      {/* THE PHYSICAL ANCHOR — one draped fabric-covered object, asymmetric,
          materially believable, static. Its perceived form changes purely
          through the light/shadow layers that fall across it. */}
      <div
        data-room="anchor"
        className="absolute left-[13%] bottom-[13%] w-[44%]"
        style={{ opacity: 1 }}
      >
        <svg
          viewBox="0 0 400 300"
          preserveAspectRatio="xMinYMax meet"
          className="block w-full"
        >
          <defs>
            <linearGradient id="drape-mat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#211812" />
              <stop offset="45%" stopColor="#150f0b" />
              <stop offset="100%" stopColor="#0a0705" />
            </linearGradient>
          </defs>

          {/* asymmetric draped silhouette — lumpy, not a rectangle */}
          <path
            fill="url(#drape-mat)"
            d="M 62 262
               C 40 258, 42 236, 54 224
               C 74 202, 104 196, 134 186
               C 156 176, 172 168, 192 160
               C 206 154, 220 156, 230 168
               C 242 184, 256 184, 272 190
               C 296 201, 314 206, 330 220
               C 344 232, 352 244, 350 262
               L 62 262 Z"
          />

          {/* interior folds — subtle darker creases for material texture */}
          <path
            fill="none"
            stroke="rgba(0,0,0,0.30)"
            strokeWidth="2"
            strokeLinecap="round"
            d="M 118 196 C 138 190, 158 188, 176 182"
          />
          <path
            fill="none"
            stroke="rgba(0,0,0,0.24)"
            strokeWidth="2"
            strokeLinecap="round"
            d="M 176 176 C 196 168, 214 170, 230 178"
          />
          <path
            fill="none"
            stroke="rgba(0,0,0,0.20)"
            strokeWidth="2"
            strokeLinecap="round"
            d="M 250 192 C 272 202, 290 204, 308 214"
          />
        </svg>
      </div>

      {/* the soft directional light — a wide, low-contrast wash from above.
          It illuminates surfaces and the anchor's top; it is not a beam. */}
      <div
        data-room="light"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'linear-gradient(185deg, rgba(232,214,184,0.26) 0%, rgba(216,183,130,0.08) 40%, rgba(190,152,98,0.02) 62%, transparent 82%)',
        }}
      />

      {/* alternate phone signature — narrower, opposite side; reveals a
          different portion of the SAME anchor. Lower contrast than v2. */}
      <div
        data-room="narrow"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'linear-gradient(235deg, rgba(240,222,194,0.18) 0%, rgba(220,186,132,0.06) 34%, transparent 62%)',
        }}
      />

      {/* restrained directional warmth leaning from the top */}
      <div
        data-room="warm"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'linear-gradient(180deg, rgba(200,161,101,0.08) 0%, rgba(200,161,101,0.02) 45%, transparent 70%)',
        }}
      />
    </div>
  )
}