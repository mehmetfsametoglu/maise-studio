"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";
import { REAL_PROJECTS } from "@/lib/real-projects";

export function WorkIndex() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div className="world-emerald bg-background">
      <section className="px-6 pt-36 pb-16 md:px-10 md:pt-44">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-4xl`}>
          <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("work.kicker")}
          </p>
          <h1 className="display text-[clamp(2.2rem,5.6vw,4rem)] text-foreground">
            {t("work.title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("work.body")}
          </p>
        </div>
      </section>

      <section className="px-6 pb-28 md:px-10 md:pb-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {REAL_PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} n={String(i + 1).padStart(2, "0")} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({
  n,
  project,
}: {
  n: string;
  project: (typeof REAL_PROJECTS)[number];
}) {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/ornek/${project.slug}`}
      className={`reveal ${visible ? "reveal-in" : ""} glass-liquid group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[1.75rem] p-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015]`}
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

      <div className="relative z-10 flex items-start justify-between">
        <span className="font-display text-sm text-white/70">{n}</span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="relative z-10">
        <p className="text-[11px] tracking-[0.3em] text-white/60 uppercase">
          {t(project.sectorKey)}
        </p>
        <h3 className="display mt-1 text-2xl text-white md:text-3xl">{project.name}</h3>
      </div>
    </Link>
  );
}
