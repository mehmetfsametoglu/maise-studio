"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/logo-mark";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const pathname = usePathname();

  const LINKS = [
    { href: "/examples", label: t("nav.examples") },
    { href: "/work", label: t("nav.work") },
    { href: "/studio", label: t("nav.studio") },
    { href: "/contact", label: t("nav.contact") },
  ];

  if (pathname?.startsWith("/ornek/")) return null;

  return (
    <footer className="world-navy relative bg-background px-6 py-16 md:px-10 md:py-20">
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
              href="https://wa.me/33753406344"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-10 border-b border-border py-10 md:flex-row md:items-center">
          <div>
            <LogoMark size="text-xl" />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t("footer.tag")}</p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/80 transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://wa.me/33753406344"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 transition-colors hover:text-accent"
            >
              WhatsApp — {t("contact.hours.value")}
            </a>
            <a
              href="mailto:studiomaise@gmail.com"
              className="text-foreground/80 transition-colors hover:text-accent"
            >
              studiomaise@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Maisé Studio — {t("contact.location.value")}. {t("footer.rights")}
          </p>
          {/* Instagram / LinkedIn will go here once the real URLs are confirmed. */}
        </div>
      </div>
    </footer>
  );
}
