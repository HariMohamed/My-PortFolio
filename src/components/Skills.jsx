import { skillGroups } from "../data/skills";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";

import { techLogos } from "../data/logos";

export default function Skills() {
  return (
    <section id="skills" className="section-shell section-band" aria-labelledby="skills-heading">
      <SectionTitle
        id="skills-heading"
        eyebrow="Capabilities"
        title="Core technologies I work with."
        description="Focused on React frontends, Python/FastAPI backends, PostgreSQL, AI integration, and deployment."
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
                <span key={skill} className="chip gap-2 flex items-center">
                  {techLogos[skill] ? (
                    <img src={techLogos[skill]} alt={skill} title={skill} className="w-4 h-4 object-contain" loading="lazy" decoding="async" />
                  ) : (
                    skill
                  )}
                </span>
              ))}
            </div>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
}
