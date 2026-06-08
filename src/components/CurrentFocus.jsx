import { Bot, BrainCircuit, GitBranch, Radar, Rocket, Workflow } from "lucide-react";
import { currentFocus } from "../data/skills";
import MotionWrapper from "./MotionWrapper";
import SectionTitle from "./SectionTitle";

const icons = [Bot, Radar, GitBranch, BrainCircuit, Workflow, Rocket];

export default function CurrentFocus() {
  return (
    <section className="section-shell section-band" aria-labelledby="focus-heading">
      <SectionTitle
        id="focus-heading"
        eyebrow="Current Focus"
        title="Where the portfolio is pointing next."
        description="These are the systems I am actively deepening to build more valuable AI products and automation workflows."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentFocus.map((item, index) => {
          const Icon = icons[index] || Bot;
          return (
            <MotionWrapper
              key={item}
              delay={index * 0.04}
              className="focus-card"
            >
              <Icon aria-hidden="true" />
              <span>{item}</span>
            </MotionWrapper>
          );
        })}
      </div>
    </section>
  );
}
