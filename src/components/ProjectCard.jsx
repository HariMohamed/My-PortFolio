import { ArrowUpRight, Play, Route, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import TechChip from "./TechChip";

export default function ProjectCard({ project, index = 0 }) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className="group relative flex flex-col overflow-hidden rounded-2xl shadow-[var(--inset-border)] backdrop-blur-md border border-transparent bg-surface transition-all duration-300 hover:bg-white/[0.04]"
    >
      <figure className="relative aspect-[16/10] w-full overflow-hidden bg-[#09090b] shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.05)] border-b border-transparent">
        {project.videoPreviewUrl ? (
          <video
            src={project.videoPreviewUrl}
            poster={project.posterUrl}
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            muted
            playsInline
            loop
            preload="none"
            aria-label={`Video preview of ${project.title}`}
          />
        ) : project.posterUrl ? (
          <img
            src={project.posterUrl}
            alt={`Screenshot of ${project.title}`}
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted font-mono text-sm opacity-50 transition-opacity duration-300 group-hover:opacity-80">
            <ImageIcon className="w-8 h-8 mb-3 opacity-40" aria-hidden="true" />
            <span>Media Pending Integration</span>
            <span className="text-xs opacity-50 mt-1">[{project.slug}]</span>
          </div>
        )}

        {/* Subtle overlay gradient to ensure text readability if we put labels on the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent opacity-60" aria-hidden="true" />

        {/* Project Number Badge (moved onto media block for cinematic feel) */}
        <div className="absolute top-4 left-4 rounded-md shadow-[var(--inset-border)] backdrop-blur-md border border-transparent bg-black/40 px-3 py-1 font-mono text-xs font-bold text-white">
          {String(index + 1).padStart(2, "0")}
        </div>
      </figure>

      <div className="flex flex-col flex-grow p-6">
        <div className="mb-4">
          <p className="mb-2 font-mono text-xs font-bold uppercase text-accent">
            {project.category}
          </p>
          <h3 className="font-display text-3xl font-extrabold text-text tracking-tight mb-2">
            {project.title}
          </h3>
          <p className="text-muted leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <TechChip key={tech} tech={tech} />
          ))}
          {project.stack.length > 4 && (
            <span className="inline-flex min-h-8 items-center rounded-md shadow-[var(--inset-border)] backdrop-blur-md border border-transparent px-3 py-1 font-mono text-xs font-semibold text-muted bg-white/[0.02]">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border-t border-transparent pt-5">
          {project.links.live && (
            <a
              className="inline-flex h-10 items-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-black transition-colors hover:bg-accent/80"
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              Live Demo
            </a>
          )}
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-md shadow-[var(--inset-border)] backdrop-blur-md border border-transparent bg-white/[0.03] px-4 text-sm font-semibold text-text transition-colors hover:bg-white/[0.08]"
            to={project.links.caseStudy}
          >
            <Route className="w-4 h-4" aria-hidden="true" />
            Case study
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
