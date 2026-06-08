import { Command } from "cmdk";
import {
  BriefcaseBusiness,
  Download,
  Github,
  Linkedin,
  Mail,
  ScanSearch,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { profile } from "../data/profile";

export default function CommandPalette({ open, setOpen, onRecruiterMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  function runCommand(action) {
    setOpen(false);
    window.setTimeout(action, 40);
  }

  function scrollTo(id) {
    runCommand(() => {
      const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      if (location.pathname !== "/") {
        navigate("/");
        window.setTimeout(scroll, 80);
      } else {
        scroll();
      }
    });
  }

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command palette">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No command found.</Command.Empty>
        <Command.Group heading="Navigate">
          <Command.Item onSelect={() => scrollTo("projects")}>
            <BriefcaseBusiness aria-hidden="true" />
            View Projects
          </Command.Item>
          <Command.Item onSelect={() => scrollTo("skills")}>
            <Wrench aria-hidden="true" />
            View Skills
          </Command.Item>
          <Command.Item onSelect={() => scrollTo("contact")}>
            <Mail aria-hidden="true" />
            Contact by Email
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Actions">
          <Command.Item onSelect={() => runCommand(() => window.open(profile.cv.english, "_self"))}>
            <Download aria-hidden="true" />
            Download CV
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => window.open(profile.socials.github, "_blank"))}>
            <Github aria-hidden="true" />
            Open GitHub
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => window.open(profile.socials.linkedin, "_blank"))}>
            <Linkedin aria-hidden="true" />
            Open LinkedIn
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => window.open(profile.socials.email, "_self"))}>
            <Sparkles aria-hidden="true" />
            Contact by Email
          </Command.Item>
          <Command.Item onSelect={() => runCommand(onRecruiterMode)}>
            <ScanSearch aria-hidden="true" />
            Recruiter Mode
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
