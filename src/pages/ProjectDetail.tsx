import { Link, Navigate, useParams } from "react-router";
import { getProject } from "../data";
import { Reveal } from "../shared";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to="/#projects" replace />;

  return (
    <main className="px-5 pt-16 text-center md:px-0 md:pt-24 md:text-left">
      <Reveal>
        <Link to="/#projects" className="font-mono text-[11px] text-muted hover:text-fg">
          ← Back to projects
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">{project.name}</h1>
        <p className="mx-auto mt-2 max-w-lg text-[15px] text-muted md:mx-0">{project.summary}</p>
      </Reveal>
    </main>
  );
}
