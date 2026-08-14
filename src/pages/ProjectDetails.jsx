import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Mail,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MotionWrapper from "../components/MotionWrapper";
import TechChip from "../components/TechChip";
import { getProjectBySlug } from "../data/projects";
import { profile } from "../data/profile";
import { defaultMetadata, setPageMetadata, siteUrl } from "../utils/metadata";

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (project) {
      setPageMetadata({
        title: `${project.title} | Hari Mohamed Rizq`,
        description: project.summary,
        url: `${siteUrl}/projects/${project.slug}`,
      });
    } else {
      setPageMetadata({
        title: "Project Not Found | Hari Mohamed Rizq",
        description: "The requested portfolio case study could not be found.",
        url: `${siteUrl}/projects/${slug || "not-found"}`,
      });
    }

    return () => setPageMetadata(defaultMetadata);
  }, [project, slug]);

  if (!project) {
    return (
      <main id="main" className="page-shell">
        <div className="empty-state">
          <p className="eyebrow">Project not found</p>
          <h1>This case study does not exist.</h1>
          <Link className="btn btn-primary" to="/#projects">
            <ArrowLeft aria-hidden="true" />
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="page-shell">
      <MotionWrapper className="project-detail-hero">
        <Link className="text-link" to="/#projects">
          <ArrowLeft aria-hidden="true" />
          Back to projects
        </Link>
        <p className="project-meta">
          {project.period} · {project.category}
        </p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="chip-row">
          {project.stack.map((tech) => (
            <TechChip key={tech} tech={tech} />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {project.links.live ? (
            <a className="btn btn-primary" href={project.links.live} target="_blank" rel="noreferrer">
              <ArrowUpRight aria-hidden="true" />
              Live Demo
            </a>
          ) : null}
          {project.links.github ? (
            <a className="btn btn-secondary" href={project.links.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              Source Code
            </a>
          ) : null}
          <a className="btn btn-secondary" href={profile.socials.email}>
            <Mail aria-hidden="true" />
            Discuss similar work
          </a>
        </div>
      </MotionWrapper>

      <div className="detail-grid">
        <MotionWrapper className="detail-card">
          <span>Problem</span>
          <p>{project.problem}</p>
        </MotionWrapper>
        <MotionWrapper className="detail-card">
          <span>Solution</span>
          <p>{project.solution}</p>
        </MotionWrapper>
      </div>

      <DetailSection title="Architecture">
        <p>{project.architecture}</p>
      </DetailSection>

      <DetailSection title="Tech Stack">
        <div className="chip-row">
          {project.stack.map((tech) => (
            <TechChip key={tech} tech={tech} />
          ))}
        </div>
      </DetailSection>

      <DetailSection title="Features">
        <ul className="detail-list">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection title="Challenges">
        <ul className="detail-list">
          {project.challenges.map((challenge) => (
            <li key={challenge}>{challenge}</li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection title="Results">
        <ul className="detail-list">
          {project.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </DetailSection>

      {project.evidence && (project.evidence.cover || project.evidence.architectureDiagram || project.evidence.workflowDiagram || (project.evidence.screenshots && project.evidence.screenshots.length > 0)) && (
        <DetailSection title="Evidence">
          <div className="evidence-media-grid">
            {project.evidence.cover && (
              <figure className="evidence-media">
                <img src={project.evidence.cover} alt={`${project.title} Cover`} loading="lazy" decoding="async" />
              </figure>
            )}
            {project.evidence.architectureDiagram && (
              <figure className="evidence-media">
                <img src={project.evidence.architectureDiagram} alt={`${project.title} Architecture`} loading="lazy" decoding="async" />
              </figure>
            )}
            {project.evidence.workflowDiagram && (
              <figure className="evidence-media">
                <img src={project.evidence.workflowDiagram} alt={`${project.title} Workflow`} loading="lazy" decoding="async" />
              </figure>
            )}
            {project.evidence.screenshots && project.evidence.screenshots.map((shot, idx) => (
              <figure className="evidence-media" key={idx}>
                <img src={shot} alt={`${project.title} Screenshot ${idx + 1}`} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </DetailSection>
      )}

      <DetailSection title="Links">
        <div className="project-actions detail-actions">
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
      </DetailSection>
    </main>
  );
}
