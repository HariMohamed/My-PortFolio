import { projects } from "../../data/projects";

export const projectAliases = {
  syndicai: ["syndicai", "syndic"],
  elalaouilabo: ["el alaoui", "alaoui", "labo", "photography"],
  "gym-coaching-saas": ["gym coaching", "gym", "coaching"],
  "cfqma-platform": ["cfqma", "training center", "educational platform"],
  orabella: ["orabella", "ora bella", "watch", "watches", "e-commerce", "ecommerce"],
};

export function normalize(value = "") {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

export function detectProject(query, contextProject = null) {
  return projects.find((project) => {
    const aliases = [project.title, project.slug, ...(projectAliases[project.slug] || [])];
    return aliases.some((alias) => query.includes(normalize(alias)));
  }) || contextProject || null;
}

export function detectEntities(query, contextProject = null) {
  return { project: detectProject(query, contextProject) };
}
