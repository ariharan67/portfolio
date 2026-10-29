// Fake but plausible packet generator for the live capture panel.
// Nothing here touches the network: it's purely visual.

const PROTOCOLS = [
  { name: "TCP", weight: 5, color: "ice" },
  { name: "TLSv1.3", weight: 4, color: "phosphor" },
  { name: "DNS", weight: 3, color: "amber" },
  { name: "HTTP", weight: 2, color: "ice" },
  { name: "ARP", weight: 1, color: "dim" },
  { name: "ICMP", weight: 1, color: "alert" },
  { name: "SSH", weight: 2, color: "phosphor" },
];

const HOSTS = [
  "10.0.0.12",
  "10.0.0.37",
  "10.0.0.1",
  "192.168.1.20",
  "192.168.1.254",
  "172.16.4.9",
  "142.250.77.46",
  "104.18.32.7",
  "185.199.108.153",
];

const DNS_NAMES = ["github.com", "tryhackme.com", "hackthebox.com", "owasp.org", "cve.mitre.org"];

const pick = (list) => list[Math.floor(Math.random() * list.length)];

function pickProtocol() {
  const total = PROTOCOLS.reduce((sum, p) => sum + p.weight, 0);
  let roll = Math.random() * total;
  for (const p of PROTOCOLS) {
    roll -= p.weight;
    if (roll <= 0) return p;
  }
  return PROTOCOLS[0];
}

function describe(protocol, src, dst) {
  const port = 1024 + Math.floor(Math.random() * 60000);
  switch (protocol.name) {
    case "TCP": {
      const flags = pick(["[SYN]", "[SYN, ACK]", "[ACK]", "[PSH, ACK]", "[FIN, ACK]"]);
      return `${port} > 443 ${flags}`;
    }
    case "TLSv1.3":
      return pick(["Client Hello", "Server Hello", "Application Data", "Change Cipher Spec"]);
    case "DNS":
      return `Standard query A ${pick(DNS_NAMES)}`;
    case "HTTP":
      return pick(["GET /index.html", "GET /api/status", "HTTP/1.1 200 OK", "POST /login"]);
    case "ARP":
      return `Who has ${dst}? Tell ${src}`;
    case "ICMP":
      return pick(["Echo (ping) request", "Echo (ping) reply"]);
    case "SSH":
      return "Encrypted packet";
    default:
      return "";
  }
}

let counter = 0;

export function makePacket() {
  const protocol = pickProtocol();
  let src = pick(HOSTS);
  let dst = pick(HOSTS);
  while (dst === src) dst = pick(HOSTS);
  counter += 1;
  const now = new Date();
  const time = now.toTimeString().slice(0, 8);
  return {
    id: counter,
    time,
    src,
    dst,
    proto: protocol.name,
    color: protocol.color,
    length: 54 + Math.floor(Math.random() * 1400),
    info: describe(protocol, src, dst),
  };
}
