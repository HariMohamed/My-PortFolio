# Portfolio V2 Redesign Specification

## 1. Project GitHub Links Strategy
- **Audit Findings:** Individual repository links exist in `src/data/projects.js`, rendered via `src/components/ProjectCard.jsx` and `src/pages/ProjectDetails.jsx`.
- **Change Mandate:** Remove `project.links.github` completely from `projects.js`. Remove the UI blocks checking for and rendering this link in `ProjectCard.jsx` and `ProjectDetails.jsx`.
- **Preserved:** The global profile link (`https://github.com/HariMohamed/`) will remain in `profile.js` and be rendered in the Hero, Navbar, Command Palette, and Footer.

## 2. Experience vs Education Architecture
- **Current State:** Both exist in `src/data/experience.js` as one array, distinguished by a `type` property. `ExperienceTimeline.jsx` renders them in a single column.
- **Proposed Architecture (Minimum Structural Change):**
  - **Data:** Refactor `src/data/experience.js` to export two separate arrays: `professionalExperience` and `academicEducation`.
  - **Component:** Rename `ExperienceTimeline.jsx` to `Timeline.jsx`. Modify it to accept a generic `items` prop. 
  - **UI (Home.jsx):** Instantiate `<Timeline items={professionalExperience} />` in the Professional Experience section, and `<Timeline items={academicEducation} />` in the Education section.

## 3. Technology Stack Specification

| Technology | Verdict | Justification |
|---|---|---|
| **Framer Motion** | **USE** | Already integrated. Excellent for declarative mount animations, layout transitions, and basic scroll-triggered reveals (`whileInView`). |
| **HTML5 Video** | **USE** | Highly optimized `WebM` and `MP4` (with `poster` fallbacks) offer the highest fidelity presentation of actual web apps without JavaScript rendering costs. |
| **Rive** | **USE** | Ideal for the AI Guide robot. State-machine driven, minuscule bundle footprint, resolution-independent vector graphics, and trivial to connect to scroll/mouse events. |
| **Lenis** | **OPTIONAL** | Use only if we implement scroll-scrubbed animations (where progress is tied to scroll position). If we only trigger animations *when* scrolled into view, native scroll + Framer Motion's `whileInView` is sufficient and safer for a11y. |
| **GSAP** | **REJECTED** | Redundant. Framer Motion already handles 95% of our needs. Introducing GSAP bloats the bundle and fragments the animation architecture. |
| **Three.js / R3F** | **REJECTED** | Massive performance and bundle penalty. Distracts from the "shipping full-stack products" narrative. |

## 4. Video Presentation Strategy
- **Where to Use:** Replace static images in `ProjectCard.jsx` and the Hero section of `ProjectDetails.jsx` with auto-playing video previews.
- **Constraints:**
  - Maximum length: 4-6 seconds per project.
  - Maximum size: `< 800KB` per video (extreme WebM compression).
  - Attributes: `muted`, `loop`, `playsInline`, `loading="lazy"`.
  - **Poster:** Every video MUST have an optimized `.webp` poster for immediate rendering and LCP stability.
  - **Fallback:** Wrap video in `matchMedia('(prefers-reduced-motion: reduce)')` check. If true, render the poster image and bypass the `<video>` entirely.

## 5. Robot / AI Guide Concept
- **Purpose:** Serve as a delightful micro-interaction demonstrating frontend polish and state-machine integration, providing context-aware tooltip commentary.
- **Position:** Fixed, bottom-right corner.
- **Interaction Model:** Driven by Intersection Observer. As the user scrolls into the `<Experience>` section, the Rive state switches to "Experience" and triggers a subtle tooltip ("Here are the systems I've built").
- **Constraints:**
  - **NOT** a chatbot. No text input, no complex LLM backend.
  - **Hidden on Mobile:** Mobile screen real estate is too precious. Hide entirely on viewports `< 768px`.
  - **Hidden for Reduced Motion:** If enabled, do not mount the component.

## 6. Reference Analysis Translation (abdallah.ai)
- **Visual Hierarchy:** Deep dark mode (near black) with high contrast typography and sparse, highly saturated accent colors (electric blue/violet).
- **Typography:** Tight tracking on headings, loose line-height on body paragraphs.
- **Project Presentation:** Edge-to-edge media blocks without harsh borders. Subtle glassmorphism (`backdrop-filter`) for floating cards or navs over media.
- **Transitions:** Elements should not "snap" into existence. Use Framer Motion's `y` translation (e.g., `y: 20 -> y: 0`) and opacity fade-in orchestrated with staggering.

## 7. Higgsfield / AI Visual Assets
- **Application:** Use AI generators to create subtle, abstract background textures (e.g., dark, swirling data patterns or subtle geometric nodes) rather than realistic images.
- **Integration:** Export as compressed WebP or short WebM loops. Place these in the `Hero` background behind the text, deeply darkened (opacity ~10-20%) so they do not compete with typography.

## 8. Final V2 Page Architecture (Proposed)
1. **Hero:** High-impact typography, AI-abstract background, global social links, core positioning.
2. **Selected Systems (Projects):** Grid or stacked layout. Video-on-hover cards. Removed individual GitHub links.
3. **Professional Experience:** Clean chronological timeline of paid/professional work.
4. **Engineering Stack:** Tech chips categorized by Backend, Frontend, and AI.
5. **Academic Foundation (Education):** Separated academic timeline.
6. **Contact:** Call to action.

## 9. Implementation Spec Summary

### Files to Modify
- `src/data/projects.js` (Remove `links.github`, add `videoUrl`, `posterUrl`)
- `src/components/ProjectCard.jsx` (Remove GitHub rendering, add video logic)
- `src/pages/ProjectDetails.jsx` (Remove GitHub rendering, upgrade layout)
- `src/data/experience.js` (Split into two exported arrays)
- `src/components/ExperienceTimeline.jsx` -> Rename to `Timeline.jsx` (Make generic)
- `src/pages/Home.jsx` (Reorder sections, implement dual Timelines)
- `src/components/Hero.jsx` (Upgrade aesthetics, add background texture)
- `index.css` (Update color variables and border styles for the cinematic look)

### Files to Create
- `src/components/AIGuide.jsx` (The Rive robot component)
- `src/components/VideoPreview.jsx` (Generic lazy-loaded video component with reduced-motion support)

### Dependencies
- **Add:** `@rive-app/react-canvas`
- **Reject:** `three`, `@react-three/fiber`, `gsap`, `lenis` (unless scroll-scrubbing is strictly required later).

### Budgets & Requirements
- **Performance Budget:** Total initial JS payload < 600KB. Hero video < 1MB. Project videos < 800KB.
- **Accessibility:** All videos muted, playsInline. Skip links maintained. Robot hidden from screen readers (`aria-hidden="true"`).
- **SEO:** Maintain existing Vercel MPA routing configuration (`vercel.json`) untouched, as it perfectly serves static metadata for project routes.

### Implementation Order
1. Data cleanup (GitHub links & Experience split).
2. UI architecture update (Timelines, Section ordering).
3. Visual styling overhaul (CSS, Hero, typography).
4. Media integration (Project videos, Posters).
5. Micro-interactions (Rive Robot).
6. Performance & Accessibility audit.

### Rollback Strategy
All changes are isolated to the `audit/portfolio-redesign-2026-08-26` branch. If the visual direction strays or performance tanks, simply abandon the branch or selectively `git restore` specific components. Production `master` is insulated.
