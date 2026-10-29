import { useEffect, useMemo, useState } from "react";
import TerminalWindow from "../ui/TerminalWindow";
import { makePacket } from "../../utils/packets";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const FILTERS = ["all", "TCP", "TLSv1.3", "DNS", "HTTP", "ICMP", "SSH", "ARP"];
const VISIBLE_ROWS = 9;
const BUFFER = 80;

/** Wireshark-style capture. The packets are simulated: nothing leaves the browser. */
export default function PacketCapture() {
  const reduced = useReducedMotion();
  const [packets, setPackets] = useState(() => Array.from({ length: 10 }, makePacket));
  const [paused, setPaused] = useState(reduced);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setPackets((prev) => [...prev.slice(-(BUFFER - 1)), makePacket()]);
    }, 850);
    return () => clearInterval(id);
  }, [paused]);

  const rows = useMemo(() => {
    const list = filter === "all" ? packets : packets.filter((p) => p.proto === filter);
    return list.slice(-VISIBLE_ROWS);
  }, [packets, filter]);

  const total = packets[packets.length - 1]?.id ?? 0;

  return (
    <TerminalWindow title="capture: eth0 (simulated)" className="capture" bodyClassName="capture__body">
      <div className="capture__tools">
        <label className="capture__filter">
          <span>filter</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter packets by protocol">
            {FILTERS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
        <button type="button" className="btn btn--small" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
          {paused ? "Resume capture" : "Pause capture"}
        </button>
      </div>

      <div className="capture__table" role="table" aria-label="Simulated network packets">
        <div className="capture__row capture__row--head" role="row">
          <span role="columnheader">time</span>
          <span role="columnheader">source</span>
          <span role="columnheader">destination</span>
          <span role="columnheader">proto</span>
          <span role="columnheader">len</span>
          <span role="columnheader">info</span>
        </div>
        {rows.length === 0 ? (
          <p className="capture__empty">No {filter} packets yet. Keep the capture running.</p>
        ) : (
          rows.map((p) => (
            <div key={p.id} className={`capture__row tone-${p.color}`} role="row">
              <span role="cell">{p.time}</span>
              <span role="cell">{p.src}</span>
              <span role="cell">{p.dst}</span>
              <span role="cell" className="capture__proto">{p.proto}</span>
              <span role="cell">{p.length}</span>
              <span role="cell" className="capture__info">{p.info}</span>
            </div>
          ))
        )}
      </div>

      <p className="capture__foot">
        {total} packets captured, {paused ? "paused" : "listening"}
      </p>
    </TerminalWindow>
  );
}
