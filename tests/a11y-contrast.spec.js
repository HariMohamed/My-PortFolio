import { test, expect } from '@playwright/test';

// WCAG 2.2 AA text-contrast regression for the accent-coloured text and buttons.
//
// Method: for each element the rendered foreground (computed colour x own opacity x every ancestor's opacity) is
// compared with the background composited from the element's ancestors' background colours over the page background.
// Runs in the existing `desktop` (Desktop Chrome) and `mobile` (390px) projects, light and dark theme; the theme is
// selected through the same localStorage key the app reads (`portfolio-theme`, see src/App.jsx).
//
// Not measured: backdrop-filter, translucent pill tints and gradients behind the hero badge / contact card are NOT
// sampled from pixels (CSS compositing only). A manual pixel-sampled audit put those about 0.1-0.3:1 lower than the
// values asserted here, which is covered by the margin of the current colours (>= 4.9:1 on the tightest element).
// Only Chromium is exercised. Hover/pressed states and non-text contrast are out of scope.

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

const DARK_ACCENT = 'rgb(68, 230, 169)'; // #44e6a9
const LIGHT_ACCENT_TEXT = 'rgb(15, 108, 79)'; // #0f6c4f
const LIGHT_ON_ACCENT = 'rgb(0, 0, 0)';
const DARK_ON_ACCENT = 'rgb(9, 9, 11)'; // #09090b

async function measure(locator) {
  await locator.scrollIntoViewIfNeeded();
  // Entrance animations animate ancestor opacity (framer-motion); wait until ancestors are fully opaque so the
  // measurement is not taken mid-fade. The element's own opacity is kept (the URL line intentionally dims).
  await expect.poll(() => locator.evaluate((el) => {
    let o = 1;
    for (let e = el.parentElement; e; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity);
    return o;
  }), { timeout: 10000, message: 'ancestors never became fully opaque' }).toBe(1);

  return locator.evaluate((el) => {
    const parse = (c) => { const m = c.match(/[\d.]+/g).map(Number); return { r: m[0], g: m[1], b: m[2], a: m[3] ?? 1 }; };
    const over = (t, b) => { const a = t.a + b.a * (1 - t.a); return { r: (t.r * t.a + b.r * b.a * (1 - t.a)) / a, g: (t.g * t.a + b.g * b.a * (1 - t.a)) / a, b: (t.b * t.a + b.b * b.a * (1 - t.a)) / a, a }; };
    const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };

    const cs = getComputedStyle(el);
    const ownOpacity = parseFloat(cs.opacity);
    // background: composite every ancestor background (including the element's own) over the page background
    const chain = [];
    for (let e = el; e; e = e.parentElement) {
      const c = parse(getComputedStyle(e).backgroundColor);
      if (c.a > 0) chain.push(c);
      if (c.a === 1) break;
    }
    let bg = parse(getComputedStyle(document.body).backgroundColor);
    if (bg.a < 1) bg = { r: 255, g: 255, b: 255, a: 1 };
    for (const c of chain.reverse()) bg = over(c, bg);

    const fg0 = parse(cs.color);
    const fg = over({ ...fg0, a: fg0.a * ownOpacity }, bg);
    const ratio = (Math.max(lum(fg), lum(bg)) + 0.05) / (Math.min(lum(fg), lum(bg)) + 0.05);
    const px = parseFloat(cs.fontSize);
    const weight = Number(cs.fontWeight);
    return { color: cs.color, ownOpacity, ratio, large: px >= 24 || (px >= 18.66 && weight >= 700), px };
  });
}

function targets(page, route, desktop) {
  if (route === '/') {
    return [
      { name: 'hero stack line', loc: page.locator('#home p').filter({ hasText: /^React · FastAPI/ }), kind: 'accent-text' },
      { name: 'hero badge', loc: page.locator('#home p').filter({ hasText: /available for/i }), kind: 'accent-text' },
      { name: 'contact "Email Hari" button', loc: page.locator('#contact a.btn-primary').first(), kind: 'on-accent' },
      ...(desktop ? [{ name: 'header "CV" button', loc: page.locator('header a.btn-primary').first(), kind: 'on-accent' }] : []),
    ];
  }
  return [
    { name: '"Back to projects" link', loc: page.locator('.project-detail-hero a.text-link').first(), kind: 'accent-text' },
    { name: '"Live Product" link', loc: page.locator('.project-actions a.text-link').first(), kind: 'accent-text' },
    { name: 'URL line under "Live Product"', loc: page.locator('.project-actions a.text-link span').first(), kind: 'url' },
    ...(desktop ? [{ name: 'active nav link', loc: page.locator('nav[aria-label="Primary navigation"] .nav-link-active'), kind: 'accent-text' }] : []),
  ];
}

