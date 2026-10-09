import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import viteConfig from "../vite.config.js";
import { loadProjects } from "../scripts/load-projects.mjs";

// Node-only checks (no browser). Test groups, from weakest to strongest evidence:
//   1. Data/configuration assertions (read the repo, never write to it).
//   2. Generation and build checks run in an ISOLATED COPY of the repo under
//      test-results/ (gitignored), so tracked outputs such as public/sitemap.xml
//      are never rewritten by the tests.
//   3. A local HTTP server that EMULATES the repo's vercel.json rewrites over the
//      built dist/. This is a local emulation, NOT proof of Vercel's behavior.
// Anything that depends on Vercel itself (real 404 status, custom 404.html use,
// trailing-slash handling, clean URLs) requires a Preview deployment.

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://harimohamedrizq.vercel.app";
const expectedSlugs = ["syndicai", "elalaouilabo", "gym-coaching-saas", "cfqma-platform", "orabella"];
const read = (...p) => fs.readFileSync(path.join(root, ...p), "utf8");
const lf = (text) => text.replace(/\r\n/g, "\n");
const sha = (file) => crypto.createHash("sha256").update(lf(fs.readFileSync(file, "utf8"))).digest("hex");

const scratchRoot = path.join(root, "test-results");
const scratchDirs = [];
function scratchDir(name) {
  fs.mkdirSync(scratchRoot, { recursive: true });
  const dir = fs.mkdtempSync(path.join(scratchRoot, `${name}-`));
  scratchDirs.push(dir);
  return dir;
}

// ---- Isolated workspace (lazy, so every test can run on its own) ----------------
let workspace;
function getWorkspace() {
  if (workspace) return workspace;
  const dir = scratchDir("ws");
  for (const file of ["index.html", "package.json", "vite.config.js", "postcss.config.js", "tailwind.config.js", "hari-mohamed-rizq-cv-2026.pdf"]) {
    fs.copyFileSync(path.join(root, file), path.join(dir, file));
  }
  for (const folder of ["src", "public", "scripts", "projects"]) {
    // Generated project shells are not copied, so tests prove they get generated.
    fs.cpSync(path.join(root, folder), path.join(dir, folder), {
      recursive: true,
      filter: (src) => !(folder === "projects" && path.basename(src) === "index.html"),
    });
  }
  workspace = { dir, hashes: {} };
  return workspace;
}

const run = (cwd, args) => execFileSync(process.execPath, args, { cwd, stdio: "pipe", encoding: "utf8" });
const generatedFiles = (dir) => [
  path.join(dir, "public", "sitemap.xml"),
  path.join(dir, "public", "llms.txt"),
  ...expectedSlugs.map((s) => path.join(dir, "projects", s, "index.html")),
];

function generated() {
  const ws = getWorkspace();
  if (!ws.hashes.first) {
    run(ws.dir, ["scripts/generate-project-pages.mjs"]);
    ws.hashes.first = generatedFiles(ws.dir).map(sha);
    run(ws.dir, ["scripts/generate-project-pages.mjs"]);
    ws.hashes.second = generatedFiles(ws.dir).map(sha);
  }
  return ws;
}

function built() {
  const ws = generated();
  if (!ws.built) {
    run(ws.dir, [path.join(root, "node_modules", "vite", "bin", "vite.js"), "build"]);
    ws.built = path.join(ws.dir, "dist");
  }
  return ws;
}

// ---- Loader validation fixtures ------------------------------------------------
const validProject = (overrides = "") =>
  `{ slug: "demo", title: "Demo", category: "Cat", summary: "Sum", maturity: "Live", stack: ["A"], contribution: ["B"], links: {} ${overrides} }`;

function runLoader(projectsSource) {
  const dir = scratchDir("loader");
  fs.mkdirSync(path.join(dir, "scripts"));
  fs.mkdirSync(path.join(dir, "src", "data"), { recursive: true });
  fs.copyFileSync(path.join(root, "scripts", "load-projects.mjs"), path.join(dir, "scripts", "load-projects.mjs"));
  fs.writeFileSync(path.join(dir, "src", "data", "projects.js"), projectsSource);
  try {
    const out = execFileSync(
      process.execPath,
      ["--input-type=module", "-e", `const m = await import("./scripts/load-projects.mjs"); process.stdout.write(String((await m.loadProjects()).length));`],
      { cwd: dir, stdio: "pipe", encoding: "utf8" },
    );
    return { ok: true, out: out.trim() };
  } catch (error) {
    return { ok: false, err: String(error.stderr) };
  }
}

