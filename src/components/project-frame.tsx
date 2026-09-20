"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { useLang } from "@/lib/i18n";
import type { RealProject } from "@/lib/real-projects";

export function ProjectFrame({ project }: { project: RealProject }) {
  const { t } = useLang();

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-white">
      <div className="world-noir relative z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] md:px-5">
        <Link
          href="/work"
          className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[12px] text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">{t("projectframe.back")}</span>
        </Link>

        <div className="flex min-w-0 items-center gap-2 text-[12px] text-muted-foreground">
          <LogoMark size="text-sm" tone="var(--foreground)" />
          <span className="hidden truncate md:inline">{t("projectframe.live")}</span>
        </div>

        <Link
          href="/contact"
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-medium tracking-wide text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.03]"
        >
          <span className="hidden sm:inline">{t("projectframe.cta")}</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <iframe src={project.url} title={project.name} className="h-full w-full flex-1 border-0" />
    </div>
  );
}
