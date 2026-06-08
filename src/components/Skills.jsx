import { skillGroups } from "../data/skills";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";

export default function Skills() {
  return (
    <section id="skills" className="section-shell section-band" aria-labelledby="skills-heading">
      <SectionTitle
        id="skills-heading"
        eyebrow="Capabilities"
        title="Grouped skills, no fake progress bars."
        description="The stack is organized around practical product delivery: interfaces, APIs, AI integrations, databases, deployment, and team tools."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <MotionWrapper
            key={group.title}
            delay={index * 0.04}
            className="skill-card"
          >
            <h3>{group.title}</h3>
            <div className="chip-row">
              {group.skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
}
