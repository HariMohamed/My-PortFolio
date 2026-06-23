import { ArrowUpRight, Github, ImageIcon, LockKeyhole, Route, Video } from "lucide-react";
import { Link } from "react-router-dom";
import MotionWrapper from "./MotionWrapper";

export default function ProjectCard({ project, index = 0 }) {
  const evidence = project.evidence || {};
  const screenshots = evidence.screenshots || [];
  const liveDemoUrl = project.links.live || evidence.liveDemo;
  const repoStatus = project.links.githubStatus || evidence.repositoryStatus || "Private repo — code available on request";
  const hasVisualEvidence = Boolean(
    evidence.cover ||
      screenshots.length ||
      evidence.architectureDiagram ||
      evidence.workflowDiagram,
  );

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

      <div className="evidence-status" aria-label={`${project.title} evidence status`}>
        <ImageIcon aria-hidden="true" />
        <span>
          {hasVisualEvidence ? evidence.status || "Project evidence available" : "Screenshots coming soon"}
        </span>
      </div>

      <div className="project-actions">
        <Link className="text-link" to={project.links.caseStudy}>
          <Route aria-hidden="true" />
          Case study
        </Link>
        {project.links.github ? (
          <a className="text-link" href={project.links.github} target="_blank" rel="noreferrer">
            <Github aria-hidden="true" />
            GitHub
          </a>
        ) : (
          <span className="text-link text-muted" aria-disabled="true" title={repoStatus}>
            <Github aria-hidden="true" />
            {repoStatus}
          </span>
        )}
        {evidence.videoDemo ? (
          <a className="text-link" href={evidence.videoDemo} target="_blank" rel="noreferrer">
            <Video aria-hidden="true" />
            Video demo
          </a>
        ) : null}
        {liveDemoUrl ? (
          <a className="text-link" href={liveDemoUrl} target="_blank" rel="noreferrer">
            <ArrowUpRight aria-hidden="true" />
            Live demo
          </a>
        ) : (
          <span className="text-link text-muted" aria-disabled="true" title="Live demo not available yet">
            <LockKeyhole aria-hidden="true" />
            Screenshots coming soon
          </span>
        )}
      </div>
    </MotionWrapper>
  );
}