// ---- Local emulation of vercel.json over dist/ ---------------------------------
const MIME = { ".html": "text/html; charset=utf-8", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

function startEmulator(distDir) {
  const { rewrites = [] } = JSON.parse(read("vercel.json"));
  const exists = (p) => fs.existsSync(p) && fs.statSync(p).isFile();
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = null;
    // Assumption: static files are served before rewrites; directories serve index.html only with a trailing slash.
    if (pathname.endsWith("/") && exists(path.join(distDir, pathname, "index.html"))) file = path.join(distDir, pathname, "index.html");
    else if (!pathname.endsWith("/") && exists(path.join(distDir, pathname))) file = path.join(distDir, pathname);
    if (!file) {
      for (const { source, destination } of rewrites) {
        // Assumption: a trailing slash is tolerated by rewrite sources.
        const regex = new RegExp("^" + source.replace(/:(\w+)/g, "(?<$1>[^/]+)").replace(/\(\.\*\)/g, "(.*)") + "/?$");
        const match = pathname.match(regex);
        if (!match) continue;
        const target = path.join(distDir, destination.replace(/:(\w+)/g, (_, k) => match.groups?.[k] ?? ""));
        if (exists(target)) file = target;
        break;
      }
    }
    const status = file ? 200 : 404;
    const body = file ?? path.join(distDir, "404.html");
    res.writeHead(status, { "content-type": MIME[path.extname(body)] ?? "application/octet-stream" });
    res.end(exists(body) ? fs.readFileSync(body) : "Not found");
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve({ server, base: `http://127.0.0.1:${server.address().port}` })));
}

test.describe.configure({ mode: "serial" });

