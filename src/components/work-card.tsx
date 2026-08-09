"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function WorkCard({
  tag,
  title,
  body,
  cta,
  href,
  note,
  image,
  gradient,
  index,
}: {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href?: string;
  note?: string;
  image?: string;
  gradient: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group grid grid-cols-1 gap-8 overflow-hidden rounded-[2rem] border border-cream/10 bg-white/[0.02] md:grid-cols-2"
    >
      <div className="relative h-64 overflow-hidden md:h-full">
        {image ? (
          <motion.img
            src={image}
            alt={title}
            style={{ y: imgY }}
            className="absolute inset-0 h-[120%] w-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 ${gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r" />
      </div>

      <div className="flex flex-col justify-center p-8 md:p-12">
        <p className="mb-3 text-[11px] tracking-[0.25em] text-[#c8934e] uppercase">
          {tag}
        </p>
        <h3 className="mb-4 font-serif text-3xl text-cream italic md:text-4xl">
          {title}
        </h3>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-cream/50">
          {body}
        </p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex w-fit items-center gap-2 text-xs tracking-widest text-cream/70 uppercase transition-colors hover:text-[#c8934e]"
          >
            {cta} <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="inline-flex w-fit items-center gap-2 text-xs tracking-widest text-cream/70 uppercase">
            {cta} <ArrowUpRight size={14} />
          </span>
        )}
        {note && <p className="mt-3 text-[11px] text-cream/30 italic">{note}</p>}
      </div>
    </motion.div>
  );
}
