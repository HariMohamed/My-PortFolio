import portraitUrl from "../../assets/img.png";
import cvEnglishUrl from "../../cv(1).pdf";
import cvFrenchUrl from "../../hari_cv.pdf";

export const profile = {
  name: "Hari Mohamed Rizq",
  initials: "HR",
  role: "AI Systems Engineer",
  positioning: "AI Systems Engineer / Full-Stack Developer / AI Automation Builder",
  badge: "Available for AI Engineering Opportunities",
  headline: "AI Systems Engineer",
  subtitle: "Building production-ready AI products, automation systems, and SaaS MVPs.",
  coreMessage:
    "I build production-ready AI products, automation systems, and SaaS MVPs that solve real business problems.",
  stackLine: "Python · FastAPI · React · LLMs · Docker · n8n",
  location: "Sale, Morocco",
  availability: "Open to AI engineering roles, freelance systems, and SaaS MVP builds",
  email: "mohamedhari13@gmail.com",
  phone: "+212 773 104 530",
  portraitUrl,
  cv: {
    english: cvEnglishUrl,
    french: cvFrenchUrl,
  },
  socials: {
    github: "https://github.com/HariMohamed",
    linkedin: "https://www.linkedin.com/in/mohamed-rizq-hari-4a6416249/",
    email: "mailto:mohamedhari13@gmail.com?subject=Portfolio%20Contact%20-%20AI%20Engineering",
  },
  metrics: [
    {
      label: "Projects",
      value: 15,
      suffix: "+",
      detail: "Across AI, SaaS, MERN, and frontend delivery",
    },
    {
      label: "Production Apps",
      value: 5,
      suffix: "+",
      detail: "Built or contributed to real application workflows",
    },
    {
      label: "Lines of Code",
      value: 100,
      suffix: "K+",
      detail: "Learning, shipping, refactoring, and integrating systems",
    },
    {
      label: "Years Learning & Building",
      value: 3,
      suffix: "+",
      detail: "From web foundations to applied AI systems",
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Intermediate" },
    { name: "English", level: "Intermediate" },
  ],
};
