"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Plus } from "lucide-react";
import { useLang, type DictKey } from "@/lib/i18n";
import { UI, type L } from "@/lib/l10n";
import type { Faq } from "@/lib/faq";
import type { Project } from "@/lib/projects";
import type { Concept } from "@/lib/concepts";
import type { Item } from "@/lib/services";
import { PACKAGES, EXTRA_LANGUAGE, formatEur, type TierKey } from "@/lib/pricing";

// Building blocks for the content pages (services, case studies, FAQ). They
// render on the server in French like any other component, so crawlers read
// plain HTML; once the page is open they follow the visitor's language.

type Text = string | L;

export function useText() {
  const { lang } = useLang();
  return (x: Text) => (typeof x === "string" ? x : x[lang]);
}

// Inline translated text, usable from server components.
export function T({ l }: { l: Text }) {
  const r = useText();
  return <>{r(l)}</>;
}

export function Crumbs({ items }: { items: { name: Text; href?: string }[] }) {
  const r = useText();
  return (
    <nav aria-label={r(UI.breadcrumb)} className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} aria-hidden />}
            {c.href ? (
              <Link href={c.href} className="transition-colors hover:text-accent">
                {r(c.name)}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground/80">
                {r(c.name)}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  kicker,
  title,
  lead,
  children,
}: {
  crumbs?: { name: Text; href?: string }[];
  kicker?: Text;
  title: Text;
  lead?: Text;
  children?: React.ReactNode;
}) {
  const r = useText();
  return (
    <section className="px-6 pt-36 pb-14 md:px-10 md:pt-44 md:pb-20">
      <div className="mx-auto max-w-4xl">
        {crumbs && <Crumbs items={crumbs} />}
        {kicker && <p className="mb-5 text-[11px] tracking-[0.42em] text-accent uppercase">{r(kicker)}</p>}
        <h1 className="display text-balance text-[clamp(2.2rem,5.6vw,4rem)] text-foreground">{r(title)}</h1>
        {lead && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">{r(lead)}</p>}
        {children}
      </div>
    </section>
  );
}

// The short, quotable definition near the top of a page.
export function Summary({ children }: { children: Text }) {
  const r = useText();
  return (
    <section className="px-6 pb-14 md:px-10 md:pb-20">
      <p className="mx-auto max-w-4xl border-l-2 border-accent pl-6 text-lg leading-relaxed text-foreground/90 md:text-xl">
        {r(children)}
      </p>
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold whitespace-nowrap transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]";
  const style =
    variant === "primary"
      ? "bg-accent text-accent-foreground"
      : "border border-border text-foreground hover:bg-muted";
  return (
    <Link href={href} className={`${base} ${style}`}>
      {children}
    </Link>
  );
}

export function ItemGrid({ items }: { items: Item[] }) {
  const r = useText();
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it.title.fr} className="border-t border-border pt-5">
          <h3 className="text-base font-semibold text-foreground">{r(it.title)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r(it.text)}</p>
        </li>
      ))}
    </ul>
  );
}

export function ContentSection({
  id,
  title,
  intro,
  children,
  world,
}: {
  id?: string;
  title: Text;
  intro?: Text;
  children: React.ReactNode;
  world?: string;
}) {
  const r = useText();
  return (
    <section id={id} className={`${world ?? ""} bg-background px-6 py-16 md:px-10 md:py-24`}>
      <div className="mx-auto max-w-4xl">
        <h2 className="display text-[clamp(1.7rem,3.8vw,2.6rem)] text-foreground">{r(title)}</h2>
        {intro && <p className="mt-5 max-w-2xl text-muted-foreground">{r(intro)}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Callout({ title, text }: { title: Text; text: Text }) {
  const r = useText();
  return (
    <section className="px-6 pb-6 md:px-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-accent/40 bg-accent/5 p-7 md:p-9">
        <h2 className="text-base font-semibold text-foreground">{r(title)}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">{r(text)}</p>
      </div>
    </section>
  );
}

// Native <details>: keyboard accessible, and the answers stay in the HTML
// whether the item is open or closed.
export function FaqList({ items }: { items: Faq[] }) {
  const r = useText();
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f) => (
        <details key={f.id} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
            {r(f.q)}
            <Plus
              size={18}
              aria-hidden
              className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground">{r(f.a)}</p>
        </details>
      ))}
    </div>
  );
}

