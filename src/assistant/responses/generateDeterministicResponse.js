import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { professionalExperience, academicEducation } from "../../data/experience";
import { currentFocus, skillGroups } from "../../data/skills";
import { normalize, detectEntities } from "../intents/detectEntities";
import { getNavigationTarget, sectionTargets } from "../navigation/getNavigationTarget";

const has = (query, terms) => terms.some((term) => query.includes(term));

// Technology lookups are derived from the project and skills data, never hard-coded.
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function findTechnology(query) {
  const names = [...new Set([...projects.flatMap((item) => item.stack), ...skillGroups.flatMap((group) => group.skills)])];
  return names
    .filter((name) => new RegExp(`(^| )${escapeRegExp(normalize(name))}( |$)`).test(query))
    .sort((a, b) => b.length - a.length)[0] || null;
}
function technologyAnswer(technology) {
  const matches = projects.filter((item) => item.stack.some((entry) => normalize(entry) === normalize(technology)));
  if (!matches.length) {
    return { answer: `${technology} is listed in the engineering stack, but none of the documented project case studies list it in their stack.`, destination: sectionTargets.skills, suggestions: [{ label: "Explore all projects", href: "/#projects" }], contextProject: null };
  }
  const list = matches.map((item) => `${item.title} (${item.maturity})`).join("; ");
  return { answer: `${technology} appears in the stack of ${matches.length === 1 ? "this documented project" : `${matches.length} documented projects`}: ${list}.`, destination: matches.length === 1 ? getNavigationTarget("project", matches[0]) : sectionTargets.projects, suggestions: matches.length === 1 ? [{ label: "Explore all projects", href: "/#projects" }] : matches.slice(0, 3).map((item) => ({ label: `Explore ${item.title}`, href: item.links.caseStudy })), contextProject: matches.length === 1 ? matches[0] : null };
}
const projectAnswer = (project) => `${project.title} is a ${project.maturity.toLowerCase()} focused on ${project.summary.replace(/\.$/, "")}. Hari's contribution included ${project.contribution.join(", ")}. Relevant technologies include ${project.stack.join(", ")}. The public evidence is the live deployment and case study; the repository is private.`;
const projectSuggestions = (project) => [
  { label: "Ask about backend work", query: "Which project demonstrates backend engineering?" },
  { label: "Ask about AI integration", query: "Which project demonstrates AI integration?" },
  ...(project.slug !== "syndicai" ? [{ label: "Explore SyndicAI", href: "/projects/syndicai" }] : []),
];

