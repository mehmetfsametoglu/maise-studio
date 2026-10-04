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

const linkClass = "text-sm text-foreground/80 transition-colors hover:text-accent";

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
    <footer className="world-navy relative bg-background px-6 py-16 text-foreground md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
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
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-border py-12 md:grid-cols-[1.3fr_1fr_1.2fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <LogoMark size="text-xl" />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t("footer.tag")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("contact.location.value")}</p>
          </div>

          <nav aria-label={t("footer.col.nav")}>
            <p className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">{t("footer.col.nav")}</p>
            <ul className="flex flex-col gap-3">
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
            <ul className="flex flex-col gap-3">
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
            <ul className="flex flex-col gap-3">
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
              <li className="text-xs text-muted-foreground">{t("contact.hours.value")}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}, {t("contact.location.value")}. {t("footer.rights")}
          </p>
          <ul className="flex gap-6 text-xs text-muted-foreground">
            <li>
              <Link href="/mentions-legales" className="transition-colors hover:text-accent">
                {t("footer.legal")}
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="transition-colors hover:text-accent">
                {t("footer.privacy")}
              </Link>
            </li>
          </ul>
          {/* Instagram / LinkedIn go here once the real profile URLs are confirmed. */}
        </div>
      </div>
    </footer>
  );
}
