import { test, expect } from "@playwright/test";

test.describe("Portfolio refinement", () => {
  test("centers independent Experience and Education timelines", async ({ page }) => {
    await page.goto("/");

    for (const id of ["experience", "education"]) {
      const heading = page.locator(`#${id} .section-title`);
      await expect(heading).toHaveClass(/section-title-center/);
      await expect(heading.locator("h2")).toHaveCSS("text-align", "center");
      await expect(page.locator(`#${id} .timeline`)).toBeVisible();
    }

    await expect(page.locator(".timeline-item-exp, .timeline-item-edu")).toHaveCount(0);
    await expect(page.locator(".timeline-item-left")).not.toHaveCount(0);
    await expect(page.locator(".timeline-item-right")).not.toHaveCount(0);
  });

  test("answers typed questions with evidence-safe navigation and context", async ({ page }) => {
    await page.goto("/");
    const assistant = page.locator(".ai-panel").last();
    const input = page.locator("#portfolio-question");

    await input.fill("Tell me about SyndicAI.");
    await input.press("Enter");
    await expect(assistant).toContainText("SyndicAI is a deployed saas mvp");
    await expect(assistant).toContainText("repository is private");
    await expect(assistant.locator('a[href="/projects/syndicai"]').first()).toBeVisible();

    await input.fill("What technologies did you use?");
    await input.press("Enter");
    await expect(assistant).toContainText("SyndicAI uses");

    await input.fill("Can I see the source code?");
    await input.press("Enter");
    await expect(assistant).toContainText("repositories are private");
    await expect(assistant).not.toContainText("93 tables");
  });
});
