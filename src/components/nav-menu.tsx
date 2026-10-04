"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// The phone menu overlay. It lives in its own file so the animation library is
// only downloaded the first time someone opens the menu, not on every page.
export default function NavMenu({
  open,
  onClose,
  links,
  palette,
  contactLabel,
  ctaLabel,
  children,
}: {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  palette: { accent: string; accentFg: string; text: string; menuBg: string; border: string };
  contactLabel: string;
  ctaLabel: string;
  children: React.ReactNode;
}) {
  const c = palette;
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
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
            className="mx-auto mt-2 max-w-6xl rounded-3xl border p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:hidden"
            style={{ background: c.menuBg, borderColor: c.border }}
          >
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={onClose} className="text-base" style={{ color: c.text }}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" onClick={onClose} className="text-base" style={{ color: c.text }}>
                  {contactLabel}
                </Link>
              </li>
              <li className="flex flex-col gap-4 pt-3">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full px-5 py-3 text-center text-[12px] font-medium tracking-wide whitespace-nowrap uppercase"
                  style={{ background: c.accent, color: c.accentFg }}
                >
                  {ctaLabel}
                </Link>
                {children}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
