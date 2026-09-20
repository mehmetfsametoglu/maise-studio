"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { useLang, type Lang } from "@/lib/i18n";
import { useTheme, type ThemeChoice } from "@/lib/theme";

const LANGS: Lang[] = ["fr", "en", "tr"];
const THEMES: { key: ThemeChoice; icon: typeof Sun }[] = [
  { key: "light", icon: Sun },
  { key: "dark", icon: Moon },
  { key: "system", icon: Monitor },
];

// Nav is a fixed overlay that sits on top of every color "world" (cream,
// navy, burgundy, emerald, noir) as the page scrolls beneath it — it is
// never a descendant of any of those .world-* sections, so it can't rely
// on the --foreground/--accent tokens (those always resolve to the base
// :root value for whichever theme is active). It uses its own fixed pair
// of palettes instead — one per theme — so it stays legible over any
// section, in both light and dark mode.
const NAV_PALETTE = {
  light: { text: "#241C10", textMuted: "rgba(36,28,16,0.62)", accent: "#8A5A2B", accentFg: "#FFFDF8", glassBg: "rgba(255,251,244,0.6)", border: "rgba(36,28,16,0.1)" },
  dark: { text: "#F4EEE1", textMuted: "rgba(244,238,225,0.68)", accent: "#D9B36C", accentFg: "#1a1408", glassBg: "rgba(20,16,10,0.55)", border: "rgba(255,255,255,0.1)" },
};

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjectFrame = pathname?.startsWith("/ornek/") ?? false;
  const [scrolledRaw, setScrolledRaw] = useState(false);
  // Only the homepage has a guaranteed-dark hero photo behind the nav at
  // scroll-top, so only there can the nav go fully transparent. Every
  // other page starts on a theme-following background (light or dark
  // depending on the user's chosen theme), so the nav stays in its glass
  // state there from the very top — otherwise light-mode pages would get
  // dark-on-light-unreadable (or the reverse) at scroll position 0.
  const scrolled = isHome ? scrolledRaw : true;
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { choice, resolved, setChoice } = useTheme();
  // On the homepage, unscrolled-over-the-hero always needs light text
  // (the hero photo is always dark, in both themes). Once scrolled — or
  // on any other page — the nav follows the active theme.
  const c = isHome && !scrolledRaw ? NAV_PALETTE.dark : NAV_PALETTE[resolved];

  const LINKS = [
    { href: "/work", label: t("nav.work") },
    { href: "/examples", label: t("nav.examples") },
    { href: "/studio", label: t("nav.studio") },
    { href: "/#configurateur", label: t("nav.configurator") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolledRaw(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu is a fixed overlay, not part of normal document flow —
  // without this, the page behind it keeps scrolling while it's open (the
  // panel stays visually pinned near the top since its parent <header> is
  // fixed, while the hero/sections underneath shift around it). Locking
  // scroll here, and closing on route change, keeps it feeling like a real
  // modal instead of a floating card with a scrollable page leaking through.
  useEffect(() => {
    if (!open) return;
    // document.scrollingElement is <html> here (not <body>), so overflow
    // has to be locked on the root element or it has no effect at all.
    const root = document.documentElement;
    const prevRoot = root.style.overflow;
    const prevBody = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      root.style.overflow = prevRoot;
      document.body.style.overflow = prevBody;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const cycleTheme = () => {
    const idx = THEMES.findIndex((x) => x.key === choice);
    setChoice(THEMES[(idx + 1) % THEMES.length].key);
  };
  const ThemeIcon = THEMES.find((x) => x.key === choice)?.icon ?? Sun;

  const LangSwitch = () => (
    <div className="flex items-center gap-0.5 rounded-full p-0.5 text-[10px] font-medium tracking-wide uppercase" style={{ background: "rgba(128,128,128,0.16)" }}>
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="rounded-full px-2 py-1 transition-colors duration-200"
          style={lang === l ? { background: c.accent, color: c.accentFg } : { color: c.textMuted }}
        >
          {l}
        </button>
      ))}
    </div>
  );

  if (isProjectFrame) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-6 ${
          scrolled ? "border shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)] backdrop-blur-2xl" : "border border-transparent bg-transparent"
        }`}
        style={scrolled ? { background: c.glassBg, borderColor: c.border } : undefined}
      >
        <Link href="/" className="shrink-0">
          <LogoMark size="text-lg" tone={c.text} />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[13px] tracking-wide transition-opacity duration-300 hover:opacity-100"
                style={{ color: c.textMuted }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <LangSwitch />
            <button
              onClick={cycleTheme}
              aria-label="Toggle theme"
              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors"
              style={{ background: "rgba(128,128,128,0.16)", color: c.textMuted }}
            >
              <ThemeIcon size={13} />
            </button>
          </div>
          <Link
            href="/contact"
            className="hidden rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide uppercase transition-all duration-300 hover:brightness-110 lg:inline-flex"
            style={{ background: c.accent, color: c.accentFg }}
          >
            {t("nav.cta")}
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors md:hidden"
            style={{ color: c.text }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border p-6 backdrop-blur-2xl md:hidden"
            style={{ background: c.glassBg, borderColor: c.border }}
          >
            <ul className="flex flex-col gap-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="text-base" style={{ color: c.text }}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" onClick={() => setOpen(false)} className="text-base" style={{ color: c.text }}>
                  {t("nav.contact")}
                </Link>
              </li>
              <li className="flex items-center justify-between pt-3">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-full px-5 py-2.5 text-[12px] font-medium tracking-wide uppercase"
                  style={{ background: c.accent, color: c.accentFg }}
                >
                  {t("nav.cta")}
                </Link>
                <div className="flex items-center gap-2">
                  <LangSwitch />
                  <button
                    onClick={cycleTheme}
                    aria-label="Toggle theme"
                    className="flex h-7 w-7 items-center justify-center rounded-full"
                    style={{ background: "rgba(128,128,128,0.16)", color: c.textMuted }}
                  >
                    <ThemeIcon size={13} />
                  </button>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
