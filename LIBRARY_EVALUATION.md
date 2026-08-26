# Library & Technical Stack Evaluation (V2)

## 1. Cinematic 3D / WebGL Ecosystem

### React Three Fiber (R3F) & Drei
- **Purpose:** Render 3D scenes within React. `Drei` provides helpers like `ScrollControls` for scroll-linked animations.
- **Benefit:** Highly immersive, standard for high-end "awwwards-style" cinematic experiences. Enables 3D camera fly-throughs.
- **Cost:** High learning curve. Requires significant asset optimization (GLB/GLTF), baked lighting (e.g. from Blender), and increases JS bundle size considerably.
- **Bundle Impact:** High (~150-300kb overhead for Three.js + R3F).
- **Mobile Impact:** Mobile GPUs can struggle with heavy shaders or high-poly models, draining battery and reducing framerate.
- **Accessibility Impact:** Can cause motion sickness. Requires strict `prefers-reduced-motion` fallbacks (usually reverting to static images).
- **Recommendation:** **OPTIONAL**. For a developer portfolio emphasizing Full-Stack and AI, 3D might distract from the core message unless the 3D element represents an AI concept (e.g., a node graph or neural network). 

### Theatre.js
- **Purpose:** Professional motion design tool for the web, integrates tightly with R3F for camera paths.
- **Benefit:** Allows for exact, cinematic keyframing similar to After Effects.
- **Cost:** Adds complexity to the build pipeline and significant bundle size.
- **Recommendation:** **AVOID**. Overkill for a portfolio unless you are explicitly a creative developer / 3D generalist.

### Rive / Lottie
- **Purpose:** Vector-based UI animations.
- **Benefit:** Tiny file sizes (especially Rive), infinitely scalable, incredibly smooth, supports interactive state machines (Rive).
- **Cost:** Requires creating assets in external editors (After Effects for Lottie, Rive Editor).
- **Bundle Impact:** Low/Medium (Rive runtime is WASM and highly optimized).
- **Recommendation:** **USE** (Rive). If we implement the "AI Guide Robot," Rive is the absolute best choice. It allows the robot to react to mouse movements, scroll state, and clicks with near-zero performance penalty.

## 2. Advanced Scroll & DOM Motion

### Framer Motion (Currently Used)
- **Purpose:** Declarative animations for React.
- **Benefit:** Already installed, developer is familiar. Excellent for layout animations, page transitions, and scroll-linked DOM animations (`useScroll`, `useTransform`).
- **Cost:** Medium bundle size (~30-40kb gzipped).
- **Recommendation:** **USE**. Keep Framer Motion as the core DOM animation library. No need to migrate to GSAP when Framer Motion handles 95% of use cases gracefully.

### GSAP (GreenSock) & ScrollTrigger
- **Purpose:** Industry standard for complex, sequenced, scroll-driven DOM and canvas animations.
- **Benefit:** Extremely performant, handles complex timeline sequencing better than Framer Motion.
- **Cost:** Imperative API (clashes slightly with React's declarative nature, though `@gsap/react` helps). Commercial licensing limitations for some plugins.
- **Recommendation:** **AVOID**. Since Framer Motion is already integrated and capable of handling cinematic text reveals and parallax, introducing GSAP adds unnecessary architectural fragmentation.

### Lenis (Smooth Scrolling)
- **Purpose:** Hijacks native scroll to create buttery smooth scrolling, essential for cinematic scroll-linked animations.
- **Benefit:** Makes parallax and scroll-linked animations feel premium.
- **Cost:** Hijacking scroll can break accessibility if not careful, though Lenis is well-architected.
- **Bundle Impact:** Low (~3kb).
- **Recommendation:** **USE**. If we implement scroll-driven narrative presentation, Lenis is required to prevent stuttering on trackpads and standard mice.

## 3. Video & Media

### HTML5 Video (Optimized WebM/MP4)
- **Purpose:** Cinematic backgrounds or project walkthroughs.
- **Benefit:** Native, high-performance, no JS required to play.
- **Cost:** High network payload if not compressed.
- **Recommendation:** **USE**. Replacing static project images with short (3-5 second), muted, looping WebM/MP4 videos of the projects in action significantly elevates the "premium" feel over 3D abstractions.

### Higgsfield / Midjourney (AI Generated Assets)
- **Purpose:** Creating background textures, abstract hero visuals, or the AI Robot concepts.
- **Benefit:** Demonstrates your AI integration expertise visually.
- **Recommendation:** **USE (Tastefully)**. Use AI for subtle, dark-mode ambient background textures (e.g., abstract neural networks or data flows), but do not let it overpower the actual UI. Avoid generic "cyberpunk robot" tropes.

## Summary

- **Core Stack:** React + Vite + Framer Motion (Existing)
- **Additions:** Lenis (Smooth Scroll), Rive (For the AI Robot)
- **Avoid:** Three.js / R3F, GSAP, heavy WebGL. Keep the portfolio focused on *shipping systems*, not 3D rendering.
