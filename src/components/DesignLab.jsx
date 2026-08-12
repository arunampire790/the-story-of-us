/* ---------------------------------------------------------------------------
   DESIGN LAB — temporary development-only page.
   NOT part of the final story. Not the Hero. Not a chapter.
   Demonstrates the Phase 3A visual foundation with static neutral content.
   Remove after visual approval (see App.jsx).
--------------------------------------------------------------------------- */

const COLOR_SWATCHES = [
  { token: '--color-bg', label: 'background' },
  { token: '--color-surface', label: 'surface' },
  { token: '--color-surface-muted', label: 'surface-muted' },
  { token: '--color-ambient', label: 'ambient' },
  { token: '--color-text', label: 'text' },
  { token: '--color-text-muted', label: 'text-muted' },
  { token: '--color-accent', label: 'accent' },
  { token: '--color-accent-warm', label: 'accent-warm' },
  { token: '--color-accent-cool', label: 'accent-cool' },
  { token: '--color-border', label: 'border' },
  { token: '--color-border-muted', label: 'border-muted' },
]

const SPACING_SCALE = [
  { token: '--spacing-0', label: '0', value: 0 },
  { token: '--spacing-1', label: '1', value: 4 },
  { token: '--spacing-2', label: '2', value: 8 },
  { token: '--spacing-4', label: '4', value: 16 },
  { token: '--spacing-6', label: '6', value: 24 },
  { token: '--spacing-8', label: '8', value: 32 },
  { token: '--spacing-12', label: '12', value: 48 },
  { token: '--spacing-16', label: '16', value: 64 },
  { token: '--spacing-24', label: '24', value: 96 },
]

function Swatch({ token, label }) {
  return (
    <div className="flex items-center gap-3 border border-border bg-surface p-2">
      <span
        aria-hidden="true"
        className="h-10 w-10 shrink-0 border border-border-muted"
        style={{ backgroundColor: `var(${token})` }}
      />
      <span className="font-metadata text-[0.7rem] uppercase tracking-widest text-text-muted">
        {label}
      </span>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <h2 className="font-metadata text-xs uppercase tracking-[0.3em] text-accent">
      {children}
    </h2>
  )
}

