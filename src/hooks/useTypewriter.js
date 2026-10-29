import { useEffect, useState } from "react";

/** Types `text` one character at a time. Calls onDone once when finished. */
export function useTypewriter(text, { speed = 45, delay = 0, enabled = true, onDone } = {}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          if (onDone) onDone();
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay, enabled]);

  return { shown: text.slice(0, count), done: count >= text.length };
}
