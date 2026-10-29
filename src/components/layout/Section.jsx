/** Wrapper that gives every section a consistent id (for nav anchors) and spacing. */
export default function Section({ id, children, className = "" }) {
  return (
    <section id={`${id}-section`} className={`section ${className}`} aria-labelledby={id}>
      <div className="container">{children}</div>
    </section>
  );
}
