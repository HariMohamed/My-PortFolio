import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) {
  throw new Error(`[load-projects] ${message}`);
}

function assertText(project, field, label) {
  if (typeof project[field] !== 'string' || project[field].trim() === '') {
    fail(`${label} is missing a non-empty "${field}" string.`);
  }
}

function assertList(project, field, label) {
  if (!Array.isArray(project[field]) || project[field].length === 0) {
    fail(`${label} is missing a non-empty "${field}" array.`);
  }
}

// Fails loudly instead of silently generating wrong routes, sitemap entries or pages.
export function validateProjects(projects) {
  if (!Array.isArray(projects) || projects.length === 0) {
    fail('src/data/projects.js must export a non-empty "projects" array.');
  }
  const seen = new Set();
  projects.forEach((project, index) => {
    if (project === null || typeof project !== 'object') {
      fail(`projects[${index}] is not an object.`);
    }
    if (typeof project.slug !== 'string' || project.slug === '') {
      fail(`projects[${index}] is missing a non-empty "slug".`);
    }
    const label = `Project "${project.slug}" (projects[${index}])`;
    if (!SLUG_PATTERN.test(project.slug)) {
      fail(`${label} has an invalid slug. Use lowercase letters, digits and single hyphens (e.g. "gym-coaching-saas").`);
    }
    if (seen.has(project.slug)) {
      fail(`${label} duplicates an earlier slug; slugs must be unique.`);
    }
    seen.add(project.slug);
    ['title', 'category', 'summary', 'maturity'].forEach((field) => assertText(project, field, label));
    ['stack', 'contribution'].forEach((field) => assertList(project, field, label));
    if (project.links === null || typeof project.links !== 'object') {
      fail(`${label} is missing a "links" object.`);
    }
  });
  return projects;
}

// Single loader for the authoritative project data (src/data/projects.js).
// Node cannot import the PNG screenshots, so they are stripped and the module is
// evaluated in memory (no temporary file is written to the source tree).
// Limitation: only double-quoted `import ... .png";` lines are stripped. Any other
// import left in the data file is rejected below instead of failing obscurely.
export async function loadProjects() {
  const content = fs.readFileSync(path.join(rootDir, 'src', 'data', 'projects.js'), 'utf8');
  const sanitized = content
    .replace(/import.*?\.png";/g, '')
    .replace(/screenshot: [a-zA-Z]+/g, 'screenshot: null');
  if (/^\s*import\s/m.test(sanitized)) {
    fail(
      'src/data/projects.js contains an import that this loader cannot strip. ' +
        'Only double-quoted ".png" image imports are supported; extend scripts/load-projects.mjs deliberately if a new format is needed.',
    );
  }
  const url = 'data:text/javascript;base64,' + Buffer.from(sanitized, 'utf8').toString('base64');
  const { projects } = await import(url);
  return validateProjects(projects);
}
