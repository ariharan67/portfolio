import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import { timeline } from "../../data/timeline";

export default function Timeline() {
  return (
    <Section id="timeline">
      <SectionHeading id="timeline" command="git log --oneline" note="Certifications, education and milestones, newest first." />
      <ol className="log">
        {timeline.map((item) => (
          <li key={item.id} className={`log__item log__item--${item.kind}`}>
            <span className="log__node" aria-hidden="true">*</span>
            <div className="log__main">
              <p className="log__title">
                {item.title}
                <span className="log__kind">{item.kind}</span>
              </p>
              <p className="log__meta">{item.date}, {item.place}</p>
              <p className="prose log__detail">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
