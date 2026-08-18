import { featuredProjects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-heading">
      <SectionTitle
        id="projects-heading"
        eyebrow="Selected Work"
        title="Production systems I've built and shipped."
        description="Full-stack applications across SaaS, AI integration, and frontend engineering — each with a live deployment."
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
