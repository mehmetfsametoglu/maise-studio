// Drop-in footer credit for client sites built with React / Next.js / Vite
// (Lovable projects included). Render <SiteCredit /> as the last child of the
// site's footer. For sites that are not React, use the one-line script in
// README.md instead.

const COPY = {
  fr: "Site conçu par",
  en: "Website by",
  tr: "Web sitesi tasarımı:",
} as const;

export function SiteCredit({
  lang = "fr",
  href = "https://www.maisestudio.com",
  className = "",
}: {
  lang?: keyof typeof COPY;
  href?: string;
  className?: string;
}) {
  return (
    <p className={`py-4 text-center text-xs tracking-wide opacity-60 ${className}`}>
      {COPY[lang]}{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="underline underline-offset-4 transition-opacity hover:opacity-100"
      >
        Maisé Studio
      </a>
    </p>
  );
}
