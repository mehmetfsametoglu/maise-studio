export function LogoMark({ size = "text-2xl" }: { size?: string }) {
  return (
    <span className={`relative inline-flex items-baseline font-serif italic text-cream ${size}`}>
      <span className="relative">
        Maisé
        <span
          aria-hidden
          className="absolute top-0 -right-1.5 h-[1.15em] w-px origin-bottom -translate-y-[0.15em] rotate-[22deg] bg-[#c8934e]"
        />
      </span>
      <span className="ml-1.5 self-center text-[0.32em] font-sans tracking-[0.35em] text-cream/50 uppercase not-italic">
        Studio
      </span>
    </span>
  );
}
