# Cyber Portfolio

A terminal-style cybersecurity portfolio built with **React + Vite**.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

## Make it yours

All your content lives in `src/data/`. You rarely need to touch components.

| File | What to edit |
| --- | --- |
| `src/data/profile.js` | Name, handle, roles, bio, stats, email, social links |
| `src/data/skills.js` | Skill groups, percentages, tools list |
| `src/data/projects.js` | Your projects (name, summary, tags, repo/demo links) |
| `src/data/timeline.js` | Certifications, education, achievements |
| `src/styles/variables.css` | Colors and fonts |

## Folder structure

```
cyber-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── public/                  static files (favicon)
└── src/
    ├── main.jsx             entry point, loads the CSS
    ├── App.jsx              page layout: assembles the sections
    ├── components/
    │   ├── layout/          Navbar, Footer, Section wrapper
    │   ├── sections/        Hero, About, Skills, Projects, Timeline, ShellSection, Contact
    │   ├── terminal/        BootTerminal, PacketCapture, InteractiveTerminal, commands.js
    │   └── ui/              TerminalWindow, SectionHeading, GlitchText, StatusBadge
    ├── data/                all your editable content
    ├── hooks/               useTypewriter, useInView, useReducedMotion
    ├── utils/               packets.js (simulated packet generator)
    └── styles/              variables, base, layout, terminal, sections
```

## Add a command to the interactive shell

Open `src/components/terminal/commands.js`, add an entry to the `commands` object
and its name to `COMMAND_NAMES` (for Tab completion).

## Deploy

Push to GitHub and import the repo in Vercel or Netlify (build command `npm run build`,
output directory `dist`). GitHub Pages also works: set `base` in `vite.config.js` to your repo name.

## Notes

- The packet capture is simulated. It never reads real network traffic.
- Animations respect `prefers-reduced-motion`.
