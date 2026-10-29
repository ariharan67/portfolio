/** Name display with a short glitch on hover/focus (CSS only, see effects.css). */
export default function GlitchText({ text, as: Tag = "span" }) {
  return (
    <Tag className="glitch" data-text={text}>
      {text}
    </Tag>
  );
}
