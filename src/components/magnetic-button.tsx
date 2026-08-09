"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  type = "button",
  style,
  target,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  style?: React.CSSProperties;
  target?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.35, y: relY * 0.35 });
  }

  function onMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const fullClassName =
    "inline-flex items-center justify-center transition-colors " + className;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className="inline-block"
      data-cursor="hover"
    >
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          className={fullClassName}
          style={style}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      ) : (
        <button type={type} onClick={onClick} className={fullClassName} style={style}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