for (const theme of ['light', 'dark']) {
  test.describe(`${theme} theme contrast`, () => {
    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.addInitScript((t) => { try { window.localStorage.setItem('portfolio-theme', t); } catch { /* storage unavailable */ } }, theme);
    });

    for (const route of ['/', '/projects/syndicai']) {
      test(`${route} audited text meets AA`, async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState('networkidle');
        await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important}' });
        // the SPA applies data-theme from an effect after mount, so wait for it instead of reading it once
        await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme), { timeout: 10000, message: 'theme was applied' }).toBe(theme);

        const desktop = page.viewportSize().width >= 1024;
        const items = targets(page, route, desktop);

        if (desktop) {
          // desktop-only controls must exist and be visible here; a missing element must not pass silently
          for (const sel of route === '/' ? ['header a.btn-primary'] : ['nav[aria-label="Primary navigation"] .nav-link-active']) {
            await expect(page.locator(sel).first(), `${sel} must exist on desktop`).toBeVisible();
          }
        }

        for (const { name, loc, kind } of items) {
          await expect(loc.first(), `${name} must exist and be visible`).toBeVisible();
          const m = await measure(loc.first());
          const need = m.large ? AA_LARGE : AA_NORMAL;
          expect.soft(m.large, `${name} is normal-size text (${m.px}px)`).toBe(false);
          expect.soft(m.ratio, `${name}: ${theme} contrast ${m.ratio.toFixed(2)}:1 (colour ${m.color}, opacity ${m.ownOpacity})`).toBeGreaterThanOrEqual(need);

          // exact rendered colours: light fix values, and dark-theme preservation
          if (theme === 'dark') {
            if (kind === 'accent-text' || kind === 'url') expect.soft(m.color, `${name} dark colour unchanged`).toBe(DARK_ACCENT);
            if (kind === 'on-accent') expect.soft(m.color, `${name} dark text unchanged`).toBe(DARK_ON_ACCENT);
            if (kind === 'url') expect.soft(m.ownOpacity, 'dark URL line keeps its 0.7 dimming').toBeCloseTo(0.7, 2);
          } else {
            if (kind === 'accent-text' || kind === 'url') expect.soft(m.color, `${name} light accent text`).toBe(LIGHT_ACCENT_TEXT);
            if (kind === 'on-accent') expect.soft(m.color, `${name} light text on accent`).toBe(LIGHT_ON_ACCENT);
            if (kind === 'url') expect.soft(m.ownOpacity, 'light URL line is not dimmed').toBe(1);
          }
        }
      });
    }
  });
}

// Tailwind v4 regression guard: the accent must stay the project mint (not the neutral shadcn --accent), accent-filled
// buttons must keep a mint background, and the page surface/text must keep the project tokens in both themes.
const TOKENS = {
  dark: { accent: 'rgb(68, 230, 169)', bg: 'rgb(9, 9, 11)', text: 'rgb(248, 250, 252)' },
  light: { accent: 'rgb(22, 139, 104)', bg: 'rgb(246, 248, 247)', text: 'rgb(16, 20, 18)' },
};

