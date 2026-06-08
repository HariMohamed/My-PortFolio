import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

export default function Hero() {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-photo" aria-hidden="true">
        <img src={profile.portraitUrl} alt="" width="3456" height="5184" />
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-layout">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
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
                View Projects
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
            className="hero-portrait-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          >
            <div className="hero-portrait-media">
              <img
                src={profile.portraitUrl}
                alt={`Portrait of ${profile.name}`}
                width="1122"
                height="1402"
              />
            </div>
            <figcaption>
              <strong>{profile.name}</strong>
              <span>{profile.positioning}</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
