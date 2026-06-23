import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ImageIcon,
  LockKeyhole,
  Mail,
  Video,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MotionWrapper from "../components/MotionWrapper";
import { getProjectBySlug } from "../data/projects";
import { profile } from "../data/profile";

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function normalizeEvidenceAsset(asset, fallbackAlt) {
  if (!asset) return null;

  if (typeof asset === "string") {
    return { src: asset, alt: fallbackAlt };
  }

  if (!asset.src) return null;

  return {
    src: asset.src,
    alt: asset.alt || fallbackAlt,
    width: asset.width,
    height: asset.height,
  };
}

function ProjectEvidence({ project }) {
  const evidence = project.evidence || {};
  const screenshots = evidence.screenshots || [];
  const liveDemoUrl = project.links.live || evidence.liveDemo;
  const visualAssets = [
    normalizeEvidenceAsset(evidence.cover, `${project.title} cover image`),
    ...screenshots.map((screenshot, index) =>
      normalizeEvidenceAsset(screenshot, `${project.title} screenshot ${index + 1}`),
    ),
    normalizeEvidenceAsset(evidence.architectureDiagram, `${project.title} architecture diagram`),
    normalizeEvidenceAsset(evidence.workflowDiagram, `${project.title} workflow diagram`),
  ].filter(Boolean);

  return (
    <DetailSection title="Evidence">
      {visualAssets.length ? (
        <div className="evidence-media-grid">
          {visualAssets.map((asset) => (
            <figure className="evidence-media" key={asset.src}>
              <img
                src={asset.src}
                alt={asset.alt}
                width={asset.width}
                height={asset.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      ) : (
        <div className="evidence-placeholder">
          <ImageIcon aria-hidden="true" />
          <strong>Screenshots coming soon</strong>
          <p>{evidence.notes || "Real project captures will be added after screenshot capture."}</p>
        </div>
      )}

      <div className="evidence-links">
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
          <span className="text-link text-muted" aria-disabled="true">
            <LockKeyhole aria-hidden="true" />
            Demo not available yet
          </span>
        )}
      </div>
    </DetailSection>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const evidence = project?.evidence || {};
  const liveDemoUrl = project?.links.live || evidence.liveDemo;
  const repoStatus = project?.links.githubStatus || evidence.repositoryStatus || "Private repo — code available on request";

  useEffect(() => {
    document.title = project
      ? `${project.title} | Hari Mohamed Rizq`
      : "Project Not Found | Hari Mohamed Rizq";
  }, [project]);

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
            <span className="chip" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {project.links.github ? (
            <a className="btn btn-primary" href={project.links.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              GitHub
            </a>
          ) : (
            <span className="btn btn-disabled" aria-disabled="true" title={repoStatus}>
              <Github aria-hidden="true" />
              {repoStatus}
            </span>
          )}
          {liveDemoUrl ? (
            <a className="btn btn-secondary" href={liveDemoUrl} target="_blank" rel="noreferrer">
              <ArrowUpRight aria-hidden="true" />
              Live demo
            </a>
          ) : (
            <span className="btn btn-disabled" aria-disabled="true">
              <LockKeyhole aria-hidden="true" />
              Demo not available yet
            </span>
          )}
          {evidence.videoDemo ? (
            <a className="btn btn-secondary" href={evidence.videoDemo} target="_blank" rel="noreferrer">
              <Video aria-hidden="true" />
              Video demo
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

      <ProjectEvidence project={project} />

      <DetailSection title="Architecture">
        <p>{project.architecture}</p>
      </DetailSection>

      <DetailSection title="Tech Stack">
        <div className="chip-row">
          {project.stack.map((tech) => (
            <span className="chip" key={tech}>
              {tech}
            </span>
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

      <DetailSection title="Links">
        <div className="project-actions detail-actions">
          {project.links.github ? (
            <a className="text-link" href={project.links.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              GitHub
            </a>
          ) : (
            <span className="text-link text-muted" aria-disabled="true">
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
            <span className="text-link text-muted" aria-disabled="true">
              <LockKeyhole aria-hidden="true" />
              Screenshots coming soon
            </span>
          )}
        </div>
      </DetailSection>
    </main>
  );
}
