export const projects = [
  {
    slug: "syndicai",
    title: "SyndicAI",
    period: "2026",
    category: "AI-Powered Condominium Management SaaS",
    summary: "Backend integration and architecture for a multi-portal SaaS platform managing condominium operations, integrating LLM workflows and multi-tenant data isolation.",
    problem:
      "Property management requires complex multi-role workflows (syndics, co-owners, promoters) that traditionally rely on fragmented communication and manual financial document generation.",
    solution:
      "Implemented the core FastAPI backend and AI integration layer for a multi-portal SaaS, supporting automated PDF generation and LLM-assisted data retrieval.",
    architecture:
      "FastAPI backend with PostgreSQL (93 tables), Redis, and Celery for background tasks. Multi-tenant isolation using Row-Level Security (RLS). LangChain/Groq for AI workflows. Deployed via Kubernetes (k3s).",
    stack: ["FastAPI", "Python", "PostgreSQL", "Celery", "Redis", "LangChain", "Kubernetes"],
    focus: ["Backend Architecture", "Multi-Tenant SaaS", "AI Integration", "API Design"],
    features: [
      "Row-Level Security (RLS) for multi-tenant data isolation",
      "Celery workers for async PDF document generation",
      "LangChain/Groq LLM integration for property queries",
      "RBAC authorization for promoters, syndics, and co-owners",
    ],
    challenges: [
      "Enforcing strict multi-tenant data isolation across 93 database tables using PostgreSQL RLS.",
      "Integrating LangChain workflows securely with business data.",
      "Managing asynchronous PDF report generation without blocking the main API thread.",
    ],
    results: [
      "Built and integrated the FastAPI backend and AI layer for a production-ready SaaS.",
      "Achieved 54% test coverage with automated CI/CD deployment to a Kubernetes cluster.",
      "Successfully modeled complex multi-role authorization and data boundaries.",
    ],
    links: {
      github: "https://github.com/HariMohamed/syndicai",
      live: "https://syndicai-ssp.vercel.app/",
      caseStudy: "/projects/syndicai",
    },
  },
  {
    slug: "elalaouilabo",
    title: "El Alaoui Labo",
    period: "2026",
    category: "Professional Website",
    summary: "Production frontend for a photography studio focusing on technical SEO, performance, and WhatsApp-first conversion workflows.",
    problem:
      "The studio needed a digital presence optimized for local search visibility and direct client conversion via WhatsApp, without relying on complex backend infrastructure.",
    solution:
      "Built a highly performant, statically generated Next.js application with strict semantic markup and comprehensive LocalBusiness JSON-LD structured data.",
    architecture:
      "Next.js 16 (App Router) frontend utilizing Static Site Generation (SSG) for optimal load times, styled with Tailwind CSS v4.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    focus: ["Frontend Architecture", "Technical SEO", "Performance Optimization"],
    features: [
      "Statically generated routes (SSG) for optimized page loads",
      "Dynamic sitemap.xml and robots.txt generation",
      "Comprehensive JSON-LD structured data (LocalBusiness/WebSite)",
      "WhatsApp-first conversion event integration",
    ],
    challenges: [
      "Implementing robust technical SEO and metadata hierarchies within the Next.js App Router.",
      "Maintaining a strict design aesthetic while keeping DOM complexity low.",
    ],
    results: [
      "Delivered a production-ready, highly responsive frontend deployed on Vercel.",
      "Achieved optimal technical SEO infrastructure for local search discovery.",
    ],
    links: {
      github: "https://github.com/HariMohamed/elalaouilabo",
      live: "https://elalaouilabo.vercel.app/",
      caseStudy: "/projects/elalaouilabo",
    },
  },
  {
    slug: "gym-coaching-saas",
    title: "Gym Coaching SaaS",
    period: "2025",
    category: "SaaS Platform for Fitness Coaches",
    summary: "A full-stack SaaS MVP built with Next.js and Supabase, providing fitness coaches with a centralized workspace to manage athletes and training programs.",
    problem:
      "Independent fitness coaches lacked a unified platform to handle client onboarding, secure authentication, and recurring service delivery workflows.",
    solution:
      "Developed a role-based dashboard application leveraging Supabase for authentication and database management, with Stripe integration for subscriptions.",
    architecture:
      "Next.js frontend integrated directly with Supabase Auth and PostgreSQL, utilizing React Hook Form and Zod for strict client-side validation.",
    stack: ["Next.js", "React", "Supabase", "Stripe", "Tailwind CSS", "Zod"],
    focus: ["SaaS Architecture", "Authentication Flows", "State Management"],
    features: [
      "Role-based authentication (Coach/Client/Admin) via Supabase Auth",
      "Workout program builder with sets, reps, and RPE tracking",
      "Strict schema validation using Zod and React Hook Form",
      "Stripe integration for subscription workflows",
    ],
    challenges: [
      "Managing complex relational state between coaches, clients, and training programs on the frontend.",
      "Securing API routes and database access based on user roles.",
    ],
    results: [
      "Delivered a functional SaaS MVP demonstrating end-to-end user workflows.",
      "Successfully integrated third-party authentication and payment services into a Next.js architecture.",
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
    category: "Full-Stack Educational Platform",
    summary: "A full-stack MERN platform built for a training center, featuring public content presentation, student pre-registration, and an administrative content management system.",
    problem:
      "The institution required a dynamic platform to manage public content (formations, news, events) and process student pre-registrations without editing code.",
    solution:
      "Developed a Node.js/Express backend with MongoDB to serve dynamic content to a React frontend, protected by JWT authentication for admin routes.",
    architecture:
      "React/Vite SPA frontend communicating with a RESTful Node.js/Express API. Data is persisted in MongoDB Atlas, with admin routes secured via JWT.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    focus: ["Full-Stack Web Development", "REST API Design", "Content Management"],
    features: [
      "Public frontend for formations, events, and pre-registrations",
      "JWT-secured administrative dashboard for content management",
      "RESTful Express API with Mongoose schema validation",
      "Rate-limiting and security headers (Helmet) implementation",
    ],
    challenges: [
      "Migrating and structuring legacy JSON data into a relational MongoDB schema.",
      "Designing a clean, intuitive admin interface for non-technical users.",
      "Managing frontend routing and protected API endpoints securely.",
    ],
    results: [
      "Replaced a static site with a fully dynamic, database-driven platform.",
      "Delivered end-to-end full-stack implementation from API design to responsive UI.",
    ],
    links: {
      github: "https://github.com/HariMohamed/cfqma-platform",
      live: "https://cfqma-platform.vercel.app/",
      caseStudy: "/projects/cfqma-platform",
    },
  },
];

export const featuredProjects = projects.slice(0, 4);

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
