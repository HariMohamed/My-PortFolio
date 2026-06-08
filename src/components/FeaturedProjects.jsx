import { featuredProjects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";

export default function FeaturedProjects({ recruiterMode = false }) {
  return (
    <section id="projects" className="section-shell" aria-labelledby="projects-heading">
      <SectionTitle
        id="projects-heading"
        eyebrow="Selected Work"
        title="Project evidence for AI, SaaS, and full-stack delivery."
        description="Large case-study cards built for recruiter scanning: problem, solution, stack, and concrete impact without inflated claims."
        recruiterMode={recruiterMode}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            recruiterMode={recruiterMode}
          />
        ))}
      </div>
    </section>
  );
}
