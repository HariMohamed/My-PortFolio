import { Cpu, GraduationCap } from "lucide-react";
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

export default function Timeline({ id, eyebrow, title, description, items }) {
  return (
    <section id={id} className="section-shell" aria-labelledby={`${id}-heading`}>
      <SectionTitle
        id={`${id}-heading`}
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
      />

      <div className="timeline">
        {items.map((item, index) => {
          const Icon = item.type === "Education" ? GraduationCap : Cpu;
          return (
            <MotionWrapper
              key={`${item.role}-${item.organization}`}
              delay={index * 0.05}
              className={`timeline-item ${index % 2 === 0 ? "timeline-item-left" : "timeline-item-right"}`}
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
                        ? "flex shrink-0 items-center justify-center gap-2 w-full max-w-[14rem] h-14 sm:h-20"
                        : "flex shrink-0 items-center justify-center w-full max-w-[10rem] h-16 sm:h-24";

                      return (
                        <div className={containerClasses}>
                          {logos.map((logoItem, idx) => (
                            <div
                              key={idx}
                              className="flex h-full flex-1 min-w-0 items-center justify-center"
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
                                <div className="flex h-12 w-12 items-center justify-center rounded-md shadow-[var(--inset-border)] bg-surface">
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
                          ? "mt-1 flex shrink-0 items-center justify-center max-w-[8rem] sm:max-w-[9rem] w-full h-[75px] sm:h-[85px]"
                          : "mt-1 flex shrink-0 items-center justify-center max-w-[4rem] sm:max-w-[5.5rem] w-full h-[56px] sm:h-[72px]";

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
                                  <div className="flex h-full w-full items-center justify-center rounded-md shadow-[var(--inset-border)] bg-surface">
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
