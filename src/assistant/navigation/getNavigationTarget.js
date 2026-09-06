export const sectionTargets = {
  projects: { label: "Explore Projects", href: "/#projects" },
  skills: { label: "Explore Engineering Stack", href: "/#skills" },
  experience: { label: "Explore Professional Experience", href: "/#experience" },
  education: { label: "Explore Academic Foundation", href: "/#education" },
  contact: { label: "Get in touch", href: "/#contact" },
  focus: { label: "View Current Focus", href: "/#focus" },
};

export function getNavigationTarget(kind, project) {
  if (kind === "project" && project) return { label: `Explore ${project.title}`, href: project.links.caseStudy };
  return sectionTargets[kind] || sectionTargets.projects;
}
