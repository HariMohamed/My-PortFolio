import { Cpu, GraduationCap } from "lucide-react";
import { experience } from "../data/experience";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";
import TechChip from "./TechChip";
import { companyLogos, educationLogos } from "../data/logos";

function getInitials(name) {
  return name
    .split(/[\s-]+/)
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-shell" aria-labelledby="experience-heading">
      <SectionTitle
        id="experience-heading"
        eyebrow="Experience"
        title="From frontend development to applied AI."
        description="Roles and training focused on full-stack delivery and AI integration."
      />

      <div className="timeline">
        {experience.map((item, index) => {
          const Icon = item.type === "Education" ? GraduationCap : Cpu;
          return (
            <MotionWrapper
              key={`${item.role}-${item.organization}`}
              delay={index * 0.05}
              className={`timeline-item ${item.type === "Education" ? "timeline-item-edu" : "timeline-item-exp"}`}
            >
              <div className="timeline-marker" aria-hidden="true">
                <Icon />
              </div>
              <div className="timeline-card">
                {item.type === "Education" ? (
                  <div className="timeline-education-header flex flex-col md:flex-row md:items-start gap-4 md:gap-6 mb-6 w-full">
                    {(() => {
                      const logoData = educationLogos[item.organization];
                      if (logoData === undefined) return null;
                      const logos = Array.isArray(logoData) ? logoData : [logoData];
                      const isDual = logos.length > 1;

                      const containerClasses = isDual
                        ? "flex shrink-0 items-center justify-center gap-0 w-[210px] h-[55px] sm:h-[80px]"
                        : "flex shrink-0 items-center justify-center w-auto min-w-[160px] max-w-[200px] h-[90px] sm:h-[140px]";

                      return (
                        <div className={containerClasses}>
                          {logos.map((logoItem, idx) => (
                            <div
                              key={idx}
                              className={`flex h-full min-w-0 items-center justify-center ${
                                idx === 0
                                  ? "flex-[0_0_45%] -translate-x-1"
                                  : "flex-[0_0_55%]"
                              }`}
                            >
                              {logoItem ? (
                                <img
                                  src={typeof logoItem === "string" ? logoItem : logoItem.src}
                                  alt=""
                                  aria-hidden="true"
                                  className="h-full w-full object-contain object-center"
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-surface">
                                  <span className="font-mono text-sm font-bold text-muted">{getInitials(item.organization)}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                    <div className="timeline-education-meta">
                      <div className="timeline-meta-row">
                        <div className="timeline-meta-copy">
                          <p>{item.period}</p>
                          <h3>{item.role}</h3>
                          <span>
                            {item.organization} · {item.location}
                          </span>
                        </div>
                        <span className="timeline-type">{item.type}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="timeline-card-head">
                    <div className="flex items-start gap-4 sm:gap-6 w-full">
                      {(() => {
                        const logoData = companyLogos[item.organization];
                        if (logoData === undefined) return null;
                        const logos = Array.isArray(logoData) ? logoData : [logoData];
                        const logoClasses = logos.some((logo) => logo?.size === "large")
                          ? "mt-1 flex shrink-0 items-center justify-center w-[120px] sm:w-[140px] h-[75px] sm:h-[85px]"
                          : "mt-1 flex shrink-0 items-center justify-center w-[64px] sm:w-[88px] h-[56px] sm:h-[72px]";

                        return (
                          <div className="flex gap-4">
                            {logos.map((logoItem, idx) => (
                              <div key={idx} className={logoClasses}>
                                {logoItem ? (
                                  <img
                                    src={typeof logoItem === "string" ? logoItem : logoItem.src}
                                    alt=""
                                    aria-hidden="true"
                                    className="h-full w-full object-contain object-center"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center rounded-md border border-border bg-surface">
                                    <span className="font-mono text-base font-bold text-muted">{getInitials(item.organization)}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                      <div className="flex-1 min-w-0">
                        <p>{item.period}</p>
                        <h3>{item.role}</h3>
                        <span>
                          {item.organization} · {item.location}
                        </span>
                      </div>
                    </div>
                    <span className="timeline-type">{item.type}</span>
                  </div>
                )}
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="chip-row">
                  {item.technologies.map((tech) => (
                    <TechChip key={tech} tech={tech} />
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
