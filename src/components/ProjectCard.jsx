import { ArrowUpRight, Github, LockKeyhole, Route } from "lucide-react";
import { Link } from "react-router-dom";
import MotionWrapper from "./MotionWrapper";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <MotionWrapper delay={index * 0.05} hover className="project-card">
      <div className="project-card-top">
        <div>
          <p className="project-meta">
            {project.period} - {project.category}
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
          <span className="chip" key={tech}>
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
        <a className="text-link" href={project.links.github} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" />
          GitHub
        </a>
        {project.links.live ? (
          <a className="text-link" href={project.links.live} target="_blank" rel="noreferrer">
            <ArrowUpRight aria-hidden="true" />
            Live demo
          </a>
        ) : (
          <span className="text-link text-muted" title="Add a live demo URL when deployed">
            <LockKeyhole aria-hidden="true" />
            Demo to add
          </span>
        )}
      </div>
    </MotionWrapper>
  );
}
