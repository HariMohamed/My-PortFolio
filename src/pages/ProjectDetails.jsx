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
import { projectSeo } from "../utils/seo";

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
      setPageMetadata(projectSeo(project));
    } else {
      setPageMetadata({
        title: "Project Not Found | Hari Mohamed Rizq",
        description: "The requested portfolio case study could not be found.",
        url: `${siteUrl}/projects/${slug || "not-found"}`,
        robots: "noindex",
      });
    }

    return () => {
      setPageMetadata(defaultMetadata);
    };
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
              View {project.title} Live
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
            alt={`Screenshot of ${project.title} web application`}
            loading="lazy"
            decoding="async"
          />
        </MotionWrapper>
      )}

      <div className="detail-grid">
        <MotionWrapper className="detail-card">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-70">What problem does {project.title} solve?</h2>
          <p>{project.problem}</p>
        </MotionWrapper>
        <MotionWrapper className="detail-card">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-70">What did I build?</h2>
          <p>{project.solution}</p>
        </MotionWrapper>
        <MotionWrapper className="detail-card">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-70">What was my role?</h2>
          <ul className="detail-list">
            {project.contribution.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </MotionWrapper>
      </div>

      <DetailSection title="Architecture">
        <h3 className="sr-only">What technologies power {project.title}?</h3>
        <p>{project.architecture}</p>
      </DetailSection>

      <DetailSection title="Features">
        <h3 className="sr-only">What are the main features?</h3>
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

      {project.links && (
        <DetailSection title="Project Links">
          <h3 className="sr-only">Where can {project.title} be viewed?</h3>
          <div className="project-actions detail-actions flex flex-col gap-4 items-start">
            {project.links.live && (
              <a className="text-link" href={project.links.live} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight aria-hidden="true" />
                Live Product ↓<br/>
                <span className="link-url">{project.links.live}</span>
              </a>
            )}
          </div>
        </DetailSection>
      )}
    </main>
  );
}
