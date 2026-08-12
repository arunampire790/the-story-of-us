import Grain from './Grain'

// Global decorative atmosphere composer, mounted once at the app root.
// Approved z-index contract:
//   0   background / ambient
//   10  content
//   20  vignette
//   30  grain
// Ambient + vignette render always; the reduced-motion CSS in
// src/styles/index.css zeroes their opacity, and Grain gates itself.
export default function Atmosphere() {
  return (
    <>
      <div className="ambient-light" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Grain />
    </>
  )
}