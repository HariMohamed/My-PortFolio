import { ArrowUpRight, Github, Route } from "lucide-react";
import { Link } from "react-router-dom";
import MotionWrapper from "./MotionWrapper";
import { techLogos } from "../data/logos";

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

      <div className="project-split">
        <div>
          <span>Problem</span>
          <p>{project.problem}</p>
        </div>
        <div>
          <span>Solution</span>
          <p>{project.solution}</p>
        </div>
      </div>

      <div className="chip-row">
        {project.stack.slice(0, 7).map((tech) => (
          <span className="chip gap-2" key={tech}>
            {techLogos[tech] && (
              <img src={techLogos[tech]} alt={tech} className="w-4 h-4 object-contain" loading="lazy" decoding="async" />
            )}
            {tech}
          </span>
        ))}
      </div>

      <div className="project-impact">
        <span>Impact</span>
        <p>{project.results[0]}</p>
      </div>

      <div className="project-actions">
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
        {project.links.live ? (
          <a className="text-link" href={project.links.live} target="_blank" rel="noreferrer">
            <ArrowUpRight aria-hidden="true" />
            Live Demo
          </a>
        ) : null}
      </div>
    </MotionWrapper>
  );
}
