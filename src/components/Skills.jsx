import { skillGroups } from "../data/skills";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";
import TechChip from "./TechChip";

export default function Skills() {
  return (
    <section id="skills" className="section-shell section-band" aria-labelledby="skills-heading">
      <SectionTitle
        id="skills-heading"
        eyebrow="Engineering Stack"
        title="Technologies I use to build production systems."
        description="React frontends, Python/FastAPI backends, PostgreSQL databases, AI integrations, and containerized deployment."
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
                <TechChip key={skill} tech={skill} />
              ))}
            </div>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
}
