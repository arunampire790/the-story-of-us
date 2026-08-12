import { cn } from '../../utils/cn'

// Reusable cinematic section primitive for future story chapters.
// Pure structure only: no story content, no GSAP, no Lenis, no Motion.
//
// <CinematicSection id="..." anchor="..." fullHeight width="cinematic">
//   ...
// </CinematicSection>
export default function CinematicSection({
  id,
  anchor,
  fullHeight = false,
  width = 'readable',
  grid = false,
  as: Tag = 'section',
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      id={id}
      data-anchor={anchor}
      className={cn(
        'relative',
        fullHeight && 'section-full',
        width === 'readable' && 'w-readable',
        width === 'cinematic' && 'w-cinematic',
        grid && 'grid-editorial',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}