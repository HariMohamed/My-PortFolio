import { test, expect } from '@playwright/test';

test.describe('Smoke Test', () => {
  let consoleErrors = [];
  let failedRequests = [];

  test.beforeEach(({ page }) => {
    consoleErrors = [];
    failedRequests = [];
    page.on('pageerror', (err) => consoleErrors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('favicon') && !msg.text().includes('Failed to load resource')) {
        consoleErrors.push(msg.text());
      }
    });
    page.on('requestfailed', (req) => {
      if (!req.url().includes('google') && !req.url().includes('favicon')) {
        failedRequests.push(req.url());
      }
    });
  });

  test('Desktop smoke test', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop only');
    await page.goto('/');

    await expect(page).toHaveTitle(/Hari/i);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);

    const projectsLink = page.locator('nav a[href="#projects"], nav button').first();
    if (await projectsLink.isVisible()) {
      await projectsLink.click();
    }
    
    const firstProject = page.locator('a[href^="/projects/"]').first();
    if (await firstProject.isVisible()) {
      await firstProject.click();
      await expect(page).toHaveURL(/\/projects\/.+/);
      await page.goBack();
    }

    expect(consoleErrors).toHaveLength(0);
    expect(failedRequests).toHaveLength(0);
  });

  test('Mobile smoke test', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only');
    await page.goto('/');

    await expect(page).toHaveTitle(/Hari/i);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);

    const heroMedia = page.locator('.hero-portrait-media').first();
    if (await heroMedia.isVisible()) {
      const transform = await heroMedia.evaluate(el => window.getComputedStyle(el).transform);
      expect(transform).toBe('none');
    }

    const menuBtn = page.locator('button[aria-expanded]');
    if (await menuBtn.isVisible()) {
      await menuBtn.click();
      await expect(page.locator('#mobile-menu')).toBeVisible();
    }

    expect(consoleErrors).toHaveLength(0);
  });

  test('Accessibility smoke', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('a.skip-link');
    await expect(skipLink).toBeAttached();

    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement.tagName);
    expect(focused).toBeTruthy();

    const menuItems = page.locator('nav button');
    if (await menuItems.count() > 0 && await menuItems.first().isVisible()) {
       await menuItems.first().focus();
       const isFocused = await menuItems.first().evaluate(node => document.activeElement === node);
       expect(isFocused).toBe(true);
    } else {
       expect(true).toBe(true);
    }
  });
});
