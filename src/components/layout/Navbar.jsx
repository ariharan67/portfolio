import { useEffect, useState } from "react";
import { profile } from "../../data/profile";

const LINKS = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "timeline", label: "timeline" },
  { id: "shell", label: "shell" },
  { id: "contact", label: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Highlight the link of the section currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(`${id}-section`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top" onClick={close}>
          <span className="prompt-user">{profile.handle}</span>
          <span className="prompt-sep">@portfolio</span>
        </a>

        <button
          type="button"
          className="nav__toggle btn btn--small"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav id="nav-links" className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}-section`}
              className={active === `${l.id}-section` ? "is-active" : ""}
              aria-current={active === `${l.id}-section` ? "true" : undefined}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
