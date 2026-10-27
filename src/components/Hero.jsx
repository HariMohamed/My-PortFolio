import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Unified animation variant for staggered reveals
  const revealVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className="relative min-h-[90svh] w-full flex items-center justify-center overflow-hidden pt-24 border-b shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.05)] border-transparent" aria-labelledby="hero-title">

      {/*
        MEDIA LAYER PLACEHOLDER
        This is where the future WebM cinematic texture will be injected.
        Currently a dark radial gradient acts as the fallback.
      */}
      <div className="absolute inset-0 z-0 bg-bg">
        {/* <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" poster="..." src="..." /> */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(68,230,169,0.15),transparent_60%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg opacity-90" aria-hidden="true" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto flex flex-col items-center text-center pb-24 sm:pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col items-center max-w-4xl"
        >
          <motion.div variants={revealVariants}>
            <p className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full shadow-[var(--inset-border)] backdrop-blur-md border border-transparent bg-white/[0.02] font-mono text-xs font-bold uppercase tracking-widest text-accent-text">
              <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
              {profile.badge}
            </p>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={revealVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-text tracking-tight leading-[1.05] mb-6"
          >
            {profile.headline}
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="text-lg sm:text-xl md:text-2xl text-[color:var(--high-contrast-copy)] max-w-2xl leading-relaxed mb-4"
          >
            {profile.subtitle}
          </motion.p>

          <motion.p
            variants={revealVariants}
            className="text-sm sm:text-base font-mono text-accent-text mb-10"
          >
            {profile.stackLine}
          </motion.p>

          <motion.div
            variants={revealVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <a className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-bold text-black transition-transform hover:scale-105 active:scale-95" href="#projects">
              Explore Projects
              <ArrowDown className="w-5 h-5" aria-hidden="true" />
            </a>
            <a className="inline-flex h-12 items-center justify-center gap-2 rounded-md shadow-[var(--inset-border)] backdrop-blur-md border border-transparent bg-white/[0.04] px-6 font-bold text-text transition-colors hover:bg-white/[0.08]" href={profile.cv.english} download>
              <Download className="w-5 h-5" aria-hidden="true" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            variants={revealVariants}
            className="flex flex-wrap items-center justify-center gap-3"
            aria-label="Social links"
          >
            <a className="inline-flex h-11 items-center gap-2 rounded-md shadow-[var(--inset-border)] backdrop-blur-md border border-transparent bg-white/[0.02] px-4 text-sm font-semibold text-muted transition-colors hover:text-accent-text hover:bg-white/[0.05]" href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
            <a className="inline-flex h-11 items-center gap-2 rounded-md shadow-[var(--inset-border)] backdrop-blur-md border border-transparent bg-white/[0.02] px-4 text-sm font-semibold text-muted transition-colors hover:text-accent-text hover:bg-white/[0.05]" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </a>
            <a className="inline-flex h-11 items-center gap-2 rounded-md shadow-[var(--inset-border)] backdrop-blur-md border border-transparent bg-white/[0.02] px-4 text-sm font-semibold text-muted transition-colors hover:text-accent-text hover:bg-white/[0.05]" href={profile.socials.email} aria-label="Email">
              <Mail className="w-4 h-4" aria-hidden="true" />
              Email
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
