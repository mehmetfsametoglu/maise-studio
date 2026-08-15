"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { RealProject } from "@/lib/real-projects";

export function ProjectFrame({ project }: { project: RealProject }) {
  return (
    <div className="fixed inset-0 z-0 bg-white">
      <iframe
        src={project.url}
        title={project.name}
        className="h-full w-full border-0"
      />
      <Link
        href="/examples"
        className="glass-liquid world-noir fixed top-4 left-4 z-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] text-foreground shadow-lg"
      >
        <ArrowLeft size={14} />
        Retour aux exemples
      </Link>
    </div>
  );
}
