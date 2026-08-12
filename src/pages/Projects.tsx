import { ExternalLink, Reveal, SectionLabel } from "../shared";

const PROJECTS = [
  {
    name: "Nexus",
    tag: "FULL STACK",
    description:
      "A MERN full-stack application with a responsive UI and reusable React components. Includes optimized MongoDB queries reducing API response times by up to 40%, secure JWT/bcrypt authentication with role-based access control, and a CI/CD pipeline for automated deployment.",
    live: "https://nexus-frontend-lyart.vercel.app/",
    repo: "https://github.com/Jatinyadav29/nexus-frontend.git",
  },
  {
    name: "TradeZ",
    tag: "FRONTEND / DASHBOARD",
    description:
      "A dark-themed trading analytics dashboard for scalpers and prop firm traders, featuring interactive equity curves, P&L heatmaps, and a global command palette. Built with Redux for complex state management and GSAP for advanced animation.",
    live: "https://trade-z-frontend.vercel.app/",
    repo: "https://github.com/Jatinyadav29/TradeZ-frontend.git",
  },
  {
    name: "Sky Mart",
    tag: "FRONTEND / E-COMMERCE",
    description:
      "A dark-mode glassmorphic e-commerce app built with React and Tailwind CSS. Features client-side authentication, a dynamic product catalog with search, filters, and sorting, and a persistent LocalStorage-based cart with smooth scroll interactions.",
    live: "https://sky-mart-woad.vercel.app/",
    repo: "https://github.com/Jatinyadav29/Sky-Mart.git",
  },
  {
    name: "Vastra by Inayat",
    tag: "FRONTEND / STOREFRONT",
    description:
      "A React, TypeScript, and Vite-powered clothing storefront demo with client-side routing, lazy-loaded pages, and cart validation logic.",
    live: "https://vastrabyinayat-topaz.vercel.app/",
    repo: "https://github.com/Jatinyadav29/vastrabyinayat.git",
  },
];

export default function Projects() {
  return (
    <main className="mx-auto max-w-350 px-6 pt-40 pb-28 md:px-12 md:pt-52 md:pb-40">
      <header>
        <Reveal>
          <SectionLabel>Projects</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h1
            className="mt-8 font-display font-light leading-[0.95] tracking-[-0.02em] text-paper"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontOpticalSizing: "auto",
            }}
          >
            Selected Work
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-muted md:text-lg">
            A collection of things I&apos;ve built — from full-stack platforms
            to frontend experiments.
          </p>
        </Reveal>
      </header>

      <div className="mt-28 md:mt-40">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.name} delay={i * 90}>
            <article className="border-t border-white/10 py-16 md:py-24">
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                    {project.tag}
                  </span>
                  <h2 className="mt-5 font-display text-5xl font-light tracking-tight text-paper md:text-6xl">
                    {project.name}
                  </h2>
                </div>
                <div className="flex flex-col items-start md:pt-1">
                  <p className="max-w-xl font-body text-base leading-relaxed text-paper/80">
                    {project.description}
                  </p>
                  <div className="mt-8 flex items-center gap-8">
                    <ExternalLink href={project.live}>Live</ExternalLink>
                    <ExternalLink href={project.repo}>Code</ExternalLink>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
