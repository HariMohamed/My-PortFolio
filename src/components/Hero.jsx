import { useEffect } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { profile } from "../data/profile";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 150, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const fgX = useTransform(smoothX, [-1, 1], [-2, 2]);
  const fgY = useTransform(smoothY, [-1, 1], [-2, 2]);

  const cardX = useTransform(smoothX, [-1, 1], [8, -8]);
  const cardY = useTransform(smoothY, [-1, 1], [8, -8]);
  const cardRotateX = useTransform(smoothY, [-1, 1], [2, -2]);
  const cardRotateY = useTransform(smoothX, [-1, 1], [-2, 2]);

  const bgX = useTransform(smoothX, [-1, 1], [-3, 3]);
  const bgY = useTransform(smoothY, [-1, 1], [-3, 3]);

  return (
    <section id="home" className="hero-section perspective-container" aria-labelledby="hero-title">

      <motion.div
        className="hero-depth-bg"
        aria-hidden="true"
        style={{ x: prefersReducedMotion ? 0 : bgX, y: prefersReducedMotion ? 0 : bgY }}
      >
        <div className="hero-radial-glow" />
      </motion.div>

      <div className="hero-content relative z-10">
        <div className="hero-layout">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
            style={{ x: prefersReducedMotion ? 0 : fgX, y: prefersReducedMotion ? 0 : fgY }}
            className="max-w-4xl"
          >
            <p className="hero-badge">
              <Sparkles aria-hidden="true" />
              {profile.badge}
            </p>
            <h1 id="hero-title" className="hero-title">
              {profile.headline}
            </h1>
            <p className="hero-subtitle">{profile.subtitle}</p>
            <p className="stack-line">{profile.stackLine}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="btn btn-primary" href="#projects">
                Explore Projects
                <ArrowDown aria-hidden="true" />
              </a>
              <a className="btn btn-secondary" href={profile.cv.english} download>
                <Download aria-hidden="true" />
                Download CV
              </a>
            </div>

            <div className="social-row" aria-label="Social links">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github aria-hidden="true" />
                GitHub
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin aria-hidden="true" />
                LinkedIn
              </a>
              <a href={profile.socials.email} aria-label="Email">
                <Mail aria-hidden="true" />
                Email
              </a>
            </div>
          </motion.div>

          <motion.figure
            className="hero-portrait-card spatial-card"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, delay: 0.12, ease: "easeOut" }}
            style={{
              x: prefersReducedMotion ? 0 : cardX,
              y: prefersReducedMotion ? 0 : cardY,
              rotateX: prefersReducedMotion ? 0 : cardRotateX,
              rotateY: prefersReducedMotion ? 0 : cardRotateY,
              transformStyle: "preserve-3d"
            }}
          >
            <div className="hero-portrait-media" style={{ transform: prefersReducedMotion ? "none" : "translateZ(12px)" }}>
              <img
                src={profile.portraitUrl}
                alt={`Portrait of ${profile.name}`}
                width="1122"
                height="1402"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <figcaption style={{ transform: prefersReducedMotion ? "none" : "translateZ(20px)" }}>
              <strong>{profile.name}</strong>
              <span>{profile.positioning}</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
