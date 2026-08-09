"use client";

export function Marquee({ text }: { text: string }) {
  return (
    <div className="w-full overflow-hidden border-y border-cream/10 py-6">
      <div className="animate-marquee flex w-max items-center gap-16">
        <span className="shrink-0 text-sm tracking-[0.3em] text-cream/40 uppercase">
          {text}
        </span>
        <span className="shrink-0 text-sm tracking-[0.3em] text-cream/40 uppercase">
          {text}
        </span>
      </div>
    </div>
  );
}
