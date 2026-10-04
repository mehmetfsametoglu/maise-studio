import type { Metadata } from "next";
import { StudioIntro } from "@/components/studio-intro";
import { StudioVisual } from "@/components/studio-visual";
import { StudioProcess } from "@/components/studio-process";
import { Capabilities } from "@/components/capabilities";
import { BrandIntro } from "@/components/brand-intro";
import { Services } from "@/components/services";

export const metadata: Metadata = {
  alternates: { canonical: "/studio" },
  title: "À propos | Maisé Studio",
  description: "Comment on crée votre site, de la première discussion à la mise en ligne.",
};

export default function StudioPage() {
  return (
    <div>
      <StudioIntro />
      <BrandIntro />
      <Services />
      <StudioVisual
        src="/studio/interior.png"
        alt="Maisé Studio showroom interior"
        captionKey="studio.visual1"
      />
      <StudioProcess />
      <StudioVisual
        src="/studio/process-board.png"
        alt="Maisé Studio process board"
        captionKey="studio.visual2"
        aspect="16 / 9"
      />
      <Capabilities />
    </div>
  );
}
