# Asset Forensics & Video Strategy (V2 Audit)

## 1. Current Asset Inventory
### Evaluated Files:
- `public/portrait.webp` (58.5KB, 1122x1402) - **Hero Portrait**
- `public/og-image.jpg` (185KB) - **SEO Metadata**
- `public/logos/*.png/svg/jfif` (~4-90KB) - **Timeline Company Logos**
- `hari-mohamed-rizq-cv-2026.pdf` (1.8MB) - **Downloadable CV**

### Observations:
- **Strengths:** The current asset footprint is extremely lightweight. Total initial image payload is under `150KB`. The Hero portrait is appropriately converted to `.webp` and uses `fetchPriority="high"`.
- **Weaknesses (The Missing Pieces):** There are absolutely **zero** project screenshots, videos, or UI visualizations in the codebase. Project cards are currently 100% text and icon-based. This is the single biggest credibility gap for a Full-Stack/Frontend engineer.

## 2. Video Strategy Evaluation
### Objective
We must determine if video backgrounds and project previews (as seen in `abdallah.ai`) are justified over static screenshots.

### Evaluation Criteria
- **LCP Risk:** Adding video to the Hero section threatens the Largest Contentful Paint metric.
- **Bandwidth:** Video loops can easily exceed 2-5MB if unoptimized.
- **Mobile Autoplay:** iOS/Android frequently block autoplaying video in low-power mode.
- **Accessibility:** Motion sickness risk if reduced-motion preferences are ignored.

### Strategy Recommendation (VERIFIED FACT)
Video *is* automatically better than static images for demonstrating interaction (e.g., hover states, animations, dynamic routing in the SaaS projects). However, we must implement a strict **Progressive Media Strategy**:

1. **Hero Background:** 
   - **Recommendation:** Implement a highly compressed (`< 800KB`), muted, looping `WebM` abstract texture (or AI-generated node visual).
   - **Requirement:** Must include a `.webp` `poster` attribute so the LCP fires instantly while the video buffers in the background.

2. **Project Previews:**
   - **Recommendation:** Do not autoplay all videos simultaneously. Project cards should display a static, optimized `.webp` screenshot by default.
   - **Interaction:** The short (`3-5s`, `< 500KB`) WebM video should ONLY load and play when the user hovers over the specific project card (desktop) or taps (mobile).
   - **Reduced Motion:** If `matchMedia('(prefers-reduced-motion: reduce)')` is true, disable video loading entirely and strictly use images.

## 3. Higgsfield / AI Generated Visuals
### Current Ecosystem
High-end AI generation tools (Midjourney v6, Higgsfield, Runway Gen-3) excel at creating cinematic, abstract, atmospheric textures.
- **Where it works:** The Hero background, or an abstract header for the "Skills" section.
- **Where it fails:** Do NOT use AI to generate "fake" UI screens or generic cyborg characters. It undermines the authenticity of the engineering work.

### Conclusion
We need to generate **one** premium abstract atmospheric loop for the Hero background to achieve the "cinematic" aesthetic, and capture screen-recordings (via CleanShot X or similar) for the 4 featured projects.
