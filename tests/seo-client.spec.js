import { test, expect } from "@playwright/test";
import { homeSeo, projectSeo } from "../src/utils/seo.js";
import { loadProjects } from "../scripts/load-projects.mjs";

// The dev server serves the homepage HTML for every route, so these tests exercise the client-side metadata that
// src/utils/metadata.js applies. The static per-project HTML (what crawlers receive) is covered in routing-seo.spec.js.
// The data file imports PNG screenshots, which Node cannot load; the shared loader strips them.
const projects = await loadProjects();
const meta = (page, selector) => page.locator(selector).getAttribute("content");

test.describe("Client-side SEO metadata", () => {
  test("a project route sets its own title, canonical and social image, and leaving restores the homepage values", async ({ page }) => {
    const project = projects.find((p) => p.slug === "orabella");
    const seo = projectSeo(project);

    await page.goto(`/projects/${project.slug}`);
    await expect(page).toHaveTitle(seo.title);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", seo.image);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", seo.image);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", seo.imageAlt);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", seo.url);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", seo.url);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
    expect(await page.locator('link[rel="canonical"]').count()).toBe(1);

    await page.locator("a.text-link", { hasText: "Back to projects" }).first().click();
    await expect(page).toHaveTitle(homeSeo.title);
    expect(await meta(page, 'meta[property="og:image"]')).toBe(homeSeo.image);
    expect(await meta(page, 'meta[name="twitter:image"]')).toBe(homeSeo.image);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", homeSeo.url);
  });

  test("an unknown project slug is marked noindex", async ({ page }) => {
    await page.goto("/projects/does-not-exist");
    await expect(page.locator("h1")).toHaveText("This case study does not exist.");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  });

  test("every project page has a unique title, a descriptive h1 and an accessible screenshot", async ({ page }) => {
    const titles = new Set();
    for (const project of projects) {
      await page.goto(`/projects/${project.slug}`);
      await expect(page.locator("h1")).toHaveText(project.title);
      titles.add(await page.title());
      await expect(page.locator(".detail-screenshot img")).toHaveAttribute("alt", /Screenshot of/);
    }
    expect(titles.size).toBe(projects.length);
  });
});
