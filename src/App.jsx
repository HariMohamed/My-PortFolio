import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CommandPalette from "./components/CommandPalette";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: recruiterMode ? "auto" : "smooth" });
  }, [location.pathname, location.hash, recruiterMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("recruiter-mode", recruiterMode);
  }, [recruiterMode]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={() => setRecruiterMode((value) => !value)}
        onOpenCommand={() => setCommandOpen(true)}
      />
      <CommandPalette
        open={commandOpen}
        setOpen={setCommandOpen}
        onRecruiterMode={() => setRecruiterMode((value) => !value)}
      />
      <Routes>
        <Route path="/" element={<Home recruiterMode={recruiterMode} />} />
        <Route path="/projects/:slug" element={<ProjectDetails recruiterMode={recruiterMode} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer onOpenCommand={() => setCommandOpen(true)} />
    </>
  );
}
