// Generates the per-project social preview images (public/og/<slug>.jpg, 1200x630 JPEG).
//
// Run manually when a project, its title/category or its screenshot changes:  node scripts/generate-og-images.mjs
// The JPEGs are committed; the Vercel build only checks that they exist (scripts/generate-project-pages.mjs) and does
// not need a browser. Needs network access once per run for the site's Google Fonts (Bebas Neue, Inter, JetBrains Mono);
// the script stops instead of silently falling back to other fonts.
//
// Content is limited to real project data (title, category, period, stack) and the project's authentic screenshot.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import { loadProjects } from './load-projects.mjs';
import { ogImageSize, personRole, siteName, siteUrl } from '../src/utils/seo.js';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(rootDir, 'public', 'og');
fs.mkdirSync(outDir, { recursive: true });

// Which part of the (wider) screenshot stays visible in the frame.
const focus = { 'cfqma-platform': 'left top' }; // its content is left-aligned; the other screenshots are centred

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const dataUri = (file, mime) => `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
const host = new URL(siteUrl).host;
const mark = dataUri(path.join(rootDir, 'public', 'brand', 'symbol-mint.svg'), 'image/svg+xml');

function screenshotFor(slug) {
  const dir = path.join(rootDir, 'projects', slug);
  const file = fs.readdirSync(dir).find((name) => /\.(png|jpe?g|webp)$/i.test(name));
  if (!file) throw new Error(`No screenshot found in projects/${slug}/`);
  const ext = path.extname(file).slice(1).toLowerCase();
  return dataUri(path.join(dir, file), `image/${ext === 'jpg' ? 'jpeg' : ext}`);
}

function card(project) {
  const chips = project.stack.slice(0, 4).map((s) => `<span>${esc(s)}</span>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:${ogImageSize.width}px;height:${ogImageSize.height}px;overflow:hidden;background:#09090b;color:#f8fafc;font-family:Inter,sans-serif;position:relative}
  .glow{position:absolute;inset:0;background:radial-gradient(circle at 12% -10%,rgba(68,230,169,.16),transparent 55%)}
  .left{position:absolute;left:64px;top:56px;bottom:52px;width:490px;display:flex;flex-direction:column}
  .brand{display:flex;align-items:center;gap:14px;font-weight:600;font-size:22px;color:#f8fafc}
  .brand img{width:40px;height:40px}
  .main{margin-top:auto;margin-bottom:auto;padding-top:8px}
  .eyebrow{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:19px;letter-spacing:.08em;text-transform:uppercase;color:#44e6a9}
  h1{font-family:'Bebas Neue',sans-serif;font-weight:400;font-size:104px;line-height:.95;text-transform:uppercase;margin-top:14px;color:#fff}
  .cat{margin-top:18px;font-size:27px;line-height:1.3;color:#cbd5e1}
  .chips{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
  .chips span{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:17px;color:#cbd5e1;border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:6px 12px}
  .foot{font-size:19px;color:#94a3b8;line-height:1.4}
  .foot b{color:#f8fafc;font-weight:600}
  .frame{position:absolute;left:596px;top:126px;width:540px;height:378px;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.16);box-shadow:0 30px 80px -20px rgba(0,0,0,.8),0 0 0 1px rgba(68,230,169,.10);background:#111}
  .bar{height:30px;background:#16181d;display:flex;align-items:center;gap:7px;padding-left:14px}
  .bar i{width:10px;height:10px;border-radius:50%;background:#3b4048}
  .shot{display:block;width:100%;height:348px;object-fit:cover;object-position:${focus[project.slug] || 'center top'}}
</style></head><body>
<div class="glow"></div>
<div class="left">
  <div class="brand"><img src="${mark}" alt=""><span>${esc(siteName)}</span></div>
  <div class="main">
    <div class="eyebrow">Case study${project.period ? ` &middot; ${esc(project.period)}` : ''}</div>
    <h1>${esc(project.title)}</h1>
    <div class="cat">${esc(project.category)}</div>
  </div>
  <div class="chips">${chips}</div>
  <div class="foot"><b>${esc(personRole)}</b><br>${esc(host)}</div>
</div>
<div class="frame"><div class="bar"><i></i><i></i><i></i></div><img class="shot" src="${screenshotFor(project.slug)}" alt=""></div>
</body></html>`;
}

const projects = await loadProjects();
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: ogImageSize.width, height: ogImageSize.height } });
  for (const project of projects) {
    await page.setContent(card(project), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const loaded = await page.evaluate(() => ['104px "Bebas Neue"', '27px Inter', '17px "JetBrains Mono"'].every((f) => document.fonts.check(f)));
    if (!loaded) throw new Error('Site fonts did not load (offline?). Refusing to render a card with fallback fonts.');
    const file = path.join(outDir, `${project.slug}.jpg`);
    await page.screenshot({ path: file, type: 'jpeg', quality: 86 });
    console.log(`✓ public/og/${project.slug}.jpg (${Math.round(fs.statSync(file).size / 1024)} KB)`);
  }
} finally {
  await browser.close();
}
