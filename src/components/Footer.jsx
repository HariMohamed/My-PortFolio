import { Command, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";

export default function Footer({ onOpenCommand }) {
  return (
    <footer className="footer-shell">
      <div>
        <strong>{profile.name}</strong>
        <span>{profile.positioning}</span>
      </div>
      <div className="footer-links">
        <button type="button" onClick={onOpenCommand} aria-label="Open command palette">
          <Command aria-hidden="true" />
        </button>
        <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github aria-hidden="true" />
        </a>
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Linkedin aria-hidden="true" />
        </a>
        <a href={profile.socials.email} aria-label="Email">
          <Mail aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
