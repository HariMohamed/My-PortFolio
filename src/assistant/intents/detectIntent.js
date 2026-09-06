const intentTerms = {
  project: ["project", "built", "developed", "case study", "syndicai", "labo", "coaching", "cfqma"],
  skills: ["skill", "stack", "technology", "technologies", "frontend", "backend", "react", "python", "database", "api", "server", "ui", "interface"],
  experience: ["experience", "worked", "work history", "company", "job", "role", "professional"],
  education: ["education", "study", "studied", "degree", "academic", "school", "training"],
  contact: ["contact", "email", "phone", "linkedin", "cv", "resume", "github", "reach"],
  evidence: ["source code", "repository", "production", "mvp", "deployed", "evidence", "verify", "proof"],
  identity: ["who", "what does", "background", "based", "kind of developer", "available", "looking for", "roles"],
};

export function detectIntent(query) {
  const ranked = Object.entries(intentTerms).map(([intent, terms]) => ({ intent, score: terms.reduce((score, term) => score + (query.includes(term) ? (term.includes(" ") ? 2 : 1) : 0), 0) })).sort((a, b) => b.score - a.score);
  return ranked[0]?.score ? ranked[0].intent : "unknown";
}

export const intentTermsMap = intentTerms;
