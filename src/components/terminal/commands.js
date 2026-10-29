import { profile } from "../../data/profile";
import { skillGroups, toolbelt } from "../../data/skills";
import { projects } from "../../data/projects";
import { timeline } from "../../data/timeline";

// Each command returns { lines: [{ text, tone?, href? }], clear?: true }
// tone: "dim" | "ok" | "warn" | "alert" | "accent"

const out = (...texts) => ({ lines: texts.map((text) => ({ text })) });
const tone = (text, t) => ({ text, tone: t });

const FILES = {
  "about.md": () => profile.bio.map((text) => ({ text })),
  "skills.txt": () =>
    skillGroups.flatMap((g) => [tone(`[${g.title}]`, "accent"), ...g.skills.map((s) => ({ text: `  ${s.name}` }))]),
  "projects.md": () => projects.map((p) => ({ text: `${p.name}: ${p.summary}` })),
  "contact.txt": () => [
    { text: `email: ${profile.email}` },
    ...profile.socials.map((s) => ({ text: `${s.label}: ${s.url}`, href: s.url })),
  ],
};
const HIDDEN = { ".flag": () => [tone("flag{curious_people_make_good_hackers}", "ok"), tone("Nice find. Say hi through the contact form.", "dim")] };

export const COMMAND_NAMES = [
  "help", "whoami", "about", "skills", "projects", "certs", "contact", "socials",
  "ls", "cat", "nmap", "ping", "date", "echo", "sudo", "clear",
];

const commands = {
  help: () => ({
    lines: [
      tone("Available commands:", "accent"),
      { text: "  about       who I am" },
      { text: "  skills      what I can do" },
      { text: "  projects    things I've built" },
      { text: "  certs       certifications and education" },
      { text: "  contact     how to reach me" },
      { text: "  ls, cat     browse my files (try ls -a)" },
      { text: "  nmap, ping  run a harmless scan on this site" },
      { text: "  clear       clear the screen" },
      tone("Tab completes commands. Arrow up repeats the last one.", "dim"),
    ],
  }),

  whoami: () => out(`${profile.name} (${profile.handle}), ${profile.role}`),

  about: () => ({ lines: FILES["about.md"]() }),

  skills: () => ({
    lines: [
      ...skillGroups.flatMap((g) => [
        tone(`[${g.title}]`, "accent"),
        ...g.skills.map((s) => {
          const filled = Math.round(s.level / 10);
          return { text: `  ${s.name.padEnd(34)} ${"#".repeat(filled)}${".".repeat(10 - filled)} ${s.level}%` };
        }),
      ]),
      tone(`tools: ${toolbelt.join(", ")}`, "dim"),
    ],
  }),

  projects: () => ({
    lines: projects.flatMap((p) => [
      tone(`${p.name}  (${p.status})`, "accent"),
      { text: `  ${p.summary}` },
      { text: `  ${p.repo}`, href: p.repo },
    ]),
  }),

  certs: () => ({
    lines: timeline.map((t) => ({ text: `${t.date.padEnd(16)} ${t.title}, ${t.place}` })),
  }),

  contact: () => ({ lines: FILES["contact.txt"]() }),
  socials: () => ({ lines: FILES["contact.txt"]() }),

  ls: (args) => {
    const all = args.includes("-a") || args.includes("-la") || args.includes("-al");
    const names = [...Object.keys(FILES), ...(all ? Object.keys(HIDDEN) : [])];
    return out(names.join("   "));
  },

  cat: (args) => {
    const name = args[0];
    if (!name) return { lines: [tone("usage: cat <file>", "warn")] };
    const reader = FILES[name] || HIDDEN[name];
    if (!reader) return { lines: [tone(`cat: ${name}: No such file or directory`, "alert")] };
    return { lines: reader() };
  },

  nmap: () => ({
    lines: [
      tone("Starting Nmap against localhost (this site only)...", "dim"),
      { text: "PORT      STATE   SERVICE" },
      { text: "443/tcp   open    https" },
      { text: "22/tcp    closed  ssh" },
      { text: "3389/tcp  closed  ms-wbt-server" },
      tone("Nmap done: 1 host up. Nothing interesting. Nice try.", "ok"),
    ],
  }),

  ping: () => ({
    lines: [
      { text: "64 bytes from portfolio: icmp_seq=1 ttl=64 time=0.042 ms" },
      { text: "64 bytes from portfolio: icmp_seq=2 ttl=64 time=0.039 ms" },
      tone("2 packets transmitted, 2 received, 0% packet loss", "ok"),
    ],
  }),

  date: () => out(new Date().toString()),

  echo: (args) => out(args.join(" ")),

  sudo: () => ({
    lines: [tone(`${profile.handle} is not in the sudoers file. This incident will be reported.`, "alert")],
  }),

  clear: () => ({ lines: [], clear: true }),
};

export function execute(raw) {
  const input = raw.trim();
  if (!input) return { lines: [] };
  const [name, ...args] = input.split(/\s+/);
  const handler = commands[name.toLowerCase()];
  if (!handler) {
    return { lines: [tone(`${name}: command not found. Type 'help' to see what works.`, "warn")] };
  }
  return handler(args);
}

export const WELCOME = [
  { text: "Interactive shell. Type 'help' to see what you can run.", tone: "dim" },
];