for (const theme of ['light', 'dark']) {
  test(`${theme} theme keeps mint accent fills and neutral surfaces`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.addInitScript((t) => { try { window.localStorage.setItem('portfolio-theme', t); } catch { /* storage unavailable */ } }, theme);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme), { timeout: 10000 }).toBe(theme);

    const t = TOKENS[theme];
    // body animates background/colour for 180ms on theme change; retry instead of reading mid-transition
    await expect(page.locator('body'), 'page background').toHaveCSS('background-color', t.bg);
    await expect(page.locator('body'), 'page text').toHaveCSS('color', t.text);

    // accent-filled controls: mint background and AA text on it (Explore Projects uses text-black on bg-accent)
    for (const [name, loc] of [['contact "Email Hari" button', page.locator('#contact a.btn-primary').first()], ['hero "Explore Projects" button', page.locator('#home a[href="#projects"]').first()]]) {
      await expect(loc, `${name} visible`).toBeVisible();
      const m = await measure(loc);
      const bg = await loc.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(bg, `${name} background`).toBe(t.accent);
      expect(m.ratio, `${name} ${theme} contrast ${m.ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(AA_NORMAL);
    }
  });
}

// Small (12px) accent-coloured mono labels: they use the text-specific accent, so they must clear AA in both themes.
const LABELS = [
  { name: 'section eyebrow', route: '/', sel: '.eyebrow' },
  { name: 'metric label', route: '/', sel: '.metric-card span' },
  { name: 'project card category', route: '/', sel: '#projects article p.uppercase' },
  { name: 'project card "My contribution"', route: '/', sel: '.project-contribution > span' },
  { name: 'timeline date', route: '/', sel: '.timeline-card-head p' },
  { name: 'project page meta line', route: '/projects/syndicai', sel: '.project-meta' },
];

for (const theme of ['light', 'dark']) {
  test(`${theme} theme small accent labels meet AA`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.addInitScript((t) => { try { window.localStorage.setItem('portfolio-theme', t); } catch { /* storage unavailable */ } }, theme);
    for (const route of ['/', '/projects/syndicai']) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important}' });
      await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme), { timeout: 10000 }).toBe(theme);
      for (const { name, sel } of LABELS.filter((l) => l.route === route)) {
        const loc = page.locator(sel).first();
        await expect(loc, `${name} (${sel}) must exist`).toBeAttached();
        const m = await measure(loc);
        expect.soft(m.large, `${name} is small text (${m.px}px)`).toBe(false);
        expect.soft(m.ratio, `${name}: ${theme} contrast ${m.ratio.toFixed(2)}:1 (colour ${m.color})`).toBeGreaterThanOrEqual(AA_NORMAL);
        if (theme === 'light') expect.soft(m.color, `${name} light colour`).toBe(LIGHT_ACCENT_TEXT);
        else expect.soft(m.color, `${name} dark colour`).toBe(DARK_ACCENT);
      }
    }
  });
}

// Hover states (desktop only: no hover on touch). The Hero social links turn accent-coloured on hover; in the light theme
// that must use the text-specific accent, and the "Live Demo" button must dim to 80% accent on hover (hover:bg-accent/80).
for (const theme of ['light', 'dark']) {
  test(`${theme} theme hover states`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover is not available on touch devices');
    await page.emulateMedia({ colorScheme: theme });
    await page.addInitScript((t) => { try { window.localStorage.setItem('portfolio-theme', t); } catch { /* storage unavailable */ } }, theme);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important}' });
    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme), { timeout: 10000 }).toBe(theme);

    for (const label of ['GitHub', 'LinkedIn', 'Email']) {
      const link = page.locator(`#home a[aria-label="${label}"]`);
      await link.scrollIntoViewIfNeeded();
      await link.hover();
      await expect(link, `${label} hover state applied`).toHaveCSS('color', theme === 'light' ? LIGHT_ACCENT_TEXT : DARK_ACCENT);
      const m = await measure(link);
      expect.soft(m.ratio, `${label} link hovered, ${theme}: ${m.ratio.toFixed(2)}:1 (colour ${m.color})`).toBeGreaterThanOrEqual(AA_NORMAL);
      expect.soft(m.color, `${label} hover colour`).toBe(theme === 'light' ? LIGHT_ACCENT_TEXT : DARK_ACCENT);
    }

    const demo = page.locator('#projects article a', { hasText: 'Live Demo' }).first();
    await demo.scrollIntoViewIfNeeded();
    const rest = await demo.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(rest, 'Live Demo rest background is the solid accent').toBe(theme === 'light' ? 'rgb(22, 139, 104)' : 'rgb(68, 230, 169)');
    // the browser serialises color-mix(...) as oklab(... / 0.8); re-hover on each attempt so a slow layout/scroll cannot leave the pointer elsewhere
    await expect(async () => {
      await page.mouse.move(0, 0);
      await demo.hover();
      await expect(demo).toHaveCSS('background-color', /\/ 0\.8\)$/, { timeout: 1500 });
    }, 'Live Demo hover background is the accent at 80% opacity').toPass({ timeout: 15000 });
  });
}