export function PriceBlock() {
  const { t } = useLang();
  const r = useText();
  const tiers = (Object.keys(PACKAGES) as TierKey[]).map((k) => ({ key: k, ...PACKAGES[k] }));
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {tiers.map((p) => (
          <div key={p.key} className="rounded-2xl border border-border bg-card p-7">
            <h3 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              {t(`tier.${p.key}.name` as DictKey)}
            </h3>
            <p className="display mt-3 text-4xl text-accent">
              <span className="text-base font-normal text-muted-foreground">{r(UI.from)} </span>
              {formatEur(p.eur)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`tier.${p.key}.tag` as DictKey)}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        {r(UI.priceLang)} {formatEur(EXTRA_LANGUAGE.eur)}. {r(UI.priceDisclaimer)}{" "}
        <Link href="/#configurateur" className="text-accent underline-offset-4 hover:underline">
          {r(UI.calc)}
        </Link>
      </p>
    </div>
  );
}

export function ProjectLinkCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const r = useText();
  return (
    <Link
      href={`/realisations/${project.slug}`}
      className="group block overflow-hidden rounded-[1.5rem] border border-border bg-card transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.shots.desktop.src}
          alt={r(project.shots.desktop.alt)}
          fill
          priority={priority}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <p className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            {r(project.sector)} · {project.city}
          </p>
          <h3 className="display mt-2 text-2xl text-foreground">{project.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r(project.summary)}</p>
        </div>
        <ArrowUpRight
          size={18}
          aria-hidden
          className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
        />
      </div>
    </Link>
  );
}

// Desktop and phone captures of a live client site, side by side.
export function CaseShots({ project }: { project: { shots: Project["shots"] } }) {
  const r = useText();
  return (
    <section className="px-6 pb-16 md:px-10 md:pb-24">
      <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)_minmax(0,5rem)] items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,9rem)] sm:gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,11rem)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
          <Image
            src={project.shots.desktop.src}
            alt={r(project.shots.desktop.alt)}
            fill
            priority
            sizes="(min-width: 896px) 700px, 80vw"
            className="object-cover object-top"
          />
        </div>
        <div className="relative aspect-[390/844] overflow-hidden rounded-2xl border border-border">
          <Image
            src={project.shots.mobile.src}
            alt={r(project.shots.mobile.alt)}
            fill
            sizes="(min-width: 768px) 176px, 80px"
            className="object-cover object-top"
          />
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-4xl text-xs text-muted-foreground">{r(UI.shotsNote)}</p>
    </section>
  );
}

export function ClosingCta({ title, text }: { title?: Text; text?: Text }) {
  const r = useText();
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="display text-[clamp(1.7rem,3.8vw,2.6rem)] text-foreground">{r(title ?? UI.closingTitle)}</h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">{r(text ?? UI.closingText)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">
            {r(UI.talk)} <ArrowRight size={16} aria-hidden />
          </ButtonLink>
          <ButtonLink href="/realisations" variant="ghost">
            {r(UI.seeWork)}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

// Card for an example (concept) site. Always carries the "not a client project" label.
export function ConceptCard({ concept }: { concept: Concept }) {
  const r = useText();
  return (
    <Link
      href={`/examples/${concept.slug}`}
      className="group block overflow-hidden rounded-[1.5rem] border border-border bg-card transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={concept.shots.desktop.src}
          alt={r(concept.shots.desktop.alt)}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-medium tracking-widest text-white uppercase backdrop-blur-md">
          {r(UI.conceptLabel)}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <p className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            {r(concept.sector)} · {concept.city}
          </p>
          <h3 className="display mt-2 text-2xl text-foreground">{concept.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r(concept.summary)}</p>
        </div>
        <ArrowUpRight
          size={18}
          aria-hidden
          className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
        />
      </div>
    </Link>
  );
}

// Interactive preview of a client or example site inside ours. Nothing is
// requested from that site until the visitor clicks.
export function LivePreview({
  concept,
  real = false,
}: {
  concept: { slug: string; name: string; shots: Project["shots"] };
  real?: boolean;
}) {
  const r = useText();
  const [loaded, setLoaded] = useState(false);
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label={r(UI.previewTitle)} className="flex gap-2">
          {(["desktop", "phone"] as const).map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={device === d}
              onClick={() => setDevice(d)}
              className={`min-h-11 rounded-full border px-4 py-2 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
                device === d ? "border-accent/50 bg-accent/15 text-accent" : "border-border text-foreground/80 hover:border-accent/40"
              }`}
            >
              {r(d === "desktop" ? UI.deviceDesktop : UI.devicePhone)}
            </button>
          ))}
        </div>
        <a
          href={`/go/${concept.slug}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1.5 text-sm text-accent underline-offset-4 hover:underline"
        >
          {r(UI.previewOpen)} <ArrowUpRight size={14} aria-hidden />
        </a>
      </div>

      <div
        className={`relative mx-auto h-[min(72svh,720px)] min-h-[440px] overflow-hidden rounded-2xl border border-border bg-muted transition-[max-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          device === "phone" ? "max-w-[390px]" : "max-w-full"
        }`}
      >
        {loaded ? (
          <iframe
            src={`/go/${concept.slug}`}
            title={concept.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            <Image
              src={device === "phone" ? concept.shots.mobile.src : concept.shots.desktop.src}
              alt={r(device === "phone" ? concept.shots.mobile.alt : concept.shots.desktop.alt)}
              fill
              sizes="(min-width: 896px) 880px, 90vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                {r(UI.previewLoad)}
              </button>
            </div>
          </>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{r(real ? UI.previewNoteReal : UI.previewNote)}</p>
    </div>
  );
}
