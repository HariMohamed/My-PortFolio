import { skillGroups } from "../data/skills";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";


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
            <ul className="mt-4 flex flex-col gap-2 text-muted">
              {group.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/50" aria-hidden="true" />
                  <span className="font-medium text-text">{skill}</span>
                </li>
              ))}
            </ul>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
}
