import { test, expect } from "@playwright/test";

async function openAssistant(page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Ask about my work" }).click();
  return page.getByLabel("Ask about the portfolio");
}

// "weather" questions are not answered by the client router, so they always reach the (mocked) API.
async function send(input, text = "What is the weather in Paris?") {
  await input.fill(text);
  await input.press("Enter");
}

test.describe("Assistant message rendering", () => {
  const answer = [
    "Intro with **bold text**, *italic text* and a [safe link](https://example.com/a).",
    "",
    "- first bullet",
    "- second **bold** bullet",
    "",
    "1. step one",
    "2. step two",
    "",
    "| Role | Organization |",
    "|------|--------------|",
    "| Dev | Acme<br>Labs |",
    "",
    "Bad [js link](javascript:window.__xss=1) and <script>window.__xss=2</script> and <img src=x onerror=window.__xss=3>",
    "line A",
    "line B",
  ].join("\n");

  test("renders a safe Markdown subset and shows HTML-like content as inert text", async ({ page }) => {
    await page.route("**/api/chat", (route) => route.fulfill({ json: { answer } }));
    const input = await openAssistant(page);
    await send(input);
    const box = page.locator(".assistant-text").last();
    await expect(box.locator("strong").first()).toHaveText("bold text");
    await expect(box.locator("em")).toHaveText("italic text");
    await expect(box.locator("ul li")).toHaveCount(2);
    await expect(box.locator("ul li strong")).toHaveText("bold");
    await expect(box.locator("ol li")).toHaveCount(2);

    const link = box.getByRole("link", { name: "safe link" });
    await expect(link).toHaveAttribute("href", "https://example.com/a");
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(box.locator("a[href^='javascript']")).toHaveCount(0);
    await expect(box.getByText("js link")).toBeVisible();

    // Tables are flattened to readable lines: no pipes, no separator row, <br> becomes a line break.
    const text = await box.innerText();
    expect(text).toContain("Role · Organization");
    expect(text).toContain("Dev · Acme");
    expect(text).not.toContain("|");
    expect(text).not.toContain("------");
    expect(text).toContain("line A");

    // Script and event-handler markup stays visible as text and never executes or becomes elements.
    expect(text).toContain("<script>window.__xss=2</script>");
    await expect(box.locator("script, img")).toHaveCount(0);
    expect(await page.evaluate(() => window.__xss)).toBeUndefined();
    expect(text).not.toMatch(/\*\*/);
  });

  test("keeps separate lines of one paragraph on separate lines", async ({ page }) => {
    await page.route("**/api/chat", (route) => route.fulfill({ json: { answer: "line A\nline B" } }));
    const input = await openAssistant(page);
    await send(input);
    const p = page.locator(".assistant-text p").last();
    await expect(p.locator("br")).toHaveCount(1);
    expect(await p.innerText()).toBe("line A\nline B");
  });
});

test.describe("Assistant error and contact states", () => {
  const cases = [
    [429, "provider_busy", /rate-limiting requests/],
    [429, "rate_limited", /sending questions quickly/],
    [504, "provider_timeout", /took too long/],
    [502, "invalid_provider_response", /unusable response/],
    [502, "provider_unavailable", /temporarily unavailable/],
    [500, "internal_error", /temporarily unavailable/],
  ];
  for (const [status, code, message] of cases) {
    test(`shows a distinct message for ${code} and re-enables input`, async ({ page }) => {
      await page.route("**/api/chat", (route) => route.fulfill({ status, json: { error: "x", code } }));
      const input = await openAssistant(page);
      await send(input);
      await expect(page.locator(".assistant-text").last()).toContainText(message);
      await expect(input).toBeEnabled();
    });
  }

  test("a published phone number is answered locally and matches the Contact section", async ({ page }) => {
    let apiCalls = 0;
    await page.route("**/api/chat", (route) => { apiCalls++; return route.fulfill({ json: { answer: "model guess +999 000 000" } }); });
    const input = await openAssistant(page);
    const published = (await page.locator('a[href^="tel:"]').first().innerText()).replace(/^[^+\d]*/, "").trim();
    expect(published.replace(/\D/g, "").length).toBeGreaterThanOrEqual(8);
    await send(input, "What is Hari's phone number?");
    const box = page.locator(".assistant-text").last();
    await expect(box).toContainText(published);
    await expect(box).not.toContainText("999");
    expect(apiCalls).toBe(0);
  });
});

test.describe("Assistant server-generated refusals", () => {
  test("shows a server scope refusal as a normal answer, not as an error", async ({ page }) => {
    const refusal = "I can only answer questions about Hari's portfolio: his projects, skills, experience, education, and contact details.";
    await page.route("**/api/chat", (route) => route.fulfill({ json: { answer: refusal, code: "out_of_scope" } }));
    const input = await openAssistant(page);
    await send(input, "What is the weather in Paris?");
    const box = page.locator(".assistant-text").last();
    await expect(box).toHaveText(refusal);
    await expect(page.getByText(/temporarily unavailable|rate-limiting|took too long|unusable response/)).toHaveCount(0);
    await expect(input).toBeEnabled();
  });

  test("shows the honest unavailable answer for missing personal facts", async ({ page }) => {
    const answer = "That information isn't available in Hari's public portfolio.";
    await page.route("**/api/chat", (route) => route.fulfill({ json: { answer, code: "info_unavailable" } }));
    const input = await openAssistant(page);
    await send(input, "What is the weather in Paris?");
    await expect(page.locator(".assistant-text").last()).toHaveText(answer);
  });
});