test.describe("Routing and SEO regression", () => {
  test.skip(({ isMobile }) => isMobile, "Node-only checks run once");
  test.setTimeout(120000);

  test.afterAll(() => {
    for (const dir of scratchDirs) fs.rmSync(dir, { recursive: true, force: true });
  });

  // ===== 1. Data and configuration (read-only) =====================================
  test("[config] project data has the five published slugs, including OraBella", async () => {
    const projects = await loadProjects();
    expect(projects.map((p) => p.slug)).toEqual(expectedSlugs);
  });

  test("[config] Vite build inputs are derived from the same project data", async () => {
    const projects = await loadProjects();
    const inputKeys = Object.keys(viteConfig.build.rollupOptions.input).filter((k) => k !== "main");
    expect(inputKeys).toEqual(projects.map((p) => p.slug));
    expect(inputKeys).toEqual(expectedSlugs);
  });

  test("[config] vercel.json keeps the project rewrite and has no catch-all SPA rewrite", async () => {
    const { rewrites = [] } = JSON.parse(read("vercel.json"));
    expect(rewrites).toContainEqual({ source: "/projects/:slug", destination: "/projects/:slug/index.html" });
    expect(rewrites.filter((r) => /\(\.\*\)|\*/.test(r.source) || r.destination === "/index.html")).toEqual([]);
    expect(read("public", "404.html")).toContain('name="robots" content="noindex"');
  });

  // ===== loader validation ======================================================
  test("[loader] accepts valid data and rejects invalid project data loudly", async () => {
    const valid = runLoader(`export const projects = [${validProject()}];`);
    expect(valid.ok).toBe(true);
    expect(valid.out.match(/\d+/)?.[0]).toBe("1");

    const rejected = [
      ["missing slug", `export const projects = [${validProject().replace('slug: "demo",', "")}];`, /missing a non-empty "slug"/],
      ["empty slug", `export const projects = [${validProject().replace('"demo"', '""')}];`, /missing a non-empty "slug"/],
      ["invalid slug", `export const projects = [${validProject().replace('"demo"', '"Bad Slug"')}];`, /invalid slug/],
      ["duplicate slug", `export const projects = [${validProject()}, ${validProject()}];`, /duplicates an earlier slug/],
      ["empty list", `export const projects = [];`, /non-empty "projects" array/],
      ["missing title", `export const projects = [${validProject().replace('title: "Demo",', "")}];`, /"title"/],
      ["empty stack", `export const projects = [${validProject().replace('stack: ["A"]', "stack: []")}];`, /"stack"/],
      ["unsupported import", `import x from "../a.webp";\nexport const projects = [${validProject()}];`, /cannot strip/],
    ];
    for (const [label, source, message] of rejected) {
      const result = runLoader(source);
      expect(result.ok, label).toBe(false);
      expect(result.err, label).toMatch(message);
    }
  });

  // ===== 2. Generation in an isolated copy ==================================
  test("[generate] output is deterministic and no temp file is written to the source tree", async () => {
    const ws = generated();
    expect(ws.hashes.second).toEqual(ws.hashes.first);
    expect(fs.existsSync(path.join(ws.dir, "src", "data", "projects-temp.js"))).toBe(false);
    expect(fs.existsSync(path.join(root, "src", "data", "projects-temp.js"))).toBe(false);
  });

  test("[generate] generated sitemap and llms.txt match the tracked copies (read-only comparison)", async () => {
    const ws = generated();
    for (const file of ["sitemap.xml", "llms.txt"]) {
      expect(lf(fs.readFileSync(path.join(ws.dir, "public", file), "utf8")), `${file} is stale or has local edits`).toBe(lf(read("public", file)));
    }
  });

  test("[generate] project pages have the correct canonical, title and JSON-LD; sitemap matches the data", async () => {
    const ws = generated();
    const projects = await loadProjects();
    for (const project of projects) {
      const html = fs.readFileSync(path.join(ws.dir, "projects", project.slug, "index.html"), "utf8");
      const canonical = `${siteUrl}/projects/${project.slug}`;
      expect(html.match(/<link rel="canonical"/g)).toHaveLength(1);
      expect(html).toContain(`<link rel="canonical" href="${canonical}" />`);
      expect(html).toContain(`<meta property="og:url" content="${canonical}" />`);
      expect(html).toContain(`<title>Building ${project.title}`);
      const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
      expect(ld).toHaveLength(1);
      expect(JSON.parse(ld[0].replace(/<\/?script[^>]*>/g, "")).url).toBe(canonical);
    }
    const urls = [...fs.readFileSync(path.join(ws.dir, "public", "sitemap.xml"), "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    expect(urls).toEqual([`${siteUrl}/`, ...projects.map((p) => `${siteUrl}/projects/${p.slug}`)]);
    expect(urls).toEqual([`${siteUrl}/`, ...expectedSlugs.map((s) => `${siteUrl}/projects/${s}`)]);
    const llms = fs.readFileSync(path.join(ws.dir, "public", "llms.txt"), "utf8");
    projects.forEach((p) => expect(llms).toContain(`${siteUrl}/projects/${p.slug}`));
    expect(read("index.html")).toContain(`<link rel="canonical" href="${siteUrl}/" />`);
  });

  // ===== 3. Built output (isolated build) ===================================
  test("[build] dist contains the homepage, the 404 page and all five project pages", async () => {
    const dist = built().built;
    for (const file of ["index.html", "404.html", "sitemap.xml", "robots.txt", "llms.txt"]) {
      expect(fs.existsSync(path.join(dist, file)), file).toBe(true);
    }
    for (const slug of expectedSlugs) {
      const html = fs.readFileSync(path.join(dist, "projects", slug, "index.html"), "utf8");
      expect(html).toContain(`<link rel="canonical" href="${siteUrl}/projects/${slug}" />`);
    }
    expect(fs.readFileSync(path.join(dist, "404.html"), "utf8")).toContain("noindex");
    expect(lf(fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8"))).toBe(lf(read("public", "sitemap.xml")));
  });

  // ===== 4. Local HTTP emulation of vercel.json over dist (NOT Vercel) ============
  test("[emulated http] valid routes return 200 and invalid routes return the 404 page", async () => {
    const { server, base } = await startEmulator(built().built);
    try {
      const get = async (route) => {
        const res = await fetch(base + route, { redirect: "manual" });
        return { status: res.status, type: res.headers.get("content-type"), body: await res.text() };
      };
      const home = await get("/");
      expect(home.status).toBe(200);
      expect(home.body).toContain(`<link rel="canonical" href="${siteUrl}/" />`);

      for (const slug of expectedSlugs) {
        for (const route of [`/projects/${slug}`, `/projects/${slug}/`]) {
          const res = await get(route);
          expect(res.status, route).toBe(200);
          expect(res.type, route).toContain("text/html");
          // The canonical never carries a trailing slash, whichever form was requested.
          expect(res.body, route).toContain(`<link rel="canonical" href="${siteUrl}/projects/${slug}" />`);
        }
      }
      for (const route of ["/projects/nope", "/projects/nope/", "/projects/nope/extra", "/projects", "/random", "/favicon.ico"]) {
        const res = await get(route);
        expect(res.status, route).toBe(404);
        expect(res.body, route).toContain("Page not found");
      }
      expect((await get("/sitemap.xml")).status).toBe(200);
    } finally {
      server.close();
    }
  });

  // Deployment-dependent (cannot be established locally; verify on a Vercel Preview):
  //   - real HTTP 404 status for unmatched paths and use of 404.html
  //   - behavior of /projects/<slug>/ (trailing slash) and whether any redirect occurs
  //   - clean-URL / trailing-slash project settings that override vercel.json
});
