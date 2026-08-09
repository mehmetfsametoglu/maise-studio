"use client";

import { motion } from "framer-motion";

export function TextReveal({
  lines,
  className = "",
  delay = 0,
  once = true,
  amount = 0.6,
  immediate = false,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  /** Skip the viewport check and animate on mount — use for above-the-fold text
   * where waiting on IntersectionObserver can race with web-font layout shift. */
  immediate?: boolean;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => {
        const motionProps = immediate
          ? { animate: { y: "0%" } }
          : { whileInView: { y: "0%" }, viewport: { once, amount } };
        return (
          <span key={line + i} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              {...motionProps}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