export function generateDeterministicResponse({ query, retrieval, contextProject = null }) {
  const normalized = normalize(query);
  const project = retrieval?.entities?.project || detectEntities(normalized, contextProject).project;
  if (!normalized) return null;
  if (has(normalized, ["other project", "another project", "next project"]) && contextProject) {
    const next = projects.find((item) => item.slug !== contextProject.slug) || projects[0];
    return { answer: projectAnswer(next), destination: getNavigationTarget("project", next), suggestions: projectSuggestions(next), contextProject: next };
  }
  if (has(normalized, ["which project", "what project", "projects use", "projects using", "projects built with", "project use", "project using", "used in"])) {
    const technology = findTechnology(normalized);
    if (technology) { const result = technologyAnswer(technology); return { ...result, contextProject: result.contextProject || contextProject }; }
  }
  if (project && has(normalized, ["tell me", "about", "status", "maturity", "contribute", "built", "project"])) return { answer: projectAnswer(project), destination: getNavigationTarget("project", project), suggestions: projectSuggestions(project), contextProject: project };
  if (contextProject && has(normalized, ["technology", "technologies", "stack", "use", "used", "contribution"])) return { answer: `${contextProject.title} uses ${contextProject.stack.join(", ")}. Hari's documented contribution includes ${contextProject.contribution.join(", ")}.`, destination: getNavigationTarget("project", contextProject), suggestions: projectSuggestions(contextProject), contextProject };
  if (has(normalized, ["source code", "repository", "github repo", "public repo"])) return { answer: "The project repositories are private, so the source code is not publicly accessible. You can review the deployed applications and their case studies.", destination: sectionTargets.projects, suggestions: [{ label: "Review project evidence", href: "/#projects" }, { label: "Ask about a project", query: "Tell me about SyndicAI." }], contextProject };
  if (has(normalized, ["production", "mvp", "deployed", "evidence", "verify", "proof"])) return { answer: project ? `${project.title} is classified as ${project.maturity}. The available public evidence is its live deployment, case study, technical overview, and private-repository status. The portfolio does not claim verified production usage.` : "The portfolio documents deployed projects, case studies, technical overviews, and private-repository status. It does not claim verified production usage, user counts, or commercial metrics.", destination: project ? getNavigationTarget("project", project) : sectionTargets.projects, suggestions: [{ label: "Ask about a project", query: "Tell me about SyndicAI." }, { label: "Review Experience", href: "/#experience" }], contextProject };
  if (has(normalized, ["backend", "api", "database", "server", "ai integration", "ai project"])) { const match = projects.find((item) => item.slug === "syndicai") || projects[0]; return { answer: `${match.title} is the clearest backend and AI-integration case study: ${match.stack.join(", ")}, with contributions covering ${match.contribution.join(", ")}.`, destination: getNavigationTarget("project", match), suggestions: projectSuggestions(match), contextProject: match }; }
  if (has(normalized, ["what projects", "which projects", "all projects", "projects has", "projects are"])) return { answer: `The documented projects are ${projects.map((item) => `${item.title} (${item.maturity})`).join("; ")}.`, destination: sectionTargets.projects, suggestions: [{ label: "Explore SyndicAI", href: "/projects/syndicai" }, { label: "Explore Gym Coaching SaaS", href: "/projects/gym-coaching-saas" }], contextProject };
  if (has(normalized, ["stack", "technology", "technologies", "frontend", "react", "python", "database", "skill", "ui", "interface"])) return { answer: `The engineering stack is ${skillGroups.map((group) => `${group.title}: ${group.skills.join(", ")}`).join("; ")}. Current focus areas include ${currentFocus.join(", ")}.`, destination: sectionTargets.skills, suggestions: [{ label: "Ask about a project", query: "Tell me about SyndicAI." }, sectionTargets.focus], contextProject };
  if (has(normalized, ["experience", "worked", "work history", "company", "job", "role", "professional"])) return { answer: `Hari's documented experience includes ${professionalExperience.map((item) => `${item.role} at ${item.organization} (${item.period})`).join("; ")}.`, destination: sectionTargets.experience, suggestions: [{ label: "Explore Engineering Stack", href: "/#skills" }, { label: "Ask about education", query: "What did he study?" }], contextProject };
  if (has(normalized, ["education", "study", "studied", "degree", "academic", "school", "training"])) return { answer: `Hari's documented academic background includes ${academicEducation.map((item) => `${item.role} at ${item.organization} (${item.period})`).join("; ")}.`, destination: sectionTargets.education, suggestions: [{ label: "Explore Experience", href: "/#experience" }, { label: "Explore Engineering Stack", href: "/#skills" }], contextProject };
  if (has(normalized, ["contact", "email", "phone", "linkedin", "cv", "resume", "github", "reach"])) return { answer: `You can contact Hari at ${profile.email}, view the CV, or use the GitHub and LinkedIn links in the contact section.`, destination: sectionTargets.contact, suggestions: [{ label: "Explore Projects", href: "/#projects" }, { label: "Explore Experience", href: "/#experience" }], contextProject };
  if (has(normalized, ["who", "what does", "background", "based", "kind of developer", "available", "looking for", "roles"])) return { answer: `${profile.name} is a ${profile.role} based in ${profile.location}. ${profile.availability}.`, destination: sectionTargets.contact, suggestions: [{ label: "Explore Projects", href: "/#projects" }, { label: "Explore Experience", href: "/#experience" }], contextProject };
  return { needsLLM: true, contextProject };
}
