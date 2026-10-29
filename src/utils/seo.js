// Single source of truth for page SEO values. Pure ESM with no imports and no DOM access, so the browser
// (src/utils/metadata.js) and the Node build script (scripts/generate-project-pages.mjs) share the same rules.

export const siteUrl = "https://harimohamedrizq.vercel.app";
export const siteName = "Hari Mohamed Rizq";
export const personRole = "Full-Stack Developer & AI Integration Engineer";

// Public profiles; keep in step with src/data/profile.js (tests/routing-seo.spec.js asserts they match).
export const profileLinks = {
  github: "https://github.com/HariMohamed",
  linkedin: "https://www.linkedin.com/in/mohamed-rizq-hari-4a6416249/",
};

// Social preview images are 1200x630 JPEGs. The homepage keeps the original og-image.jpg; each case study has
// public/og/<slug>.jpg, produced by scripts/generate-og-images.mjs from the project's real screenshot.
export const ogImageSize = { width: 1200, height: 630, type: "image/jpeg" };

export const homeSeo = {
  title: `${siteName} | ${personRole}`,
  description: `${siteName} — ${personRole}. Building web applications, SaaS platforms, and AI-powered systems.`,
  url: `${siteUrl}/`,
  image: `${siteUrl}/og-image.jpg`,
  imageAlt: `${siteName}, ${personRole}`,
};

export function projectSeo(project) {
  const url = `${siteUrl}/projects/${project.slug}`;
  return {
    title: `${project.title} — ${project.category} | ${siteName}`,
    description: project.summary,
    url,
    image: `${siteUrl}/og/${project.slug}.jpg`,
    imageAlt: `${project.title} case study: ${project.category}, by ${siteName}`,
  };
}
