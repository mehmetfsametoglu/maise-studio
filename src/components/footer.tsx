"use client";

import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { useLang, type DictKey } from "@/lib/i18n";
import { whatsappHref } from "@/lib/contact";
import { SITE } from "@/lib/site";

const EXPERTISE: { slug: string; key: DictKey }[] = [
  { slug: "creation-site-internet", key: "svcnav.creation" },
  { slug: "site-web-restaurant-cafe", key: "svcnav.restaurant" },
  { slug: "site-web-hotel", key: "svcnav.hotel" },
  { slug: "site-web-commerce", key: "svcnav.commerce" },
  { slug: "seo-visibilite-ia", key: "svcnav.seo" },
];

const linkClass = "inline-flex min-h-11 items-center text-sm text-foreground/80 transition-colors hover:text-accent";

export function Footer() {
  const { t } = useLang();

  const NAVIGATION = [
    { href: "/realisations", label: t("nav.work") },
    { href: "/services", label: t("nav.services") },
    { href: "/studio", label: t("nav.studio") },
    { href: "/#configurateur", label: t("nav.configurator") },
    { href: "/examples", label: t("nav.examples") },
    { href: "/faq", label: t("footer.faq") },
  ];

  return (
    <footer className="bg-background px-3 pt-6 pb-[calc(0.75rem+var(--bar-h,0px)+env(safe-area-inset-bottom))] md:px-6 md:pb-6">
      <div className="world-ink relative mx-auto max-w-[1380px] overflow-hidden rounded-[28px] bg-background px-6 py-16 text-foreground md:px-10 md:py-20">
        <span aria-hidden className="absolute inset-x-6 top-0 h-px bg-brass/70 md:inset-x-10" />
        <div className="mx-auto max-w-[1300px]">
        <div className="border-b border-border pb-14 text-center md:pb-16">
          <h2 className="display mx-auto max-w-2xl text-[clamp(1.8rem,4.6vw,3.2rem)] text-foreground">
            {t("footer.ctaTitle")}
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03]"
            >
              {t("footer.ctaButton")}
            </Link>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              WhatsApp
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-muted-foreground">
            <span>{t("ig.lead")}</span>
            {SITE.instagram.map((i) => (
              <a
                key={i.handle}
                href={i.url}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex min-h-11 items-center rounded-full border border-border px-4 py-2 text-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                @{i.handle}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-border py-12 md:grid-cols-[1.3fr_1fr_1.2fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <LogoMark size="text-xl" />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t("footer.tag")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("contact.location.value")}</p>
          </div>

          <nav aria-label={t("footer.col.nav")}>
            <p className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">{t("footer.col.nav")}</p>
            <ul className="flex flex-col">
              {NAVIGATION.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.col.expertise")}>
            <p className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
              {t("footer.col.expertise")}
            </p>
            <ul className="flex flex-col">
              {EXPERTISE.map((e) => (
                <li key={e.slug}>
                  <Link href={`/services/${e.slug}`} className={linkClass}>
                    {t(e.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <p className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">{t("footer.col.contact")}</p>
            <ul className="flex flex-col">
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer nofollow" className={linkClass}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  {SITE.email}
                </a>
              </li>
              {SITE.instagram.map((i) => (
                <li key={i.handle}>
                  <a href={i.url} target="_blank" rel="noopener noreferrer me" className={linkClass}>
                    {i.label}
                  </a>
                </li>
              ))}
              <li className="py-2 text-xs text-muted-foreground">{t("contact.hours.value")}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}, {t("contact.location.value")}. {t("footer.rights")}
          </p>
          <ul className="flex gap-6 text-xs text-muted-foreground">
            <li>
              <Link href="/mentions-legales" className="inline-flex min-h-11 items-center transition-colors hover:text-accent">
                {t("footer.legal")}
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="inline-flex min-h-11 items-center transition-colors hover:text-accent">
                {t("footer.privacy")}
              </Link>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </footer>
  );
}
