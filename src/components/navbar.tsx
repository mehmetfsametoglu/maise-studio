"use client";

import { LogoMark } from "@/components/logo-mark";
import { MagneticButton } from "@/components/magnetic-button";
import { useLang, type Lang } from "@/lib/i18n";

export function Navbar() {
  const { lang, setLang, t } = useLang();

  const links: { href: string; labelKey: "nav.configurator" | "nav.work" | "nav.contact" }[] = [
    { href: "#configurator", labelKey: "nav.configurator" },
    { href: "#work", labelKey: "nav.work" },
    { href: "#contact", labelKey: "nav.contact" },
  ];

  const langs: Lang[] = ["fr", "en", "tr"];

  return (
    <header className="fixed top-0 z-40 w-full">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-cream/10 bg-black/25 px-5 py-3 backdrop-blur-xl md:mt-6 md:px-8">
        <a href="#top" data-cursor="hover">
          <LogoMark />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className="text-xs tracking-[0.15em] text-cream/70 uppercase transition-colors hover:text-cream"
            >
              {t(l.labelKey)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div
            data-cursor="hover"
            className="flex items-center overflow-hidden rounded-full border border-cream/15 text-[10px] tracking-widest"
          >
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={
                  "px-2.5 py-1 uppercase transition-colors " +
                  (lang === l
                    ? "bg-[#c8934e] text-[#170f0a]"
                    : "text-cream/60 hover:text-cream")
                }
              >
                {l}
              </button>
            ))}
          </div>

          <MagneticButton
            href="#contact"
            className="hidden rounded-full border border-[#c8934e]/50 px-5 py-2 text-xs tracking-widest text-[#c8934e] uppercase hover:bg-[#c8934e] hover:text-[#170f0a] md:inline-flex"
          >
            {t("nav.cta")}
          </MagneticButton>
        </div>
      </nav>
    </header>
  );
}
