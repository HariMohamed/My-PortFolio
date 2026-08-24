import { useEffect } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { profile } from "../data/profile";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const disableTracking = prefersReducedMotion || (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 150, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (disableTracking) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, disableTracking]);

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
        style={{ x: disableTracking ? 0 : bgX, y: disableTracking ? 0 : bgY }}
      >
        <div className="hero-radial-glow" />
      </motion.div>

      <div className="hero-content relative z-10">
        <div className="hero-layout">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
            style={{ x: disableTracking ? 0 : fgX, y: disableTracking ? 0 : fgY }}
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
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github aria-hidden="true" />
                GitHub
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin aria-hidden="true" />
                LinkedIn
              </a>
              <a href={profile.socials.email} aria-label="Email">
                <Mail aria-hidden="true" />
                Email
              </a>
            </div>
          </motion.div>

          <motion.div
            className="portrait-3d-wrapper mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-none"
            style={{ perspective: 1200, transformStyle: "preserve-3d" }}
            animate={prefersReducedMotion ? {} : { y: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="portrait-3d-scene relative w-full h-full"
              style={{
                x: disableTracking ? 0 : cardX,
                y: disableTracking ? 0 : cardY,
                rotateX: disableTracking ? 0 : cardRotateX,
                rotateY: disableTracking ? 0 : cardRotateY,
                transformStyle: "preserve-3d"
              }}
            >
              <div className="portrait-glass-plate" aria-hidden="true" style={{ transform: disableTracking ? "none" : "translateZ(-30px)" }} />
              <div className="portrait-glow-layer" aria-hidden="true" style={{ transform: disableTracking ? "none" : "translateZ(-15px)" }} />

              <motion.figure
                className="hero-portrait-card spatial-card relative z-10 w-full"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, delay: 0.12, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="hero-portrait-media relative" style={{ transform: disableTracking ? "none" : "translateZ(16px)" }}>
                  <img
                    src={profile.portraitUrl}
                    alt={`Portrait of ${profile.name}`}
                    width="1122"
                    height="1402"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="portrait-inner-highlight" aria-hidden="true" />
                </div>
                <figcaption style={{ transform: disableTracking ? "none" : "translateZ(28px)" }}>
                  <strong>{profile.name}</strong>
                  <span>{profile.positioning}</span>
                </figcaption>
              </motion.figure>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
