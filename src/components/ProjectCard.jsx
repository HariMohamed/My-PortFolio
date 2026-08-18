import { ArrowUpRight, Github, Route } from "lucide-react";
import { Link } from "react-router-dom";
import MotionWrapper from "./MotionWrapper";
import TechChip from "./TechChip";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <MotionWrapper delay={index * 0.05} hover className="project-card">
      <div className="project-card-top">
        <div>
          <p className="project-meta">
            {project.period} · {project.category}
          </p>
          <h3>{project.title}</h3>
        </div>
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <p className="project-summary">{project.summary}</p>

      <div className="chip-row mt-2">
        {project.stack.slice(0, 4).map((tech) => (
          <TechChip key={tech} tech={tech} />
        ))}
      </div>

      <div className="project-actions">
        {project.links.live ? (
          <a className="text-link font-bold text-text hover:text-accent" href={project.links.live} target="_blank" rel="noreferrer">
            <ArrowUpRight aria-hidden="true" />
            Live Demo
          </a>
        ) : null}
        <Link className="text-link" to={project.links.caseStudy}>
          <Route aria-hidden="true" />
          Case study
        </Link>
        {project.links.github ? (
          <a className="text-link" href={project.links.github} target="_blank" rel="noreferrer">
            <Github aria-hidden="true" />
            Source Code
          </a>
        ) : null}
      </div>
    </MotionWrapper>
  );
}
