"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useLang } from "@/lib/i18n";

// Mehmet Sametoglu — Maisé Studio
export const WHATSAPP_NUMBER = "33753406344";

export function WHATSAPP_LINK(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function WhatsAppButton() {
  const { t } = useLang();

  return (
    <motion.a
      href={WHATSAPP_LINK()}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      title={t("nav.cta")}
      className="fixed bottom-6 left-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#0b1a10] shadow-[0_8px_30px_rgba(37,211,102,0.35)]"
    >
      <WhatsAppIcon size={26} />
    </motion.a>
  );
}
