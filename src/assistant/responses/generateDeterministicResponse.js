import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import { professionalExperience, academicEducation } from "../../data/experience";
import { currentFocus, skillGroups } from "../../data/skills";
import { normalize, detectEntities } from "../intents/detectEntities";
import { getNavigationTarget, sectionTargets } from "../navigation/getNavigationTarget";

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Whole-word (optionally plural) matching: "api" must not fire on "capital" or "GROQ_API_KEY".
const has = (query, terms) => terms.some((term) => new RegExp(`(^| )${escapeRegExp(term)}s?( |$)`).test(query));

// Messages the keyword router must not answer: the LLM (or a refusal) handles them.
const ARABIC_SCRIPT = /[؀-ۿ]/;
const NON_ENGLISH_CUES = ["parle", "parles", "quel", "quels", "quelle", "quelles", "projets", "projet", "bonjour", "salut", "merci", "vous", "votre", "avez", "tes", "ton", "pourquoi", "competences", "chhal", "achno", "kifach", "3ndek", "3ndo", "wach", "khdma", "khibra", "salam", "labas", "shno", "chno", "mnin", "bghit"];
const GREETING = /^(hi|hello|hey|good (morning|afternoon|evening)|greetings)( there)?$/;
const EXTRACTION_ATTEMPT = /(system prompt|previous instructions|prior instructions|above instructions|your instructions|your prompt|api key|secret key|access token|password|environment variable|env file|reveal your|ignore (all|any|the) )/;
const TASK_REQUEST = /^(write|generate|create|make|code|draft|translate|debug|solve|calculate|pretend|act as|forget|print|reveal) /;
const CLAIM_SHAPED = /^(does|did|do|is|has|have|can|could|are|confirm|verify) |\b(senior|years of|expert|proficient|certified|google|amazon|microsoft)\b/;
const SKILL_CLAIM_TOPIC = ["experience", "experienced", "skill", "know", "knows", "expert", "senior", "years", "worked", "certified", "proficient", "familiar"];
const looksNonEnglish = (raw, normalized) => ARABIC_SCRIPT.test(raw) || has(normalized, NON_ENGLISH_CUES);

// Technology lookups are derived from the project and skills data, never hard-coded.
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

// Only fields published in the profile data are ever returned; a missing phone is reported as unavailable.
export function contactAnswer(profile, normalized) {
  const wantsPhone = /(^| )(phone|number|call|telephone|tel)( |$)/.test(normalized);
  if (wantsPhone) return profile.phone ? `Hari's published phone number is ${profile.phone}. You can also write to ${profile.email}.` : `A phone number isn't published in the portfolio. You can contact Hari at ${profile.email}.`;
  return `You can contact Hari at ${profile.email}, view the CV, or use the GitHub and LinkedIn links in the contact section.`;
}

export function generateDeterministicResponse({ query, retrieval, contextProject = null }) {
  const normalized = normalize(query);
  const project = retrieval?.entities?.project || detectEntities(normalized, contextProject).project;
  if (!normalized) return ARABIC_SCRIPT.test(query) ? { needsLLM: true, contextProject } : null;
  if (looksNonEnglish(query, normalized)) return { needsLLM: true, contextProject };
  if (GREETING.test(normalized)) return { answer: "Hello! I can answer questions about Hari's projects, skills, and experience. What would you like to know?", destination: null, suggestions: [{ label: "Explore Projects", href: "/#projects" }, { label: "Explore Experience", href: "/#experience" }], contextProject };
  if (EXTRACTION_ATTEMPT.test(normalized)) return { answer: "I can only answer questions about Hari's portfolio, so I can't share system instructions, credentials, or configuration. Ask me about his projects, skills, or experience.", destination: sectionTargets.projects, suggestions: [{ label: "Ask about a project", query: "Tell me about SyndicAI." }], contextProject };
  if (TASK_REQUEST.test(normalized)) return { needsLLM: true, contextProject };
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
  // Capability or credential claims about something the data does not mention go to the grounded LLM, not to a generic list.
  if (CLAIM_SHAPED.test(normalized) && has(normalized, SKILL_CLAIM_TOPIC)) {
    const technology = findTechnology(normalized);
    if (!technology) return { needsLLM: true, contextProject };
    const result = technologyAnswer(technology);
    return { ...result, contextProject: result.contextProject || contextProject };
  }
  if (has(normalized, ["stack", "technology", "technologies", "frontend", "react", "python", "database", "skill", "ui", "interface"])) return { answer: `The engineering stack is ${skillGroups.map((group) => `${group.title}: ${group.skills.join(", ")}`).join("; ")}. Current focus areas include ${currentFocus.join(", ")}.`, destination: sectionTargets.skills, suggestions: [{ label: "Ask about a project", query: "Tell me about SyndicAI." }, sectionTargets.focus], contextProject };
  if (has(normalized, ["experience", "worked", "work history", "company", "job", "role", "professional"])) return { answer: `Hari's documented experience includes ${professionalExperience.map((item) => `${item.role} at ${item.organization} (${item.period})`).join("; ")}.`, destination: sectionTargets.experience, suggestions: [{ label: "Explore Engineering Stack", href: "/#skills" }, { label: "Ask about education", query: "What did he study?" }], contextProject };
  if (has(normalized, ["education", "study", "studied", "degree", "academic", "school", "training"])) return { answer: `Hari's documented academic background includes ${academicEducation.map((item) => `${item.role} at ${item.organization} (${item.period})`).join("; ")}.`, destination: sectionTargets.education, suggestions: [{ label: "Explore Experience", href: "/#experience" }, { label: "Explore Engineering Stack", href: "/#skills" }], contextProject };
  if (has(normalized, ["contact", "email", "phone", "linkedin", "cv", "resume", "github", "reach"])) return { answer: contactAnswer(profile, normalized), destination: sectionTargets.contact, suggestions: [{ label: "Explore Projects", href: "/#projects" }, { label: "Explore Experience", href: "/#experience" }], contextProject };
  if (has(normalized, ["who", "what does", "background", "based", "kind of developer", "available", "looking for", "roles"])) return { answer: `${profile.name} is a ${profile.role} based in ${profile.location}. ${profile.availability}.`, destination: sectionTargets.contact, suggestions: [{ label: "Explore Projects", href: "/#projects" }, { label: "Explore Experience", href: "/#experience" }], contextProject };
  return { needsLLM: true, contextProject };
}
