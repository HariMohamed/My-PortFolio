import { featuredProjects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-heading">
      <SectionTitle
        id="projects-heading"
        eyebrow="Selected Work"
        title="Selected full-stack and AI integration work."
        description="Deployed applications across SaaS, AI integration, and frontend engineering, with a case study for each project."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
