import { notFound } from "next/navigation";
import { REAL_PROJECTS } from "@/lib/real-projects";
import { ProjectFrame } from "@/components/project-frame";

export function generateStaticParams() {
  return REAL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function OrnekPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = REAL_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectFrame project={project} />;
}