export default function DesignLab() {
  return (
    <>
      {/* Atmosphere layers applied globally so the lab shows the real world. */}
      <div className="ambient-light" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      <section className="section-full">
        <div className="w-cinematic px-6 py-24">
          <p className="font-metadata mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            Design Lab — Phase 3A foundation
          </p>
          <h1 className="font-display text-5xl font-medium leading-none text-text sm:text-7xl">
            The System of Record
          </h1>
          <p className="mt-8 max-w-md font-body text-base leading-relaxed text-text-muted">
            A deliberately restrained visual base. Dark, warm, editorial.
            Built from semantic tokens — replaceable without touching the
            page.
          </p>
          <button type="button" className="mt-10 inline-flex items-center gap-2 border border-border px-5 py-3 font-metadata text-xs uppercase tracking-widest text-text transition-colors hover:border-accent hover:text-accent">
            Focus test — press Tab
          </button>
        </div>
      </section>

      <main className="relative w-cinematic px-6 py-24">
        <div className="grid grid-cols-1 gap-16">

          {/* 1. COLOR SYSTEM */}
          <section aria-label="Color system">
            <SectionLabel>Color system</SectionLabel>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {COLOR_SWATCHES.map((c) => (
                <Swatch key={c.label} token={c.token} label={c.label} />
              ))}
            </div>
          </section>

          {/* 2. TYPOGRAPHY */}
          <section aria-label="Typography">
            <SectionLabel>Typography</SectionLabel>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <p className="font-metadata mb-2 text-xs uppercase tracking-widest text-text-muted">
                    Display — Cormorant Garamond
                  </p>
                  <p className="font-display text-6xl leading-tight text-text">
                    Nights by the signal
                  </p>
                </div>
                <div>
                  <p className="font-metadata mb-2 text-xs uppercase tracking-widest text-text-muted">
                    Heading — Cormorant Garamond
                  </p>
                  <p className="font-heading text-3xl leading-snug text-text">
                    A place that no longer has a name
                  </p>
                </div>
                <div>
                  <p className="font-metadata mb-2 text-xs uppercase tracking-widest text-text-muted">
                    Quote — Cormorant Garamond italic
                  </p>
                  <p className="font-quote text-2xl font-normal italic leading-relaxed text-accent-warm">
                    “To be read slowly, like a letter that was never sent.”
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="font-metadata mb-2 text-xs uppercase tracking-widest text-text-muted">
                    Body — Inter
                  </p>
                  <p className="max-w-md font-body text-base leading-relaxed text-text">
                    The record keeps the small things. Not the confession alone,
                    but the silence after it; not the arrival, but the station
                    before dawn. Precision, not sentiment.
                  </p>
                </div>
                <div>
                  <p className="font-metadata mb-2 text-xs uppercase tracking-widest text-text-muted">
                    Metadata — Inter uppercase
                  </p>
                  <p className="font-metadata text-xs uppercase tracking-[0.25em] text-text-muted">
                    Platform 01 · 04:00 · LTT — KOVILPATTI
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. EDITORIAL GRID */}
          <section aria-label="Editorial grid">
            <SectionLabel>Editorial grid — 12 columns → 1 column</SectionLabel>
            <div className="mt-6 grid-editorial gap-y-3">
              <div className="col-span-4 min-h-20 border border-border bg-surface-muted p-4 font-metadata text-xs text-text-muted">
                col-span-4
              </div>
              <div className="col-span-4 min-h-20 border border-border bg-surface-muted p-4 font-metadata text-xs text-text-muted">
                col-span-4
              </div>
              <div className="col-span-4 min-h-20 border border-border bg-surface-muted p-4 font-metadata text-xs text-text-muted">
                col-span-4
              </div>
              <div className="col-span-6 min-h-20 border border-border bg-surface-muted p-4 font-metadata text-xs text-text-muted">
                col-span-6
              </div>
              <div className="col-span-6 min-h-20 border border-border bg-surface-muted p-4 font-metadata text-xs text-text-muted">
                col-span-6
              </div>
              <div className="col-span-8 min-h-20 border border-border bg-surface-muted p-4 font-metadata text-xs text-text-muted">
                col-span-8
              </div>
              <div className="col-span-4 min-h-20 border border-border bg-surface-muted p-4 font-metadata text-xs text-text-muted">
                col-span-4
              </div>
              <div className="col-span-12 min-h-20 border border-border bg-surface-muted p-4 font-metadata text-xs text-text-muted">
                col-span-12
              </div>
            </div>
          </section>

          {/* 4. ATMOSPHERE */}
          <section aria-label="Atmosphere layers">
            <SectionLabel>Atmosphere — layer model</SectionLabel>
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              <AtmosphereCard label="Layer 0 · background / ambient" className="bg-bg" note="semantic background + fixed ambient-light (live on this page)" />
              <AtmosphereCard label="Layer 10 · content" className="bg-surface" note="future sections render here" />
              <AtmosphereCard label="Layer 20 · vignette" className="bg-bg" note="radial darkening at edges (live on this page)" />
              <AtmosphereCard label="Layer 30 · grain" className="bg-bg" note="static overlay, pointer-events none (texture pending)" />
            </div>
          </section>

          {/* 5. SPACING */}
          <section aria-label="Spacing scale">
            <SectionLabel>Spacing scale (px, base 4)</SectionLabel>
            <div className="mt-6 space-y-3">
              {SPACING_SCALE.map((s) => (
                <div key={s.token} className="flex items-center gap-4">
                  <span className="w-10 shrink-0 font-metadata text-xs text-text-muted">
                    {s.label}
                  </span>
                  <span className="h-4 bg-accent" style={{ width: s.value === 0 ? 2 : s.value }} />
                  <span className="font-metadata text-[0.7rem] uppercase tracking-widest text-text-muted">
                    {s.token}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. FULLSCREEN SECTION */}
          <section section-full aria-label="Fullscreen section">
            <div className="flex min-h-svh flex-col items-center justify-center text-center">
              <SectionLabel>Fullscreen canvas</SectionLabel>
              <h3 className="mt-4 font-display text-5xl font-medium leading-tight text-text">
                100svh
              </h3>
              <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-text-muted">
                A cinematic full-viewport section, vertically centered.
              </p>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}

function AtmosphereCard({ label, className, note }) {
  return (
    <div className={`relative overflow-hidden border border-border p-6 ${className}`}>
      <div className="relative">
        <p className="font-metadata text-xs uppercase tracking-widest text-accent">{label}</p>
        <p className="mt-2 font-body text-xs leading-relaxed text-text-muted">{note}</p>
      </div>
    </div>
  )
}