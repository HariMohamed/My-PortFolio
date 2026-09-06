import { profile } from "./profile";
import { projects } from "./projects";
import { professionalExperience, academicEducation } from "./experience";
import { currentFocus, skillGroups } from "./skills";

const sectionTargets = {
  projects: { label: "Explore Projects", href: "#projects" },
  skills: { label: "Explore Engineering Stack", href: "#skills" },
  experience: { label: "Explore Professional Experience", href: "#experience" },
  education: { label: "Explore Academic Foundation", href: "#education" },
  contact: { label: "Get in touch", href: "#contact" },
};

function normalize(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(value, terms) {
  return terms.some((term) => value.includes(term));
}

const projectAliases = {
  syndicai: ["syndicai", "syndic"],
  elalaouilabo: ["el alaoui", "alaoui", "labo", "photography"],
  "gym-coaching-saas": ["gym coaching", "gym", "coaching"],
  "cfqma-platform": ["cfqma", "training center", "educational platform"],
};

function findProject(query, contextProject) {
  const project = projects.find((item) => {
    const aliases = [item.title, item.slug, ...(projectAliases[item.slug] || [])];
    return aliases.some((alias) => query.includes(normalize(alias)));
  });
  return project || contextProject || null;
}

function projectDestination(project) {
  return { label: `Explore ${project.title}`, href: project.links.caseStudy };
}

function projectAnswer(project) {
  return `${project.title} is a ${project.maturity.toLowerCase()} focused on ${project.summary.replace(/\.$/, "")}. Hari's contribution included ${project.contribution.join(", ")}. Relevant technologies include ${project.stack.join(", ")}. The public evidence is the live deployment and case study; the repository is private.`;
}

function projectSuggestions(project) {
  const suggestions = [
    { label: "Ask about backend work", query: "Which project demonstrates backend engineering?" },
    { label: "Ask about AI integration", query: "Which project demonstrates AI integration?" },
  ];
  if (project.slug !== "syndicai") suggestions[0] = { label: "Explore SyndicAI", href: "/projects/syndicai" };
  return suggestions;
}

function summarizeExperience() {
  return professionalExperience
    .map((item) => `${item.role} at ${item.organization} (${item.period})`)
    .join("; ");
}

function summarizeEducation() {
  return academicEducation
    .map((item) => `${item.role} at ${item.organization} (${item.period})`)
    .join("; ");
}

export function resolvePortfolioQuestion(input, contextProject = null) {
  const query = normalize(input);
  const project = findProject(query, contextProject);

  if (!query) return null;

  if (includesAny(query, ["other project", "another project", "next project"]) && contextProject) {
    const nextProject = projects.find((item) => item.slug !== contextProject.slug) || projects[0];
    return {
      answer: projectAnswer(nextProject),
      destination: projectDestination(nextProject),
      suggestions: projectSuggestions(nextProject),
      contextProject: nextProject,
    };
  }

  if (project && includesAny(query, ["tell me", "about", "status", "maturity", "contribute", "built", "project"])) {
    return {
      answer: projectAnswer(project),
      destination: projectDestination(project),
      suggestions: projectSuggestions(project),
      contextProject: project,
    };
  }

  if (contextProject && includesAny(query, ["technology", "technologies", "stack", "use", "used", "contribution"])) {
    return {
      answer: `${contextProject.title} uses ${contextProject.stack.join(", ")}. Hari's documented contribution includes ${contextProject.contribution.join(", ")}.`,
      destination: projectDestination(contextProject),
      suggestions: projectSuggestions(contextProject),
      contextProject,
    };
  }

  if (includesAny(query, ["source code", "repository", "github repo", "public repo"])) {
    return {
      answer: "The project repositories are private, so the source code is not publicly accessible. You can review the deployed applications and their case studies.",
      destination: sectionTargets.projects,
      suggestions: [{ label: "Review project evidence", href: "#projects" }, { label: "Ask about a project", query: "Tell me about SyndicAI." }],
      contextProject,
    };
  }

  if (includesAny(query, ["production", "mvp", "deployed", "evidence", "verify", "proof"])) {
    const evidenceAnswer = project
      ? `${project.title} is classified as ${project.maturity}. The available public evidence is its live deployment, case study, technical overview, and private-repository status. The portfolio does not claim verified production usage.`
      : "The portfolio documents deployed projects, case studies, technical overviews, and private-repository status. It does not claim verified production usage, user counts, or commercial metrics.";
    return {
      answer: evidenceAnswer,
      destination: project ? projectDestination(project) : sectionTargets.projects,
      suggestions: [{ label: "Ask about a project", query: "Tell me about SyndicAI." }, { label: "Review Experience", href: "#experience" }],
      contextProject,
    };
  }

  if (includesAny(query, ["backend", "api", "database", "server", "ai integration", "ai project"])) {
    const capabilityProject = projects.find((item) => item.slug === "syndicai") || projects[0];
    return {
      answer: `${capabilityProject.title} is the clearest backend and AI-integration case study: ${capabilityProject.stack.join(", ")}, with contributions covering ${capabilityProject.contribution.join(", ")}.`,
      destination: projectDestination(capabilityProject),
      suggestions: projectSuggestions(capabilityProject),
      contextProject: capabilityProject,
    };
  }

  if (includesAny(query, ["what projects", "which projects", "all projects", "projects has", "projects are"])) {
    const deployedProjects = projects.map((item) => `${item.title} (${item.maturity})`).join("; ");
    return {
      answer: `The documented projects are ${deployedProjects}.`,
      destination: sectionTargets.projects,
      suggestions: [{ label: "Explore SyndicAI", href: "/projects/syndicai" }, { label: "Explore Gym Coaching SaaS", href: "/projects/gym-coaching-saas" }],
      contextProject,
    };
  }

  if (includesAny(query, ["stack", "technology", "technologies", "frontend", "react", "python", "database", "skill"])) {
    const stackSummary = skillGroups.map((group) => `${group.title}: ${group.skills.join(", ")}`).join("; ");
    return {
      answer: `The engineering stack is ${stackSummary}. Current focus areas include ${currentFocus.join(", ")}.`,
      destination: sectionTargets.skills,
      suggestions: [{ label: "Ask about a project", query: "Tell me about SyndicAI." }, { label: "Explore Current Focus", href: "#focus" }],
      contextProject,
    };
  }

  if (includesAny(query, ["experience", "worked", "work history", "company", "job", "role"])) {
    return {
      answer: `Hari's documented experience includes ${summarizeExperience()}.`,
      destination: sectionTargets.experience,
      suggestions: [{ label: "Explore Engineering Stack", href: "#skills" }, { label: "Ask about education", query: "What did he study?" }],
      contextProject,
    };
  }

  if (includesAny(query, ["education", "study", "studied", "degree", "academic", "school"])) {
    return {
      answer: `Hari's documented academic background includes ${summarizeEducation()}.`,
      destination: sectionTargets.education,
      suggestions: [{ label: "Explore Experience", href: "#experience" }, { label: "Explore Engineering Stack", href: "#skills" }],
      contextProject,
    };
  }

  if (includesAny(query, ["contact", "email", "phone", "linkedin", "cv", "resume", "github", "reach"])) {
    return {
      answer: `You can contact Hari at ${profile.email}, view the CV, or use the GitHub and LinkedIn links in the contact section.`,
      destination: sectionTargets.contact,
      suggestions: [{ label: "Explore Projects", href: "#projects" }, { label: "Explore Experience", href: "#experience" }],
      contextProject,
    };
  }

  if (includesAny(query, ["who", "what does", "background", "based", "kind of developer", "available", "looking for", "roles"])) {
    return {
      answer: `${profile.name} is a ${profile.role} based in ${profile.location}. ${profile.availability}.`,
      destination: sectionTargets.contact,
      suggestions: [{ label: "Explore Projects", href: "#projects" }, { label: "Explore Experience", href: "#experience" }],
      contextProject,
    };
  }

  return {
    answer: "I don't have verified information about that in this portfolio. You can explore the documented projects, experience, engineering stack, or contact details.",
    destination: sectionTargets.projects,
    suggestions: [{ label: "Explore Experience", href: "#experience" }, { label: "Get in touch", href: "#contact" }],
    contextProject,
  };
}
