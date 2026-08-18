// CHAPTER 03 — THE LOCK. DECORATIVE FIELD.
//
// A small physical memory lock reconstructed inside the cinematic world — NOT a
// cybersecurity/login/neon UI. This layer is PURELY ambient (aria-hidden): a
// very dark warm pool of light and a soft grounding shadow. The lock OBJECT
// itself (mechanical housing + dial + input chamber) lives in LockCopy so the
// title, object and control sit in one clean vertical hierarchy.
//
// The environment stays near-black; only the lock object carries local
// contrast. No glow, no neon, no warmth bloom.
//
// OPENING (0–15): the ambient pool and shadow establish via the Chapter 03
// scrub timeline (data-lk). Reduced motion: static, fully composed.

export default function LockField() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true" role="presentation">
      {/* warm ambient pool — restrained local contrast, background stays near-black */}
      <div
        data-lk="field"
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            'radial-gradient(85% 65% at 50% 46%, rgba(26,21,15,0.55) 0%, rgba(12,10,8,0.22) 55%, transparent 78%)',
        }}
      />

      {/* grounding shadow — soft dark base beneath the lock */}
      <div
        data-lk="ground"
        className="absolute inset-x-[12%] bottom-[10%] h-[16%]"
        style={{
          opacity: 0,
          background: 'linear-gradient(180deg, transparent, rgba(5,4,3,0.7))',
        }}
      />
    </div>
  )
}