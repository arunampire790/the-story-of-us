import { useReducedMotion } from '../../hooks/useReducedMotion'

// Decorative static film-grain overlay.
// CSS-driven (utility `grain-overlay`), non-interactive, pointer-events none.
// Texture file may be absent — the layer simply adds nothing until the atlas
// is generated; the app stays fully functional. Skipped under reduced motion.
export default function Grain() {
  const reduced = useReducedMotion()
  if (reduced) return null
  return <div className="grain-overlay" aria-hidden="true" />
}