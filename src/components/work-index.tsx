"use client";

import { useReveal } from "@/hooks/use-reveal";
import { useLang } from "@/lib/i18n";
import { REAL_PROJECTS } from "@/lib/projects";
import { ProjectLinkCard } from "@/components/page-kit";

// Same card as on the home page: photo, label, sector and city, name, one
// sentence; the title opens the case page, the arrow opens the client's site.
export function WorkIndex() {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div className="world-sage bg-background">
      <section className="px-6 pt-36 pb-16 md:px-10 md:pt-44">
        <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-[1300px] [&>*]:max-w-4xl`}>
          <p className="mb-5 text-xs tracking-[0.42em] text-accent uppercase">
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
        <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-6 md:grid-cols-2">
          {REAL_PROJECTS.map((p, i) => (
            <ProjectLinkCard key={p.slug} project={p} priority={i < 2} />
          ))}
        </div>
      </section>
    </div>
  );
}
