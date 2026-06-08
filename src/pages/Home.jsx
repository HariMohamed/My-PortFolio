import AIPlayground from "../components/AIPlayground";
import Contact from "../components/Contact";
import CurrentFocus from "../components/CurrentFocus";
import ExperienceTimeline from "../components/ExperienceTimeline";
import FeaturedProjects from "../components/FeaturedProjects";
import Hero from "../components/Hero";
import Metrics from "../components/Metrics";
import Skills from "../components/Skills";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Metrics />
      <FeaturedProjects />
      <Skills />
      <ExperienceTimeline />
      <CurrentFocus />
      <AIPlayground />
      <Contact />
    </main>
  );
}
