import Contact from "../components/Contact";
import CurrentFocus from "../components/CurrentFocus";
import FeaturedProjects from "../components/FeaturedProjects";
import Hero from "../components/Hero";
import Metrics from "../components/Metrics";
import Skills from "../components/Skills";
import Timeline from "../components/Timeline";
import { professionalExperience, academicEducation } from "../data/experience";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Metrics />
      <FeaturedProjects />
      <Timeline
        id="experience"
        eyebrow="Experience"
        title="Professional Experience"
        description="Paid and freelance work focused on full-stack delivery and AI integration."
        items={professionalExperience}
      />
      <Skills />
      <Timeline
        id="education"
        eyebrow="Education"
        title="Academic Foundation"
        description="Formal degrees and professional training in systems engineering and AI."
        items={academicEducation}
      />
      <CurrentFocus />
      <Contact />
    </main>
  );
}
