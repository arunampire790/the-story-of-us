// Semantic keyboard-accessible trigger for entering the story.
// Real <button>: supports Enter + Space natively. Restrained editorial text:
// no rectangular border by default; a subtle underline appears on hover and
// focus. Focus-visible remains clearly accessible via the global style.
export default function BeginTrigger({ beginButtonRef, onClick }) {
  return (
    <button
      ref={beginButtonRef}
      type="button"
      onClick={onClick}
      className="loading-begin group font-metadata inline-block cursor-pointer text-lg tracking-[0.3em] text-text transition-colors duration-200 hover:text-accent"
    >
      <span className="inline-block border-b border-transparent pb-0.5 group-hover:border-accent group-focus-visible:border-accent">
        begin
      </span>
    </button>
  )
}