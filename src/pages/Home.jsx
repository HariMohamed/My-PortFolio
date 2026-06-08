import AIPlayground from "../components/AIPlayground";
import Contact from "../components/Contact";
import CurrentFocus from "../components/CurrentFocus";
import ExperienceTimeline from "../components/ExperienceTimeline";
import FeaturedProjects from "../components/FeaturedProjects";
import Hero from "../components/Hero";
import Metrics from "../components/Metrics";
import Skills from "../components/Skills";

export default function Home({ recruiterMode = false }) {
  return (
    <main id="main">
      <Hero recruiterMode={recruiterMode} />
      <Metrics recruiterMode={recruiterMode} />
      <FeaturedProjects recruiterMode={recruiterMode} />
      <Skills recruiterMode={recruiterMode} />
      <ExperienceTimeline recruiterMode={recruiterMode} />
      <CurrentFocus recruiterMode={recruiterMode} />
      <AIPlayground recruiterMode={recruiterMode} />
      <Contact recruiterMode={recruiterMode} />
    </main>
  );
}
