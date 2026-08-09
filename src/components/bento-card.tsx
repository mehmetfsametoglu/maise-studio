"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function BentoCard({
  icon: Icon,
  title,
  body,
  index,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="hover"
      className="group relative overflow-hidden rounded-3xl border border-cream/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-[#C8934E]/40"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#C8934E]/0 blur-3xl transition-all duration-700 group-hover:bg-[#C8934E]/15" />
      <Icon className="mb-6 text-[#C8934E]" size={28} strokeWidth={1.4} />
      <h3 className="mb-3 font-serif text-2xl text-cream italic">{title}</h3>
      <p className="text-sm leading-relaxed text-cream/50">{body}</p>
    </motion.div>
  );
}
