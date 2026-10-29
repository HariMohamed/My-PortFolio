import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadProjects } from './load-projects.mjs';
import { ogImageSize, personRole, profileLinks, projectSeo, siteName, siteUrl } from '../src/utils/seo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const projects = await loadProjects();

// Values come from trusted project data, but are still escaped: titles and summaries may contain & < > or quotes.
const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// JSON inside <script>: "<" is escaped so no value can close the tag early.
const jsonForScript = (value) => JSON.stringify(value, null, 2).replace(/</g, '\\u003c').replace(/\n/g, '\n      ');

// 1. Generate static HTML files for each project
const projectsDir = path.join(rootDir, 'projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir);
}

projects.forEach((project) => {
  const projectDir = path.join(projectsDir, project.slug);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
  }

  const seo = projectSeo(project);

  // A missing preview must fail the build instead of shipping a broken social card.
  const imageFile = path.join(rootDir, 'public', 'og', `${project.slug}.jpg`);
  if (!fs.existsSync(imageFile)) {
    throw new Error(`[generate] Missing social preview public/og/${project.slug}.jpg (run: node scripts/generate-og-images.mjs).`);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${seo.url}#project`,
    "name": project.title,
    "description": project.summary,
    "url": seo.url,
    "image": seo.image,
    "inLanguage": "en",
    "keywords": project.stack.join(", "),
    ...(project.period ? { "dateCreated": String(project.period) } : {}),
    "author": {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": siteName
    },
    "isPartOf": {
      "@id": `${siteUrl}/#website`
    }
  };

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="description" content="${esc(seo.description)}" />
    <meta name="author" content="${siteName}" />
    <meta name="theme-color" content="#090909" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${seo.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${esc(seo.title)}" />
    <meta property="og:description" content="${esc(seo.description)}" />
    <meta property="og:url" content="${seo.url}" />
    <meta property="og:image" content="${seo.image}" />
    <meta property="og:image:type" content="${ogImageSize.type}" />
    <meta property="og:image:width" content="${ogImageSize.width}" />
    <meta property="og:image:height" content="${ogImageSize.height}" />
    <meta property="og:image:alt" content="${esc(seo.imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(seo.title)}" />
    <meta name="twitter:description" content="${esc(seo.description)}" />
    <meta name="twitter:image" content="${seo.image}" />
    <meta name="twitter:image:alt" content="${esc(seo.imageAlt)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" />
    <link rel="icon" type="image/svg+xml" href="/brand/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png" />
    <link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
    <script type="application/ld+json">
      ${jsonForScript(jsonLd)}
    </script>
    <title>${esc(seo.title)}</title>
  </head>
  <body>
    <div id="root"></div>
    <noscript>
      <main>
        <h1>${esc(project.title)}</h1>
        <p>${esc(project.category)} &middot; ${esc(project.maturity)}</p>
        <p>${esc(project.summary)}</p>
        <p>Technologies: ${esc(project.stack.join(', '))}</p>
        <p><a href="/">Back to the ${siteName} portfolio</a>${project.links.live ? ` &middot; <a href="${esc(project.links.live)}" rel="noopener noreferrer">Live product</a>` : ''}</p>
      </main>
    </noscript>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(projectDir, 'index.html'), html, 'utf8');
});
console.log('✓ Generated static project HTML shells');

// 2. Generate sitemap.xml
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
let sitemapUrls = `<url>\n    <loc>${siteUrl}/</loc>\n  </url>\n`;
projects.forEach((project) => {
  sitemapUrls += `  <url>\n    <loc>${siteUrl}/projects/${project.slug}</loc>\n  </url>\n`;
});
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapUrls.trim()}
</urlset>`;
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✓ Generated sitemap.xml');

// 3. Generate llms.txt
const llmsPath = path.join(rootDir, 'public', 'llms.txt');
let llmsContent = `# ${siteName} - Portfolio Context

**Identity:** ${siteName}
**Role:** ${personRole}
**Canonical URL:** ${siteUrl}/
**Profiles:** GitHub ${profileLinks.github} | LinkedIn ${profileLinks.linkedin}

## Projects

`;

projects.forEach((project, index) => {
  llmsContent += `### ${index + 1}. ${project.title}
* **Status:** ${project.maturity}
* **Description:** ${project.summary}
* **Role:** ${project.contribution.join("; ")}
* **Technologies:** ${project.stack.join(", ")}
* **Case Study:** ${siteUrl}/projects/${project.slug}
`;
  if (project.links.live) {
    llmsContent += `* **Live Product:** ${project.links.live}\n`;
  }
  if (project.repository) {
    llmsContent += `* **Repository:** ${project.repository.url || "Unavailable (Private)"}\n`;
  }
  llmsContent += `\n`;
});

fs.writeFileSync(llmsPath, llmsContent.trim() + '\n', 'utf8');
console.log('✓ Generated llms.txt');
