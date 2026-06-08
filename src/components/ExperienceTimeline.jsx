import { Cpu, GraduationCap } from "lucide-react";
import { experience } from "../data/experience";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell" aria-labelledby="experience-heading">
      <SectionTitle
        id="experience-heading"
        eyebrow="Experience"
        title="Recent delivery path from frontend to applied AI."
        description="A concise timeline with the roles, outcomes, and technologies recruiters need to understand quickly."
      />

      <div className="timeline">
        {experience.map((item, index) => {
          const Icon = item.type === "Education" ? GraduationCap : Cpu;
          return (
            <MotionWrapper
              key={`${item.role}-${item.organization}`}
              delay={index * 0.05}
              className="timeline-item"
            >
              <div className="timeline-marker" aria-hidden="true">
                <Icon />
              </div>
              <div className="timeline-card">
                <div className="timeline-card-head">
                  <div>
                    <p>{item.period}</p>
                    <h3>{item.role}</h3>
                    <span>
                      {item.organization} · {item.location}
                    </span>
                  </div>
                  <span className="timeline-type">{item.type}</span>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="chip-row">
                  {item.technologies.map((tech) => (
                    <span className="chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          );
        })}
      </div>
    </section>
  );
}
