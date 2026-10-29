import { useEffect, useRef, useState } from "react";
import TerminalWindow from "../ui/TerminalWindow";
import { COMMAND_NAMES, WELCOME, execute } from "./commands";
import { profile } from "../../data/profile";

const QUICK = ["help", "about", "skills", "projects", "contact"];
let uid = 0;
const withId = (line) => ({ ...line, id: (uid += 1) });

export default function InteractiveTerminal() {
  const [lines, setLines] = useState(() => WELCOME.map((l) => withId({ ...l, kind: "out" })));
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Keep the newest output in view without scrolling the whole page.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (command) => {
    const result = execute(command);
    setLines((prev) => {
      if (result.clear) return [];
      const echoed = withId({ kind: "in", text: command });
      const outputs = result.lines.map((l) => withId({ ...l, kind: "out" }));
      return [...prev, echoed, ...outputs];
    });
    if (command.trim()) setHistory((h) => [...h, command]);
    setCursor(-1);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    run(value);
    setValue("");
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (cursor === -1) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      const match = COMMAND_NAMES.filter((c) => c.startsWith(value.toLowerCase()));
      if (value && match.length === 1) setValue(match[0]);
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <TerminalWindow title={`${profile.handle}@kali: ~/portfolio`} className="shell" bodyClassName="shell__body">
      <div className="shell__scroll" ref={scrollRef} role="log" aria-label="Terminal output" onClick={() => inputRef.current?.focus()}>
        {lines.map((l) =>
          l.kind === "in" ? (
            <p className="line" key={l.id}>
              <span className="prompt-user">{profile.handle}@kali</span>
              <span className="prompt-sep">:~$</span> <span className="line__cmd">{l.text}</span>
            </p>
          ) : (
            <p className={`line line--out ${l.tone ? `tone-${l.tone}` : ""}`} key={l.id}>
              {l.href ? (
                <a href={l.href} target="_blank" rel="noreferrer noopener">{l.text}</a>
              ) : (
                l.text
              )}
            </p>
          )
        )}

        <form className="shell__form" onSubmit={onSubmit}>
          <label htmlFor="shell-input" className="shell__prompt">
            <span className="prompt-user">{profile.handle}@kali</span>
            <span className="prompt-sep">:~$</span>
          </label>
          <input
            id="shell-input"
            ref={inputRef}
            className="shell__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Type a command"
          />
        </form>
      </div>

      <div className="shell__quick" aria-label="Quick commands">
        {QUICK.map((c) => (
          <button type="button" key={c} className="btn btn--small" onClick={() => run(c)}>
            {c}
          </button>
        ))}
        <button type="button" className="btn btn--small" onClick={() => setLines([])}>
          clear
        </button>
      </div>
    </TerminalWindow>
  );
}
