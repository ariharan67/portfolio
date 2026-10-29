import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function RoleCycler({ roles }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || roles.length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [reduced, roles.length]);

  return (
    <p className="role" aria-live="off">
      <span className="role__label">role =</span> <span key={index} className="role__value">{roles[index]}</span>
    </p>
  );
}
