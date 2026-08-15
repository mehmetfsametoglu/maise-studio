"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";

export function WorkTeaser() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative border-t border-border bg-background px-6 py-24 md:px-10 md:py-32">
      <div
        ref={ref}
        className={`reveal ${visible ? "reveal-in" : ""} mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center`}
      >
        <div>
          <p className="mb-4 text-[11px] tracking-[0.42em] text-accent uppercase">
            {t("worktease.kicker")}
          </p>
          <h2 className="display max-w-md text-[clamp(1.6rem,3.6vw,2.4rem)] text-foreground">
            {t("worktease.title")}
          </h2>
        </div>
        <Link
          href="/work"
          className="shrink-0 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted"
        >
          {t("worktease.cta")}
        </Link>
      </div>
    </section>
  );
}
