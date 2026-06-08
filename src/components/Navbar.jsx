import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Command,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  ScanSearch,
  X,
} from "lucide-react";
import { profile } from "../data/profile";

const navLinks = [
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ recruiterMode, onToggleRecruiterMode, onOpenCommand }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(location.pathname.startsWith("/projects") ? "projects" : "");
      return undefined;
    }

    const sections = ["home", ...navLinks.map((link) => link.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: 0.01 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  function scrollToSection(id) {
    const scroll = () => {
      document.getElementById(id)?.scrollIntoView({
        behavior: recruiterMode ? "auto" : "smooth",
        block: "start",
      });
    };

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scroll, 60);
    } else {
      scroll();
    }
    setMenuOpen(false);
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-bg/82 backdrop-blur-xl">
      <div className="nav-shell">
        <Link to="/" className="brand-link" aria-label={`${profile.name} home`}>
          <span className="brand-mark">{profile.initials}</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`nav-link ${activeSection === link.id ? "nav-link-active" : ""}`}
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`icon-button ${recruiterMode ? "icon-button-active" : ""}`}
            onClick={onToggleRecruiterMode}
            aria-pressed={recruiterMode}
            aria-label="Toggle recruiter mode"
            title="Recruiter mode"
          >
            <ScanSearch aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-button hidden sm:inline-flex"
            onClick={onOpenCommand}
            aria-label="Open command palette"
            title="Command palette"
          >
            <Command aria-hidden="true" />
          </button>
          <a
            className="icon-button hidden sm:inline-flex"
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Open GitHub"
          >
            <Github aria-hidden="true" />
          </a>
          <a
            className="icon-button hidden sm:inline-flex"
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Open LinkedIn"
          >
            <Linkedin aria-hidden="true" />
          </a>
          <a className="btn btn-primary hidden md:inline-flex" href={profile.cv.english} download>
            <Download aria-hidden="true" />
            CV
          </a>
          <button
            type="button"
            className="icon-button lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-menu" className="mobile-menu lg:hidden">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className="mobile-menu-link"
              onClick={() => scrollToSection(link.id)}
            >
              <BriefcaseBusiness aria-hidden="true" />
              {link.label}
            </button>
          ))}
          <div className="grid grid-cols-2 gap-2">
            <a className="btn btn-secondary" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" />
              LinkedIn
            </a>
            <a className="btn btn-secondary" href={profile.socials.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              GitHub
            </a>
          </div>
          <a className="btn btn-primary w-full" href={profile.socials.email}>
            <Mail aria-hidden="true" />
            Email
          </a>
          <a className="btn btn-secondary w-full" href={profile.cv.english} download>
            <Download aria-hidden="true" />
            Download CV
          </a>
        </div>
      ) : null}
    </header>
  );
}
