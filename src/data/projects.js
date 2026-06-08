import { profile } from "./profile";

export const projects = [
  {
    slug: "syndicai",
    title: "SyndicAI",
    period: "2026",
    category: "AI SaaS",
    summary: "Intelligent condominium management SaaS assisted by AI.",
    problem:
      "Condominium management often depends on fragmented communication, manual financial follow-up, and slow access to documents for promoters, syndics, and co-owners.",
    solution:
      "Designed a multi-portal SaaS concept with AI assistance, WhatsApp-ready workflows, PDF generation, and structured financial analysis for Moroccan property management teams.",
    architecture:
      "React frontend, FastAPI API layer, PostgreSQL data model, LangChain-assisted AI flows, Groq LLM integration, and document-generation services.",
    stack: ["React", "FastAPI", "Python", "PostgreSQL", "LangChain", "Groq", "PDF"],
    features: [
      "Promoter, syndic, and co-owner portal flows",
      "AI chatbot for first-level information access",
      "Financial analysis screens for recurring charges and balances",
      "PDF document generation for administrative workflows",
      "WhatsApp integration path for resident communication",
    ],
    challenges: [
      "Modeling different user roles without making the product feel complicated",
      "Keeping AI assistance grounded in the platform workflows",
      "Designing financial data views that non-technical users can scan quickly",
    ],
    results: [
      "Clarified a real SaaS product direction for condominium operations",
      "Connected AI assistance to concrete admin and communication tasks",
      "Created a strong flagship project for AI/full-stack positioning",
    ],
    links: {
      github: profile.socials.github,
      live: null,
      caseStudy: "/projects/syndicai",
    },
  },
  {
    slug: "gym-coaching-saas",
    title: "Gym Coaching SaaS",
    period: "2025",
    category: "Full-Stack SaaS",
    summary: "Fitness coach and client management platform for recurring coaching workflows.",
    problem:
      "Independent fitness coaches need a simple way to manage clients, programs, progress, communication, and recurring service delivery without relying on spreadsheets.",
    solution:
      "Built a SaaS-style platform around coach/client management, role-based workflows, program organization, and a clean dashboard experience for daily operations.",
    architecture:
      "React frontend with route-based dashboards, API-first backend structure, database-backed client records, authentication, and deployable environment configuration.",
    stack: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS", "Authentication"],
    features: [
      "Coach and client dashboard structure",
      "Client records and program organization",
      "Authentication-ready user flows",
      "Responsive UI for mobile and desktop usage",
      "Operational sections that can expand into payments, plans, and progress tracking",
    ],
    challenges: [
      "Designing a SaaS workflow that stays simple for non-technical users",
      "Balancing dashboard density with mobile readability",
      "Preparing the codebase for future production modules",
    ],
    results: [
      "Turned a service business workflow into a scalable SaaS MVP direction",
      "Demonstrated full-stack product thinking beyond static landing pages",
      "Created a foundation for freelance/client acquisition conversations",
    ],
    links: {
      github: profile.socials.github,
      live: null,
      caseStudy: "/projects/gym-coaching-saas",
    },
  },
  {
    slug: "ai-automation-workflows",
    title: "AI Automation Workflows",
    period: "2025",
    category: "AI Automation",
    summary: "n8n-style automation systems for lead routing, AI replies, and workflow orchestration.",
    problem:
      "Many small teams lose time on repetitive admin work: qualifying leads, answering common questions, routing requests, summarizing data, and moving information between tools.",
    solution:
      "Designed automation workflow patterns that combine triggers, LLM-based classification, structured outputs, notifications, and human review points.",
    architecture:
      "Trigger-based workflow orchestration with n8n, webhook endpoints, LLM calls, structured JSON outputs, email/CRM-style handoffs, and observability checkpoints.",
    stack: ["n8n", "LLMs", "Webhooks", "JavaScript", "JSON", "APIs", "Automation"],
    features: [
      "Lead qualification and routing workflow patterns",
      "AI-generated response drafts with review gates",
      "Webhook-first integration approach",
      "Structured outputs for safer downstream automation",
      "Reusable workflow templates for client operations",
    ],
    challenges: [
      "Preventing AI output from becoming too open-ended for automation",
      "Designing workflows that remain useful even when a human review is required",
      "Keeping the system explainable for business users",
    ],
    results: [
      "Built a clear service offer around practical AI automation",
      "Connected AI capabilities to measurable business workflow problems",
      "Created reusable patterns for future freelance delivery",
    ],
    links: {
      github: profile.socials.github,
      live: null,
      caseStudy: "/projects/ai-automation-workflows",
    },
  },
  {
    slug: "medical-device-mern-blog",
    title: "MERN Blog / Medical Device",
    period: "2025",
    category: "MERN Application",
    summary: "Interactive content and user-management application built during Easy Medical Device work.",
    problem:
      "The product needed dynamic content workflows and user management rather than a static website, with a stack that could support future feature growth.",
    solution:
      "Developed MERN application features for an interactive blog, authentication-oriented flows, real-time content updates, and maintainable UI sections.",
    architecture:
      "React client, Express/Node backend, MongoDB persistence, REST API routes, authentication flows, and reusable UI components for content management.",
    stack: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS", "REST APIs"],
    features: [
      "Interactive blog experience",
      "User management workflows",
      "REST API structure for content operations",
      "Responsive frontend screens",
      "Reusable component patterns for future modules",
    ],
    challenges: [
      "Coordinating frontend state with backend content operations",
      "Building features that could evolve beyond the first blog scope",
      "Keeping the UI understandable for content administrators",
    ],
    results: [
      "Delivered practical MERN experience in a professional context",
      "Strengthened authentication, API, and content workflow skills",
      "Added credible full-stack evidence for recruiter review",
    ],
    links: {
      github: profile.socials.github,
      live: null,
      caseStudy: "/projects/medical-device-mern-blog",
    },
  },
];

export const featuredProjects = projects.slice(0, 4);

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
