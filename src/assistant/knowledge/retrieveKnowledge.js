import { currentFocus, skillGroups } from "../../data/skills";
import { projects } from "../../data/projects";
import { academicEducation, professionalExperience } from "../../data/experience";
import { detectEntities, normalize } from "../intents/detectEntities";
import { detectIntent } from "../intents/detectIntent";
import { rankResults } from "./rankResults";

const synonymGroups = [
  ["backend", "api", "server", "rest", "fastapi", "django", "node", "nodejs", "database"],
  ["ai", "artificial intelligence", "machine learning", "llm", "ai integration", "langchain", "automation"],
  ["frontend", "ui", "interface", "react", "responsive design"],
];

function relatedTerms(query) {
  return synonymGroups.flatMap((group) => group.some((term) => query.includes(term)) ? group : []).filter((term, index, all) => all.indexOf(term) === index);
}

function searchableProject(project) {
  return normalize([project.title, project.slug, project.summary, project.category, project.architecture, ...project.stack, ...project.focus, ...project.contribution].join(" "));
}

export function retrieveKnowledge({ query, portfolioData = {}, context } = {}) {
  const normalized = normalize(query);
  const intent = detectIntent(normalized);
  const entities = detectEntities(normalized, context?.project || null);
  const terms = [normalized, ...normalized.split(" "), ...relatedTerms(normalized)];
  const entries = [
    ...projects.map((data) => ({ type: "project", id: data.slug, data, text: searchableProject(data), base: intent === "project" ? 2 : 0 })),
    ...skillGroups.map((data) => ({ type: "skill", id: data.title.toLowerCase(), data, text: normalize([data.title, ...data.skills].join(" ")), base: intent === "skills" ? 2 : 0 })),
    ...professionalExperience.map((data, index) => ({ type: "experience", id: `experience-${index}`, data, text: normalize(JSON.stringify(data)), base: intent === "experience" ? 2 : 0 })),
    ...academicEducation.map((data, index) => ({ type: "education", id: `education-${index}`, data, text: normalize(JSON.stringify(data)), base: intent === "education" ? 2 : 0 })),
    { type: "focus", id: "current-focus", data: currentFocus, text: normalize(currentFocus.join(" ")), base: intent === "skills" ? 1 : 0 },
  ];
  const matches = entries.map(({ text, base, ...entry }) => {
    const tokenScore = terms.reduce((score, term) => score + (term && text.includes(term) ? (term.length > 4 ? 0.12 : 0.05) : 0), 0);
    const contextBoost = entities.project?.slug === entry.id ? 0.5 : 0;
    return { ...entry, score: Math.min(0.99, base * 0.2 + tokenScore + contextBoost) };
  }).filter((entry) => entry.score > 0.05);
  return { query: normalized, intent, entities, matches: rankResults(matches).slice(0, 5), portfolioData };
}
