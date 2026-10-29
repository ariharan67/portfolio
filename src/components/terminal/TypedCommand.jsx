import { useEffect, useRef } from "react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/** A prompt line that types its command, then calls onDone. */
export default function TypedCommand({ user, host = "kali", text, delay = 300, speed = 55, onDone }) {
  const reduced = useReducedMotion();
  const doneRef = useRef(false);
  const { shown, done } = useTypewriter(text, {
    speed,
    delay,
    enabled: !reduced,
    onDone: () => {
      if (!doneRef.current) {
        doneRef.current = true;
        if (onDone) onDone();
      }
    },
  });

  useEffect(() => {
    if (reduced && !doneRef.current) {
      doneRef.current = true;
      if (onDone) onDone();
    }
  }, [reduced, onDone]);

  const visible = reduced ? text : shown;
  const finished = reduced || done;

  return (
    <p className="line">
      <span className="prompt-user">{user}@{host}</span>
      <span className="prompt-sep">:~$</span> <span className="line__cmd">{visible}</span>
      {!finished ? <span className="cursor" aria-hidden="true" /> : null}
    </p>
  );
}
