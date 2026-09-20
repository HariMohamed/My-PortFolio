import {
  ArrowLeft,
  ArrowUpRight,
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
          {project.period} · {project.maturity} · {project.category}
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
            <a className="btn btn-primary" href={project.links.live} target="_blank" rel="noopener noreferrer">
              <ArrowUpRight aria-hidden="true" />
              Live Demo
            </a>
          ) : null}
          <a className="btn btn-secondary" href={profile.socials.email}>
            <Mail aria-hidden="true" />
            Discuss similar work
          </a>
        </div>
      </MotionWrapper>

      {/* Screenshot */}
      {project.screenshot && (
        <MotionWrapper className="detail-screenshot">
          <img
            src={project.screenshot}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            decoding="async"
          />
        </MotionWrapper>
      )}

      <div className="detail-grid">
        <MotionWrapper className="detail-card">
          <span>Problem</span>
          <p>{project.problem}</p>
        </MotionWrapper>
        <MotionWrapper className="detail-card">
          <span>Solution</span>
          <p>{project.solution}</p>
        </MotionWrapper>
        <MotionWrapper className="detail-card">
          <span>My contribution</span>
          <ul className="detail-list">
            {project.contribution.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </MotionWrapper>
      </div>

      <DetailSection title="Architecture">
        <p>{project.architecture}</p>
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

      {project.links.live && (
        <DetailSection title="Links">
          <div className="project-actions detail-actions">
            <a className="text-link" href={project.links.live} target="_blank" rel="noopener noreferrer">
              <ArrowUpRight aria-hidden="true" />
              Live Demo
            </a>
          </div>
        </DetailSection>
      )}
    </main>
  );
}
