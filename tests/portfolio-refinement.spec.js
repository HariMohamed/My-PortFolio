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

  test("floating assistant answers typed questions with evidence-safe navigation and context", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Ask about my work" });
    await expect(trigger).toBeVisible();
    await trigger.click();
    const assistant = page.locator("[data-testid=\"floating-assistant\"]");
    const input = page.locator("#portfolio-question");
    await expect(input).toBeFocused();

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

    await page.keyboard.press("Escape");
    await expect(page.locator("#assistant-dialog")).toHaveCount(0);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("uses project context in the floating assistant", async ({ page }) => {
    await page.goto("/projects/syndicai");
    await page.getByRole("button", { name: "Ask about my work" }).click();
    const assistant = page.locator("[data-testid=\"floating-assistant\"]");
    await expect(assistant).toContainText("You're viewing SyndicAI");
    await assistant.locator("#portfolio-question").fill("What technologies were used?");
    await assistant.locator("#portfolio-question").press("Enter");
    await expect(assistant).toContainText("SyndicAI uses");
  });
});
