import resumePdf from "./imports/Jatin_yadav_-_Full_Stack_Web_Developer.pdf?url";

export const PROFILE = {
  name: "Jatin Yadav",
  handle: "Jatinyadav29",
  roles: [
    "Backend Developer",
    "Full Stack · MERN",
    "TypeScript + Redis",
    "Builder & Explorer",
  ],
  location: "Delhi, India",
  timeZone: "Asia/Kolkata",
  email: "jatinyadav.jatin.29@gmail.com",
  github: "https://github.com/Jatinyadav29",
  linkedin: "https://www.linkedin.com/in/jatinyadav2006/",
  resume: resumePdf,
  note: "winter build season",
};

export type Project = {
  slug: string;
  name: string;
  tag: string;
  status?: string;
  /** one-liner for the home page card */
  brief: string;
  summary: string;
  points: string[];
  stack: string[];
  live?: string;
  repos: { label: string; href: string }[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "nexus",
    name: "Nexus",
    brief: "Booking platform for a real gaming café — I lead the backend.",
    tag: "Full Stack · Backend Lead",
    status: "Live · in active use",
    featured: true,
    summary:
      "Booking & management platform built for a real gaming café — I own the backend, data layer and deployment.",
    points: [
      "Migrated the whole codebase from JavaScript to TypeScript for type-safe APIs and models.",
      "Redis caching on hot read paths to cut repeat database round-trips.",
      "MongoDB aggregation pipelines for booking and usage analytics; schema design + indexes cut API response times by up to 40%.",
      "JWT + bcrypt auth with role-based access control, real-time chat, and a CI/CD pipeline for automated deploys.",
      "Next up: a WhatsApp booking agent so customers can book without opening the site.",
    ],
    stack: ["TypeScript", "Node.js", "Express", "MongoDB", "Redis", "React", "JWT"],
    live: "https://nexus-frontend-lyart.vercel.app/",
    repos: [
      { label: "Backend", href: "https://github.com/Jatin29yadav/Nexus" },
      { label: "Frontend", href: "https://github.com/Jatinyadav29/nexus-frontend" },
    ],
  },
  {
    slug: "tradez",
    name: "TradeZ",
    brief: "Trading analytics dashboard for scalpers and prop-firm traders.",
    tag: "Frontend · Dashboard",
    summary:
      "Dark-themed trading analytics dashboard for scalpers and prop-firm traders.",
    points: [
      "Interactive equity curves, P&L heatmaps and a global command palette.",
      "Redux state with a mock backend that simulates live market conditions.",
      "GSAP motion tuned for dense data views.",
    ],
    stack: ["React", "Redux", "GSAP", "Tailwind"],
    live: "https://trade-z-frontend.vercel.app/",
    repos: [{ label: "Code", href: "https://github.com/Jatinyadav29/TradeZ-frontend" }],
  },
  {
    slug: "sky-mart",
    name: "Sky Mart",
    brief: "Glassmorphic e-commerce app with filters and a persistent cart.",
    tag: "Frontend · E-commerce",
    summary:
      "Glassmorphic e-commerce app with search, filters, sorting and a persistent cart.",
    points: [
      "Client-side auth and dynamic product catalog.",
      "LocalStorage-backed cart with smooth scroll interactions.",
    ],
    stack: ["React", "Tailwind"],
    live: "https://sky-mart-woad.vercel.app/",
    repos: [{ label: "Code", href: "https://github.com/Jatinyadav29/Sky-Mart" }],
  },
  {
    slug: "vastra-by-inayat",
    name: "Vastra by Inayat",
    brief: "Clothing storefront with code-split routes and typed cart logic.",
    tag: "Frontend · Storefront",
    summary:
      "Clothing storefront with client-side routing, lazy-loaded pages and cart validation.",
    points: ["Code-split routes with React Router and Vite.", "Typed cart logic in TypeScript."],
    stack: ["React", "TypeScript", "Vite"],
    live: "https://vastrabyinayat-topaz.vercel.app/",
    repos: [{ label: "Code", href: "https://github.com/Jatinyadav29/vastrabyinayat" }],
  },
];

export const getProject = (slug?: string) => PROJECTS.find((p) => p.slug === slug);

export const EXPERIENCE = [
  {
    role: "Web Development Intern",
    org: "Umang Travels",
    period: "2026 — Present",
    detail: "Building and maintaining web features for a travel business.",
  },
  {
    role: "BCA",
    org: "Guru Gobind Singh Indraprastha University",
    period: "2023 — 2026",
    detail: "Bachelor of Computer Applications, Delhi. Preparing for NIMCET → MCA.",
  },
];

export const LEARNING = ["RAG", "LangGraph", "MCP servers", "Docker", "AWS", "System Design", "DSA"];
