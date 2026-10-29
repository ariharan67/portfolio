import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import TerminalWindow from "../ui/TerminalWindow";
import { profile } from "../../data/profile";

export default function About() {
  return (
    <Section id="about">
      <SectionHeading id="about" command="cat about.md" />
      <div className="about">
        <TerminalWindow title="about.md" bodyClassName="about__body">
          {profile.bio.map((paragraph) => (
            <p key={paragraph} className="prose">{paragraph}</p>
          ))}
        </TerminalWindow>

        <TerminalWindow title="whois" bodyClassName="about__facts">
          <dl className="facts">
            <div><dt>location</dt><dd>{profile.location}</dd></div>
            <div><dt>studying</dt><dd>{profile.university}</dd></div>
            {profile.stats.map((s) => (
              <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
            ))}
          </dl>
        </TerminalWindow>
      </div>
    </Section>
  );
}
