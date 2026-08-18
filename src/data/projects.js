export const projects = [
  {
    slug: "syndicai",
    title: "SyndicAI",
    period: "2026",
    category: "AI-Powered Condominium Management SaaS",
    summary: "Built a full-stack SaaS platform that centralizes condominium management workflows and integrates AI assistance to help property managers handle information and operations more efficiently.",
    problem:
      "Condominium management often depends on fragmented communication, manual financial follow-up, and slow access to documents for promoters, syndics, and co-owners.",
    solution:
      "Designed a multi-portal SaaS platform with AI assistance, document generation, and structured financial views for Moroccan property management teams.",
    architecture:
      "React frontend, FastAPI API layer, PostgreSQL data model, LangChain-assisted AI flows, and document-generation services.",
    stack: ["React", "FastAPI", "Python", "PostgreSQL", "LangChain"],
    focus: ["AI Integration", "SaaS", "REST APIs", "Full-Stack"],
    features: [
      "Promoter, syndic, and co-owner portal flows",
      "AI chatbot for first-level information access",
      "Financial analysis screens for recurring charges and balances",
      "PDF document generation for administrative workflows",
    ],
    challenges: [
      "Modeling different user roles without making the product feel complicated",
      "Keeping AI assistance grounded in the platform workflows",
      "Designing financial data views that non-technical users can scan quickly",
    ],
    results: [
      "Designed and implemented multi-portal front-end and FastAPI backend supporting document generation",
      "Implemented AI-assisted chatbot flows and structured financial views for condominium workflows",
      "Delivered a working prototype demonstrating end-to-end AI and full-stack integration",
    ],
    links: {
      live: "https://syndicai-ssp.vercel.app/",
      caseStudy: "/projects/syndicai",
    },
  },
  {
    slug: "elalaoui-labo",
    title: "El Alaoui Labo",
    period: "2026",
    category: "Professional Website",
    summary: "Professional website for a photography and video studio in Salé, Morocco, focused on presenting services, portfolio work, contact information, and a production-ready digital presence with technical SEO.",
    problem:
      "The studio needed a professional web presence to showcase their services, portfolio, and contact information to attract local clients and improve their digital visibility.",
    solution:
      "Built a responsive Next.js website with structured content, technical SEO, and clear call-to-actions, ensuring cross-device compatibility and high performance.",
    architecture:
      "Next.js frontend with component-based architecture, responsive layout, and metadata API for technical SEO.",
    stack: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    focus: ["Frontend Architecture", "Technical SEO", "Responsive UI"],
    features: [
      "Production-ready responsive website",
      "Technical SEO with Open Graph metadata",
      "XML sitemap and robots.txt configuration",
      "Structured semantic content",
    ],
    challenges: [
      "Structuring content for professional presentation",
      "Ensuring accessibility and responsive behavior across devices",
      "Implementing comprehensive SEO metadata",
    ],
    results: [
      "Delivered a production-ready digital presence for the studio",
      "Implemented technical SEO and structured metadata",
      "Deployed on Vercel for high performance and reliability",
    ],
    links: {
      github: "https://github.com/HariMohamed/elalaouilabo",
      live: "https://elalaouilabo.vercel.app/",
      caseStudy: "/projects/elalaoui-labo",
    },
  },
  {
    slug: "gym-coaching-saas",
    title: "Gym Coaching SaaS",
    period: "2025",
    category: "SaaS Platform for Fitness Coaches",
    summary: "Built a full-stack coaching platform that gives fitness professionals a centralized workspace to manage athletes, create personalized training programs, and monitor client progress.",
    problem:
      "Independent fitness coaches need a simple way to manage clients, programs, progress, communication, and recurring service delivery without relying on spreadsheets.",
    solution:
      "Built a SaaS-style platform around coach/client management, role-based workflows, program organization, and a clean dashboard experience for daily operations.",
    architecture:
      "Next.js frontend with route-based dashboards, role-based authentication, and responsive UI for mobile and desktop usage.",
    stack: ["React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL"],
    focus: ["SaaS", "Dashboard Architecture", "CRUD Workflows"],
    features: [
      "Coach and client dashboard structure",
      "Client management and athlete profiles",
      "Workout builder with sets, reps, and RPE tracking",
      "Progress tracking and data visualization",
      "Role-based authentication flows",
    ],
    challenges: [
      "Designing a SaaS workflow that stays simple for non-technical users",
      "Balancing dashboard density with mobile readability",
      "Preparing the codebase for future production modules",
    ],
    results: [
      "Built a route-based dashboard with authentication to support coach/client workflows",
      "Implemented client records and program organization modules",
      "Produced a deployable frontend with workout builder and progress tracking",
    ],
    links: {
      github: "https://github.com/HariMohamed/gym-coaching-site",
      live: "https://gym-coaching-site.vercel.app/",
      caseStudy: "/projects/gym-coaching-saas",
    },
  },
  {
    slug: "cfqma-platform",
    title: "CFQMA Platform",
    period: "2024",
    category: "Events & Exhibitions Experience",
    summary: "Developed and integrated the events and exhibitions experience for the CFQMA platform, focusing on a structured, responsive interface for presenting cultural and professional events.",
    problem:
      "The training center needed a professional web presence to showcase their programs, events, and exhibitions to prospective students and partners.",
    solution:
      "Built responsive React interfaces with structured content for the events and exhibitions sections, ensuring cross-device compatibility and maintainable content architecture.",
    architecture:
      "React frontend with component-based architecture, JSON-backed content structure, and responsive layouts for desktop and mobile.",
    stack: ["React", "JavaScript", "Bootstrap", "CSS3"],
    focus: ["React", "Frontend Architecture", "Responsive UI", "Component Design"],
    features: [
      "Events and exhibitions presentation interface",
      "Responsive design for mobile and desktop",
      "Structured content architecture for easy maintenance",
      "Cross-device compatibility",
    ],
    challenges: [
      "Building a professional interface within a short engagement period",
      "Structuring content for non-technical administrators",
      "Ensuring accessibility and responsive behavior across devices",
    ],
    results: [
      "Delivered a responsive events and exhibitions interface for the training center",
      "Implemented structured JSON-backed content for easier maintenance",
      "Improved cross-device compatibility and accessibility basics",
    ],
    links: {
      live: "https://cfqma-platform.vercel.app/",
      caseStudy: "/projects/cfqma-platform",
    },
  },
];

export const featuredProjects = projects.slice(0, 4);

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
