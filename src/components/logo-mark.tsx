export function LogoMark({
  size = "text-2xl",
  tone = "currentColor",
}: {
  size?: string;
  tone?: string;
}) {
  return (
    <span
      className={`relative inline-flex items-baseline not-italic ${size}`}
      style={{ color: tone, fontFamily: "var(--font-playfair)", fontWeight: 500, letterSpacing: "-0.02em" }}
    >
      <span className="relative">
        Maisé
        <span
          aria-hidden
          className="absolute top-0 -right-1 h-[1.05em] w-px origin-bottom -translate-y-[0.1em] rotate-[18deg] bg-[#C9A24E]"
        />
      </span>
      <span className="ml-1.5 self-center text-[0.32em] font-sans font-light tracking-[0.4em] uppercase opacity-60 not-italic">
        Studio
      </span>
    </span>
  );
}
