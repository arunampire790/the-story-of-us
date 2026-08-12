// Minimal className composition helper — no dependency required.
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}