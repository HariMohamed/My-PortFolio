# Phase 3 Implementation Checklist: Visual System & Layout Redesign

This document outlines the strict execution order for overhauling the visual language of Portfolio V2, migrating from a generic developer aesthetic to a premium, cinematic Full-Stack/AI engineering showcase.

## A. Global Visual System (CSS Overhaul)
- [ ] **Color Palette:** Update `index.css` root variables.
  - Background: Deep near-black (`#09090b` or similar).
  - Surface: Ultra-subtle white transparency with backdrop blur (`rgba(255, 255, 255, 0.03)`).
  - Accent: Preserve `#44e6a9` but restrict usage exclusively to interactive elements (buttons, active states).
  - Text: High-contrast primary (`#f8fafc`), muted secondary (`#94a3b8`).
- [ ] **Typography & Spacing:** 
  - Tighten letter-spacing (`tracking-tight`) on all massive `h1`/`h2` headings.
  - Relax line-height (`leading-relaxed`) on body copy for readability.
- [ ] **Borders & Elevation:** 
  - Remove all solid `border-border` outlines from `.project-card`, `.timeline-card`, etc.
  - Replace borders with soft inner shadows: `box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05)`.
  - Introduce deep, colored radial glows for hover states instead of harsh drop-shadows.
- [ ] **Accessibility:** Ensure the new contrast ratios pass WCAG AA standards.

## B. Hero Redesign
- [ ] **Layout Transformation:** Convert the split-column layout into a cinematic, edge-to-edge focal point.
- [ ] **Media Integration Point:** Create an absolute-positioned, full-width `<div>` placeholder behind the typography where the future AI/cinematic looping video will live.
- [ ] **Simplify 3D:** The current spatial portrait card is impressive but clutters a cinematic full-width layout. Evaluate removing the mouse-tracking 3D tilt entirely, or relegating it to a much smaller profile avatar.
- [ ] **CTA Hierarchy:** Restyle the primary "Explore Projects" button. Preserve the global GitHub profile CTA precisely where it is in the social row.

## C. Selected Systems (Projects) Redesign
- [ ] **Visual-First Layout:** Overhaul `ProjectCard.jsx`. Move away from text-heavy cards to a layout dominated by a large media block (16:10 or 16:9 aspect ratio).
- [ ] **Media Placeholders:** 
  - Implement a `<figure>` placeholder block that will soon accept `<video>`.
  - For **SyndicAI**, explicitly prepare a high-quality static fallback UI, as the video is delayed.
- [ ] **Hover Interactions (Desktop):** Plan the Framer Motion state where hovering the card triggers the media block (scaling up slightly, opacity changes).
- [ ] **Mobile Behavior:** Ensure the layout stacking works without hover capabilities (e.g., displaying the poster image by default with a subtle visual cue).
- [ ] **CTAs:** Restyle the "Live Demo" and "Case study" buttons. Ensure absolutely **no** project-specific GitHub buttons are reintroduced.

## D. Experience & Education Refinement
- [ ] **Structural Preservation:** Ensure the dual `<Timeline>` component architecture established in Phase 1B remains untouched.
- [ ] **Visual Updates:** Update `.timeline-card` CSS to use the new glassmorphism (inset shadow) and surface variables. Remove harsh borders. Ensure typography aligns with the global system.

## E. Motion & Micro-Interactions (Framer Motion)
- [ ] **Scroll Reveals:** Standardize `whileInView` animations. Elements should fade in (`opacity: 0 -> 1`) and drift upward (`y: 20 -> 0`) smoothly over `0.6s` to `0.8s`. No sudden snapping.
- [ ] **Reduced Motion Check:** Wrap all new Framer Motion variants in a `prefersReducedMotion` check. If true, disable the `y` translation entirely.
- [ ] **No New Libraries:** Strictly utilize `framer-motion`. Do NOT install GSAP, Lenis, or Three.js.

## F. Performance Constraints
- [ ] **LCP Protection:** Ensure the future Hero media `<video>` block is coded with `muted playsInline autoPlay loop` and a `poster` attribute.
- [ ] **Lazy Media:** Ensure future Project media `<video>` tags are structured to only load `onMouseEnter` or utilize strict `loading="lazy"` attributes. Do not pre-load them.
