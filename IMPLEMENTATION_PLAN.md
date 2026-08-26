# Portfolio V2 Implementation Plan

## Phase 0 — Content & Cleanup
- **Files Affected:** `src/data/projects.js`, `src/components/ProjectCard.jsx`, `src/pages/ProjectDetails.jsx`
- **Action:** Remove individual GitHub repository links from project data arrays and UI components. Centralize GitHub linking to the primary profile URL in the Hero/Footer.
- **Risk:** Low.
- **Expected Result:** Cleaned up UI, pushing focus toward live demos and case studies instead of source code.
- **Verification:** Playwright tests ensure no broken links or missing elements.

## Phase 1 — Information Architecture
- **Files Affected:** `src/data/experience.js`, `src/components/ExperienceTimeline.jsx`, `src/pages/Home.jsx`
- **Action:** Split `experience.js` into two distinct arrays (`professional` and `education`). Duplicate and specialize `ExperienceTimeline.jsx` into `Experience.jsx` and `Education.jsx`.
- **Risk:** Low.
- **Expected Result:** Recruiters can scan work history entirely independently of academic history.
- **Verification:** Visual review and unit tests confirming separate data mapping.

## Phase 2 — Visual System & Assets
- **Files Affected:** `index.css`, `tailwind.config.js` (if applicable), new `src/assets/video/` directory.
- **Action:** Define the new "Premium Cinematic" design system (colors, borders, gradients). Prepare optimized WebM/MP4 looping videos for backgrounds and project previews.
- **Dependencies:** None yet, purely asset preparation and CSS variable definitions.
- **Risk:** Low.
- **Expected Result:** Foundation for cinematic visual hierarchy.
- **Verification:** CSS compiles successfully.

## Phase 3 — Hero Redesign
- **Files Affected:** `src/components/Hero.jsx`
- **Action:** Replace the static spatial card with a cinematic, edge-to-edge layout integrating a looping, optimized background video (or AI-generated texture).
- **Risk:** Medium (performance cost of video).
- **Expected Result:** A visually arresting first impression aligned with high-end creative portfolios.
- **Verification:** Network tab confirms video is compressed (< 1MB) and plays instantly.

## Phase 4 — Projects & Case Studies
- **Files Affected:** `src/components/ProjectCard.jsx`, `src/pages/ProjectDetails.jsx`, `src/data/projects.js`
- **Action:** Update data schema to include `videoPreviewUrl` and `impactMetrics`. Update UI to render looping video previews on hover (Framer Motion). Redesign case studies to include architecture diagrams and robust visual evidence.
- **Risk:** Medium.
- **Expected Result:** Projects feel like shipped, real-world systems rather than theoretical homework assignments.
- **Verification:** Lighthouse/Performance audit to ensure multiple video elements do not destroy TTI (Time to Interactive).

## Phase 5 — Cinematic Motion (Lenis)
- **Files Affected:** `src/App.jsx`, `package.json`
- **Action:** Install and configure Lenis for smooth scroll hijacking. Wrap the application in a `ReactLenis` provider.
- **Dependencies:** `@studio-freight/react-lenis`
- **Risk:** High (Scroll hijacking can conflict with native routing and accessibility).
- **Expected Result:** Buttery smooth scrolling that makes scroll-driven animations feel premium.
- **Verification:** Manual browser testing across Chrome, Safari, and Mobile iOS.

## Phase 6 — Robot / AI Guide (Rive)
- **Files Affected:** `src/components/AIGuide.jsx` (New), `package.json`
- **Action:** Integrate a persistent, non-intrusive Rive animation in the bottom-right corner. Use an IntersectionObserver hook to change the Rive state machine (e.g., `state="experience"`, `state="contact"`) based on scroll position.
- **Dependencies:** `@rive-app/react-canvas`
- **Risk:** Medium.
- **Expected Result:** A delightful, contextual interaction that proves AI/frontend capability without acting as an annoying generic chatbot.
- **Verification:** Scroll testing to ensure state machine triggers correctly.

## Phase 7 — Performance Optimization
- **Files Affected:** `src/components/ProjectCard.jsx`, `src/components/Hero.jsx`
- **Action:** Implement strict lazy loading for videos. Ensure `poster` attributes exist on all videos. Preload the Hero background video. Implement `prefers-reduced-motion` fallbacks across the board.
- **Risk:** Low.
- **Expected Result:** Maintained fast initial load times despite heavy media assets.
- **Verification:** Network payload inspection, Lighthouse audits.

## Phase 8 — SEO & Accessibility
- **Files Affected:** `index.html`, all components.
- **Action:** Verify semantic tags (`<article>`, `<section>`, `<aside>`). Ensure ARIA labels on the new video/Rive elements. Re-verify Vercel routing configuration for new component structures.
- **Risk:** Low.
- **Expected Result:** WCAG compliance and optimal search indexing.
- **Verification:** Axe DevTools, Playwright accessibility tests.

## Phase 9 — Production Verification
- **Files Affected:** N/A
- **Action:** Deploy to Vercel preview URL. Verify MPA route generation. Test mobile layout, scroll behavior, and video autoplay policies on actual iOS/Android devices.
- **Risk:** High (Discovering mobile Safari video autoplay blocking late).
- **Expected Result:** A flawless, production-ready cinematic portfolio.
- **Verification:** Physical device testing.
