import { test, expect } from '@playwright/test';

// Regression: the availability badge sat under the fixed navbar whenever the hero content was
// taller than the viewport (common at 100% zoom on laptop screens).
const VIEWPORTS = [
  [1440, 900], [1366, 768], [1280, 720], [1280, 600], [1024, 768], [768, 1024], [390, 844], [320, 640],
];

test.describe('Hero availability badge', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'viewport is set explicitly per test');
  });

  for (const [width, height] of VIEWPORTS) {
    test(`is fully visible, unclipped and not covered by the navbar at ${width}x${height}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      const badge = page.locator('#home p', { hasText: 'Available for Full-Stack & AI Integration Projects' });
      await expect(badge).toBeVisible();
      await expect.poll(() => badge.evaluate((el) => getComputedStyle(el.parentElement).opacity)).toBe('1');

      const result = await page.evaluate(() => {
        const el = [...document.querySelectorAll('#home p')].find((p) => /Available for/.test(p.textContent));
        const rect = el.getBoundingClientRect();
        const header = document.querySelector('header').getBoundingClientRect();
        // Probe points inside the rounded pill (corners fall outside the radius): a covered badge fails the hit test.
        const midY = rect.top + rect.height / 2;
        const midX = rect.left + rect.width / 2;
        const probes = [
          [midX, midY], [rect.left + 24, midY], [rect.right - 24, midY],
          [midX, rect.top + 3], [midX, rect.bottom - 3],
        ];
        return {
          clearOfHeader: rect.top >= header.bottom,
          inViewportX: rect.left >= 0 && rect.right <= window.innerWidth,
          unclippedText: el.scrollWidth <= el.clientWidth + 1,
          allProbesHit: probes.every(([x, y]) => el.contains(document.elementFromPoint(x, y))),
          noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
        };
      });
      expect(result).toEqual({
        clearOfHeader: true, inViewportX: true, unclippedText: true, allProbesHit: true, noHorizontalOverflow: true,
      });
    });
  }

  test('fixed assistant button does not overlap footer content at the page bottom', async ({ page }) => {
    for (const [width, height] of [[1280, 800], [768, 900], [390, 844], [320, 640]]) {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, document.documentElement.scrollHeight);
      });
      await page.waitForTimeout(500);
      const overlaps = await page.evaluate(() => {
        const fab = document.querySelector('.assistant-trigger').getBoundingClientRect();
        return [...document.querySelectorAll('footer a, footer button, footer strong, footer span')]
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return r.width && !(r.right <= fab.left || r.left >= fab.right || r.bottom <= fab.top || r.top >= fab.bottom);
          })
          .map((e) => e.getAttribute('aria-label') || e.textContent.trim().slice(0, 20));
      });
      expect(overlaps, `${width}x${height}`).toEqual([]);
    }
  });
});
