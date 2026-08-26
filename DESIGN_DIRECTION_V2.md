# Design System & Performance Direction (V2)

## 1. V2 Visual System Recommendations

### Color Palette (The "Cinematic" Grade)
- **Background:** `#09090b` (Deep near-black, replacing lighter grays).
- **Surface:** `rgba(255, 255, 255, 0.03)` (Ultra-subtle white transparency with `backdrop-filter: blur(12px)`).
- **Accent:** `#44e6a9` (Retain the existing electric teal/green, but use it far more sparingly—only for interactive states or the AI Robot).
- **Text Primary:** `#f8fafc` (Slate 50).
- **Text Muted:** `#94a3b8` (Slate 400).

### Typography
- **Headings:** Inter or existing display font, but tighten letter-spacing (`tracking-tighter` in Tailwind) and increase weight to `800`.
- **Body:** Increase line-height slightly (`leading-relaxed`) for readability.

### Borders, Shadows, and Radii
- **Borders:** Remove solid borders (`border-border`) from cards. Replace them with internal box-shadows (`box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05)`) for a softer, glass-like edge.
- **Shadows:** Introduce deep, colored radial glows behind key elements instead of drop-shadows.
- **Radius:** Standardize on `rounded-2xl` or `rounded-xl` for large media blocks, `rounded-md` for buttons.

## 2. Animation Principles
- **Timing:** Use `0.6s` to `0.8s` duration for reveals, utilizing custom spring physics (`stiffness: 100, damping: 20`) rather than linear easing.
- **Direction:** Elements should reveal flowing upward (`y: 20` to `y: 0`) and fading in (`opacity: 0` to `1`).
- **Trigger:** Only animate `once: true` when scrolling into view to prevent re-trigger fatigue.

## 3. Performance Budget
Strict budgets to maintain the Vite MPA speed advantages:
- **Initial JS:** `< 180KB` (Gzipped). Currently ~148KB. Adding Rive will add ~30KB (WASM).
- **Initial Image/Video:** `< 1.2MB` (Hero video + poster).
- **Lazy Loading:** All project videos MUST have `loading="lazy"` and be deferred until the user reaches the Projects section or hovers the card.

## 4. Implementation Phasing Strategy

### Phase 2: Asset Integration (Next Step)
- Generate/Record project UI videos.
- Compress to WebM.
- Update `projects.js` data model to include `videoUrl` and `posterUrl`.

### Phase 3: Visual Overhaul
- Update `index.css` with the new color variables and glassmorphism utilities.
- Restyle `ProjectCard.jsx` to render media blocks instead of just text.
- Overhaul `Hero.jsx` layout.

### Phase 4: Micro-Interactions
- Install `@rive-app/react-canvas`.
- Implement the desktop-only `AIGuide.jsx` robot.
