import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import TerminalWindow from "../ui/TerminalWindow";
import StatusBadge from "../ui/StatusBadge";
import { projects } from "../../data/projects";

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading id="projects" command="ls ~/projects" />
      <div className="projects">
        {projects.map((p) => (
          <TerminalWindow key={p.id} title={`~/projects/${p.name}`} className="project" bodyClassName="project__body">
            <div className="project__top">
              <h3 className="project__name">{p.name}</h3>
              <StatusBadge status={p.status} />
            </div>
            <p className="prose">{p.summary}</p>
            <ul className="tags">
              {p.tags.map((t) => (
                <li key={t}>#{t}</li>
              ))}
            </ul>
            <div className="project__links">
              {p.repo ? (
                <a className="link" href={p.repo} target="_blank" rel="noreferrer noopener">Source code</a>
              ) : null}
              {p.demo ? (
                <a className="link" href={p.demo} target="_blank" rel="noreferrer noopener">Live demo</a>
              ) : null}
            </div>
          </TerminalWindow>
        ))}
      </div>
    </Section>
  );
}
