import { Command } from "cmdk";
import {
  BriefcaseBusiness,
  Download,
  Github,
  Linkedin,
  Mail,
  Wrench,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { profile } from "../data/profile";
import { scrollToSection } from "../utils/scroll";

export default function CommandPalette({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    previousFocusRef.current = document.activeElement;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      previousFocusRef.current?.focus?.();
      previousFocusRef.current = null;
    };
  }, [open]);

  function runCommand(action) {
    setOpen(false);
    window.setTimeout(action, 40);
  }

  function scrollTo(id) {
    runCommand(() => {
      if (location.pathname !== "/") {
        navigate("/");
        window.setTimeout(() => scrollToSection(id), 80);
      } else {
        scrollToSection(id);
      }
    });
  }

  if (!open) return null;

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div
      className="command-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        className="command-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        aria-describedby="command-palette-description"
        onKeyDown={handleKeyDown}
      >
        <h2 id="command-palette-title" className="sr-only">Command palette</h2>
        <p id="command-palette-description" className="sr-only">
          Search portfolio navigation and actions. Use the arrow keys to move and Enter to select.
        </p>
        <Command label="Command palette">
          <Command.Input ref={inputRef} placeholder="Type a command or search..." />
          <Command.List>
            <Command.Empty>No command found.</Command.Empty>
            <Command.Group heading="Navigate">
              <Command.Item value="View Projects" onSelect={() => scrollTo("projects")}>
                <BriefcaseBusiness aria-hidden="true" />
                View Projects
              </Command.Item>
              <Command.Item value="View Skills" onSelect={() => scrollTo("skills")}>
                <Wrench aria-hidden="true" />
                View Skills
              </Command.Item>
            </Command.Group>
            <Command.Group heading="Actions">
              <Command.Item value="Download CV" onSelect={() => runCommand(() => window.open(profile.cv.english, "_self"))}>
                <Download aria-hidden="true" />
                Download CV
              </Command.Item>
              <Command.Item value="Open GitHub" onSelect={() => runCommand(() => window.open(profile.socials.github, "_blank", "noopener,noreferrer"))}>
                <Github aria-hidden="true" />
                Open GitHub
              </Command.Item>
              <Command.Item value="Open LinkedIn" onSelect={() => runCommand(() => window.open(profile.socials.linkedin, "_blank", "noopener,noreferrer"))}>
                <Linkedin aria-hidden="true" />
                Open LinkedIn
              </Command.Item>
              <Command.Item value="Contact by Email" onSelect={() => runCommand(() => window.open(profile.socials.email, "_self"))}>
                <Mail aria-hidden="true" />
                Contact by Email
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
