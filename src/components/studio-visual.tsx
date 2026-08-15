"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/use-reveal";
import { useLang, type DictKey } from "@/lib/i18n";

export function StudioVisual({
  src,
  alt,
  captionKey,
  aspect = "21 / 9",
}: {
  src: string;
  alt: string;
  captionKey?: DictKey;
  aspect?: string;
}) {
  const { t } = useLang();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="px-6 pb-4 md:px-10">
      <div
        ref={ref}
        className={`reveal ${visible ? "reveal-in" : ""} mx-auto max-w-6xl`}
      >
        <div
          className="relative w-full overflow-hidden rounded-[1.75rem]"
          style={{ aspectRatio: aspect }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
        {captionKey && (
          <p className="mt-4 px-2 text-xs text-muted-foreground">{t(captionKey)}</p>
        )}
      </div>
    </section>
  );
}
