import syndicaiImg from "../../projects/syndicai/syndicai.png";
import elalaouilaboImg from "../../projects/elalaouilabo/elalaouilabo.png";
import gymImg from "../../projects/gym-coaching-saas/gym.png";
import cfqmaImg from "../../projects/cfqma-platform/cfqma.png";
import orabellaImg from "../../projects/orabella/orabella.png";

export const projects = [
  {
    slug: "syndicai",
    title: "SyndicAI",
    period: "2026",
    maturity: "Deployed SaaS MVP",
    category: "AI-Powered Condominium Management SaaS",
    summary: "Backend integration and architecture for a multi-portal SaaS platform managing condominium operations, integrating LLM workflows and multi-tenant data isolation.",
    problem:
      "Property management requires complex multi-role workflows (syndics, co-owners, promoters) that traditionally rely on fragmented communication and manual financial document generation.",
    solution:
      "Implemented the core FastAPI backend and AI integration layer for a multi-portal SaaS, supporting automated PDF generation and LLM-assisted data retrieval.",
    architecture:
      "FastAPI backend with PostgreSQL, Redis, and Celery for background tasks. Multi-tenant isolation using Row-Level Security (RLS). LangChain/Groq for AI workflows.",
    stack: ["FastAPI", "Python", "PostgreSQL", "Celery", "Redis", "LangChain"],
    contribution: ["Implemented the FastAPI backend and AI integration layer", "Designed multi-tenant data boundaries with PostgreSQL RLS", "Integrated asynchronous PDF generation with Celery"],
    focus: ["Backend Architecture", "Multi-Tenant SaaS", "AI Integration", "API Design"],
    features: [
      "Row-Level Security (RLS) for multi-tenant data isolation",
      "Celery workers for async PDF document generation",
      "LangChain/Groq LLM integration for property queries",
      "RBAC authorization for promoters, syndics, and co-owners",
    ],
    challenges: [
      "Enforcing strict multi-tenant data isolation using PostgreSQL RLS.",
      "Integrating LangChain workflows securely with business data.",
      "Managing asynchronous PDF report generation without blocking the main API thread.",
    ],
    results: [
      "Delivered a working FastAPI backend and AI integration layer for a deployed SaaS MVP.",
      "Implemented multi-role authorization and tenant-scoped data boundaries across the application.",
    ],
    screenshot: syndicaiImg,
    repository: {
      url: null,
      isPublic: false,
    },
    links: {
      live: "https://syndicai-ssp.vercel.app/",
      caseStudy: "/projects/syndicai",
    },
  },
  {
    slug: "elalaouilabo",
    title: "El Alaoui Labo",
    period: "2026",
    maturity: "Deployed Professional Website",
    category: "Professional Website",
    summary: "A statically generated Next.js frontend for a photography studio, optimized for local SEO, performance, and direct WhatsApp client bookings.",
    problem:
      "The studio needed a digital presence optimized for local search visibility and direct client conversion via WhatsApp, without relying on complex backend infrastructure.",
    solution:
      "Built a statically generated Next.js application with strict semantic markup and comprehensive LocalBusiness JSON-LD structured data.",
    architecture:
      "Next.js (App Router) frontend utilizing Static Site Generation (SSG) for optimal load times, styled with Tailwind CSS.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    focus: ["Frontend Architecture", "Technical SEO", "Performance Optimization"],
    features: [
      "Statically generated routes (SSG) for optimized page loads",
      "Dynamic sitemap.xml and robots.txt generation",
      "Comprehensive JSON-LD structured data (LocalBusiness/WebSite)",
      "WhatsApp integration for client bookings",
    ],
    challenges: [
      "Implementing robust technical SEO and metadata hierarchies within the Next.js App Router.",
      "Maintaining a strict design aesthetic while keeping DOM complexity low.",
    ],
    results: [
      "Delivered a responsive, statically generated frontend deployed on Vercel.",
      "Implemented technical SEO infrastructure for local search discovery.",
    ],
    screenshot: elalaouilaboImg,
    contribution: ["Implemented the responsive Next.js frontend", "Structured technical SEO and metadata", "Integrated the WhatsApp-first contact workflow"],
    repository: {
      url: null,
      isPublic: false,
    },
    links: {
      live: "https://elalaouilabo.vercel.app/",
      caseStudy: "/projects/elalaouilabo",
    },
  },
  {
    slug: "gym-coaching-saas",
    title: "Gym Coaching SaaS",
    period: "2025",
    maturity: "Deployed MVP",
    category: "SaaS Platform for Fitness Coaches",
    summary: "A full-stack SaaS MVP built with Next.js and Supabase, providing fitness coaches with a centralized workspace to manage athletes and training programs.",
    problem:
      "Independent fitness coaches lacked a unified platform to handle client onboarding, secure authentication, and recurring service delivery workflows.",
    solution:
      "Developed a role-based dashboard application leveraging Supabase for authentication and database management, with Stripe integration for subscription workflows.",
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
      "Delivered a functional SaaS MVP with end-to-end coach and athlete workflows.",
      "Integrated third-party authentication and payment services into a Next.js architecture.",
    ],
    screenshot: gymImg,
    contribution: ["Implemented the coach and athlete workflow UI", "Integrated Supabase authentication and data access", "Added validation and subscription workflow integrations"],
    repository: {
      url: null,
      isPublic: false,
    },
    links: {
      live: "https://gym-coaching-site.vercel.app/",
      caseStudy: "/projects/gym-coaching-saas",
    },
  },
  {
    slug: "cfqma-platform",
    title: "CFQMA Platform",
    period: "2024",
    maturity: "Deployed Full-Stack Platform",
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
      "Migrating and structuring legacy JSON data into a MongoDB schema.",
      "Designing a clean, intuitive admin interface for non-technical users.",
      "Managing frontend routing and protected API endpoints securely.",
    ],
    results: [
      "Replaced a static site with a fully dynamic, database-driven platform.",
      "Delivered end-to-end full-stack implementation from API design to responsive UI.",
    ],
    screenshot: cfqmaImg,
    contribution: ["Implemented the React frontend and content presentation", "Integrated the REST API and MongoDB-backed content", "Built the administrative content workflow"],
    repository: {
      url: null,
      isPublic: false,
    },
    links: {
      live: "https://cfqma-platform.vercel.app/",
      caseStudy: "/projects/cfqma-platform",
    },
  },
  {
    slug: "orabella",
    title: "OraBella",
    period: "2026",
    maturity: "Deployed E-commerce",
    category: "Moroccan Watch E-commerce",
    summary: "A modern Moroccan watch e-commerce web application featuring product discovery, categorization, and a Cash on Delivery checkout flow.",
    problem:
      "The Moroccan market requires an e-commerce experience tailored to local purchasing habits, emphasizing product discovery and seamless Cash on Delivery (COD) workflows.",
    solution:
      "Built a full-stack e-commerce web application with a responsive product catalog, category browsing, cart management, and a streamlined COD checkout integrated with WhatsApp for customer support.",
    architecture:
      "Next.js frontend with Tailwind CSS and shadcn/ui for responsive design, backed by Supabase for product data, categories, and admin management.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "shadcn/ui"],
    focus: ["E-commerce Architecture", "Product Data Management", "Checkout Flow"],
    features: [
      "Responsive product catalog and category browsing",
      "Cart management and Cash on Delivery checkout flow",
      "WhatsApp customer support integration",
      "Supabase-backed admin and product management",
    ],
    challenges: [
      "Designing a frictionless Cash on Delivery checkout flow.",
      "Structuring the product and category schema in Supabase for efficient querying.",
      "Optimizing the responsive UI for mobile-first product discovery.",
    ],
    results: [
      "Deployed a fully functional e-commerce platform tailored to the Moroccan watch market.",
      "Delivered an intuitive admin workflow for ongoing product and order management.",
    ],
    screenshot: orabellaImg,
    contribution: [
      "Developed the e-commerce architecture and product discovery UI",
      "Implemented the cart, checkout, and Cash on Delivery workflows",
      "Integrated Supabase for backend data and admin management",
    ],
    repository: {
      url: null,
      isPublic: false,
    },
    links: {
      live: "https://orabellam.vercel.app/",
      caseStudy: "/projects/orabella",
    },
  },
];

export const featuredProjects = projects.slice(0, 5);

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
