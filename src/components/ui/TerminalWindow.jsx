/** Window chrome used by every panel on the site. */
export default function TerminalWindow({ title, children, className = "", bodyClassName = "" }) {
  return (
    <section className={`window ${className}`}>
      <header className="window__bar">
        <span className="window__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="window__title">{title}</span>
      </header>
      <div className={`window__body ${bodyClassName}`}>{children}</div>
    </section>
  );
}
