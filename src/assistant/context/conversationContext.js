import { getProjectBySlug } from "../../data/projects";

export function getPageContext(location) {
  const projectMatch = location.pathname.match(/^\/projects\/([^/]+)/);
  const project = projectMatch ? getProjectBySlug(projectMatch[1]) : null;
  const visibleSection = !location.hash && location.pathname === "/" && typeof document !== "undefined"
    ? ["experience", "skills", "education", "focus", "contact"].find((id) => {
      const element = document.getElementById(id);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2;
    })
    : null;
  const section = location.hash ? location.hash.slice(1) : visibleSection;
  return { pathname: location.pathname, section, project };
}

export function getContextualIntroduction(pageContext) {
  if (pageContext.project) return `You're viewing ${pageContext.project.title}. Ask me about the project, technologies, contribution, or available evidence.`;
  if (["experience", "education"].includes(pageContext.section)) return "Ask me about Hari's professional experience or technical background.";
  return "Hi — I can help you explore Hari's projects, skills, and experience.";
}

export function createConversationContext(pageContext) {
  return { pageContext, project: pageContext.project || null, history: [] };
}
