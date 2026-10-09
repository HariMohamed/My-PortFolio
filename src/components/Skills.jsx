import { useState } from "react";
import { stackLogos } from "../data/logos";
import { skillGroups } from "../data/skills";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";

// Decorative: the skill name is always rendered next to the mark.
function StackLogo({ skill }) {
  const [failed, setFailed] = useState(false);
  const src = stackLogos[skill];

  return (
    <span className="stack-logo" aria-hidden="true">
      {src && !failed ? (
        <img src={src} alt="" width="16" height="16" loading="lazy" decoding="async" onError={() => setFailed(true)} />
      ) : (
        <span className="stack-logo-fallback" />
      )}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-shell section-band" aria-labelledby="skills-heading">
      <SectionTitle
        id="skills-heading"
        eyebrow="Engineering Stack"
        title="Technologies I use to build web applications."
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
            <ul className="mt-4 flex flex-col gap-2.5 text-muted">
              {group.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3">
                  <StackLogo skill={skill} />
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
