import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Read and sanitize projects.js to bypass image imports
const projectsJsPath = path.join(rootDir, 'src', 'data', 'projects.js');
const tempJsPath = path.join(rootDir, 'src', 'data', 'projects-temp.js');
const content = fs.readFileSync(projectsJsPath, 'utf8');
const sanitized = content
  .replace(/import.*?\.png";/g, '')
  .replace(/screenshot: [a-zA-Z]+/g, 'screenshot: null');
fs.writeFileSync(tempJsPath, sanitized);

const { projects } = await import('../src/data/projects-temp.js');

const siteUrl = "https://harimohamedrizq.vercel.app";

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

  const title = `Building ${project.title} \u2014 ${project.category} | Hari Mohamed Rizq`;
  const canonical = `${siteUrl}/projects/${project.slug}`;
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonical}#project`,
    "name": project.title,
    "description": project.summary,
    "url": canonical,
    "image": `${siteUrl}/og-image.jpg`,
    "author": {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Hari Mohamed Rizq"
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
    <meta name="description" content="${project.summary.replace(/"/g, '&quot;')}" />
    <meta name="author" content="Hari Mohamed Rizq" />
    <meta name="theme-color" content="#090909" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${project.summary.replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}/og-image.jpg" />
    <meta property="og:image:alt" content="${project.title} project case study by Hari Mohamed Rizq" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${project.summary.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${siteUrl}/og-image.jpg" />
    <meta name="twitter:image:alt" content="${project.title} project case study by Hari Mohamed Rizq" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='16' fill='%23090909'/%3E%3Cpath d='M18 72h64v8H18z' fill='%2300f58c'/%3E%3Ctext x='50' y='61' font-family='Arial,sans-serif' font-size='42' font-weight='800' fill='%23f5f5f5' text-anchor='middle'%3EHR%3C/text%3E%3C/svg%3E" />
    <script type="application/ld+json">
      ${JSON.stringify(jsonLd, null, 2).replace(/\n/g, '\n      ')}
    </script>
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(projectDir, 'index.html'), html, 'utf8');
});
console.log('âœ“ Generated static project HTML shells');

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
console.log('âœ“ Generated sitemap.xml');

// 3. Generate llms.txt
const llmsPath = path.join(rootDir, 'public', 'llms.txt');
let llmsContent = `# Hari Mohamed Rizq - Portfolio Context

**Identity:** Hari Mohamed Rizq
**Role:** Full-Stack Developer & AI Integration Engineer
**Canonical URL:** ${siteUrl}/

## Projects

`;

projects.forEach((project, index) => {
  llmsContent += `### ${index + 1}. ${project.title}
* **Status:** ${project.maturity}
* **Description:** ${project.summary}
* **Role:** ${project.contribution.join(", ")}
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

// Cleanup
if (fs.existsSync(tempJsPath)) {
  fs.unlinkSync(tempJsPath);
}
