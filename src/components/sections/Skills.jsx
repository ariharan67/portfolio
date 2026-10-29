import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import TerminalWindow from "../ui/TerminalWindow";
import { skillGroups, toolbelt } from "../../data/skills";
import { useInView } from "../../hooks/useInView";

function SkillGroup({ group }) {
  const [ref, inView] = useInView();
  return (
    <TerminalWindow title={`skills/${group.id}`} className="skillgroup">
      <ul className="skills" ref={ref}>
        {group.skills.map((skill) => (
          <li key={skill.name} className="skill">
            <div className="skill__head">
              <span>{skill.name}</span>
              <span className="skill__pct">{skill.level}%</span>
            </div>
            <div
              className="skill__track"
              role="progressbar"
              aria-label={skill.name}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={skill.level}
            >
              <div className="skill__fill" style={{ width: inView ? `${skill.level}%` : "0%" }} />
            </div>
          </li>
        ))}
      </ul>
    </TerminalWindow>
  );
}

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading id="skills" command="ls -l skills/" note="Self-assessed. I add to this as I learn." />
      <div className="skills-grid">
        {skillGroups.map((g) => (
          <SkillGroup key={g.id} group={g} />
        ))}
      </div>
      <div className="toolbelt">
        <p className="toolbelt__label">Tools I use</p>
        <ul className="toolbelt__list">
          {toolbelt.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
