import BootTerminal from "../terminal/BootTerminal";
import PacketCapture from "../terminal/PacketCapture";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <BootTerminal />
        <PacketCapture />
      </div>
    </section>
  );
}
