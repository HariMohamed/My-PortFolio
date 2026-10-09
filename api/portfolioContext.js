


const profile = {
  name: "Hari Mohamed Rizq",
  initials: "HR",
  role: "Full-Stack Developer & AI Integration Engineer",
  positioning: "Junior Full-Stack Developer / AI Integration Engineer",
  badge: "Available for Full-Stack & AI Integration Projects",
  headline: "Full-Stack Developer & AI Integration Engineer",
  subtitle: "I design, build, and deploy web applications, SaaS platforms, automation workflows, and AI-powered systems — from backend architecture to deployment.",
  coreMessage:
    "I build web systems, SaaS platforms, and AI-powered applications that solve practical business problems — from backend APIs to deployment.",
  stackLine: "React · FastAPI · Python · PostgreSQL · Docker · n8n",
  location: "Morocco",
  availability: "Open to junior software engineering, AI integration, and freelance opportunities",
  email: "mohamedhari13@gmail.com",
  phone: "+212 773 104 530",
  portraitUrl: "/portrait.webp",
  cv: {
    english: null,
  },
  socials: {
    github: "https://github.com/HariMohamed",
    linkedin: "https://www.linkedin.com/in/mohamed-rizq-hari-4a6416249/",
    email: "mailto:mohamedhari13@gmail.com?subject=Portfolio%20Contact",
  },
  metrics: [
    {
      label: "Deployed Projects",
      value: 5,
      suffix: "",
      detail: "Deployed systems across SaaS, AI integration, and frontend engineering",
    },
    {
      label: "Years Building",
      value: 3,
      suffix: "+",
      detail: "From web foundations to full-stack systems and AI-powered applications",
    },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "French", level: "Intermediate" },
    { name: "English", level: "Intermediate" },
  ],
};






const projects = [
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
    screenshot: null,
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
    screenshot: null,
    contribution: ["Implemented the responsive Next.js frontend", "Structured technical SEO and metadata", "Integrated the WhatsApp-first contact workflow"],
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
    screenshot: null,
    contribution: ["Implemented the coach and athlete workflow UI", "Integrated Supabase authentication and data access", "Added validation and subscription workflow integrations"],
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
    screenshot: null,
    contribution: ["Implemented the React frontend and content presentation", "Integrated the REST API and MongoDB-backed content", "Built the administrative content workflow"],
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
    screenshot: null,
    contribution: [
      "Developed the e-commerce architecture and product discovery UI",
      "Implemented the cart, checkout, and Cash on Delivery workflows",
      "Integrated Supabase for backend data and admin management",
    ],
    links: {
      live: "https://orabellam.vercel.app/",
      caseStudy: "/projects/orabella",
    },
  },
];

const featuredProjects = projects.slice(0, 5);

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

const professionalExperience = [
  {
    role: "AI Integrator",
    organization: "Capital Innov",
    location: "Rabat",
    period: "Oct 2025 - Feb 2026",
    type: "Experience",
    bullets: [
      "Contributed to ERP development for construction-sector workflows.",
      "Designed technical diagrams, modeled business processes, and drafted module specifications.",
      "Implemented web features and integrated AI services against project requirements.",
    ],
    technologies: ["AI APIs", "React", "Django", "PostgreSQL", "TailwindCSS"],
  },
  {
    role: "Full Stack Developer",
    organization: "Easy Medical Device",
    location: "Rabat",
    period: "May 2025 - Aug 2025",
    type: "Experience",
    bullets: [
      "Implemented MERN features for an interactive blog and content workflow.",
      "Structured user-management and dynamic content flows.",
      "Integrated reusable frontend components with backend API patterns.",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    role: "Frontend Developer",
    organization: "CFQMA",
    location: "Salé",
    period: "Apr 2024 - May 2024",
    type: "Experience",
    bullets: [
      "Implemented responsive React interfaces for a company website.",
      "Improved cross-device compatibility and accessibility basics.",
      "Structured JSON-backed content for maintainable updates.",
    ],
    technologies: ["React", "CSS3", "Bootstrap", "JavaScript", "JSON"],
  }
];

const academicEducation = [
  {
    role: "Formation Professionnelle Qualifiante en IA",
    organization: "IDS Salé & GIZ Maroc (Projet Tamheen II)",
    location: "Mode Dual",
    period: "2025 - 2026",
    type: "Education",
    bullets: [
      "Python and AI application development",
      "Generative AI, prompt engineering, and AI integration",
      "Process automation, data visualization, and chatbot workflows"
    ],
    technologies: ["Python", "Generative AI", "n8n", "Automation"],
  },
  {
    role: "Licence — Ingénierie des Systèmes Informatiques",
    organization: "SUPMTI",
    location: "Rabat",
    period: "2025",
    type: "Education",
    bullets: [
      "Software engineering and systems analysis",
      "Databases, administration, and data analysis",
      "Object-oriented programming, networks, and artificial intelligence"
    ],
    technologies: ["Java", "Python", "SQL", "PostgreSQL"],
  },
  {
    role: "DTS — Développement Digital / Web Full-Stack",
    organization: "ISTA Chmaou",
    location: "Salé",
    period: "2022 - 2024",
    type: "Education",
    bullets: [
      "Full-stack web development with HTML, CSS, JavaScript, React, PHP, and Laravel",
      "SQL, MySQL, MongoDB, cloud fundamentals, and algorithms",
      "Information systems security and backend application development"
    ],
    technologies: ["React", "PHP", "Laravel", "SQL", "MongoDB"],
  }
];

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Python", "FastAPI", "Node.js"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    title: "AI & Automation",
    skills: ["LangChain", "AI APIs", "n8n"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Git", "Vercel"],
  },
];

const currentFocus = [
  "AI Agents",
  "RAG Systems",
  "Multi-agent workflows",
  "LLM Evaluation",
  "Workflow Automation",
  "SaaS MVPs",
];


const portfolioContext = { profile, projects, experience: { professionalExperience, academicEducation }, skills: { currentFocus, skillGroups } };

export { portfolioContext };