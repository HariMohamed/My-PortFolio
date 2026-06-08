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
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
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
    if (!location.hash) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#090909" : "#f6f8f7");
  }, [theme]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
        onOpenCommand={() => setCommandOpen(true)}
      />
      <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer onOpenCommand={() => setCommandOpen(true)} />
    </>
  );
}
