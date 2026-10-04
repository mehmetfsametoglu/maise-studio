import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StudioIntro } from "@/components/studio-intro";
import { StudioVisual } from "@/components/studio-visual";
import { StudioProcess } from "@/components/studio-process";
import { Capabilities } from "@/components/capabilities";
import { BrandIntro } from "@/components/brand-intro";
import { Services } from "@/components/services";

export const metadata: Metadata = pageMetadata({
  title: "Studio web à Paris : design et développement | Maisé Studio",
  description:
    "Qui est Maisé Studio : une petite équipe à Paris qui conçoit et développe des sites sur mesure, du premier brief à la mise en ligne.",
  path: "/studio",
});

export default function StudioPage() {
  return (
    <div>
      <StudioIntro />
      <BrandIntro />
      <Services />
      <StudioVisual
        src="/studio/interior.png"
        alt=""
        captionKey="studio.visual1"
      />
      <StudioProcess />
      <StudioVisual
        src="/studio/process-board.png"
        alt=""
        captionKey="studio.visual2"
        aspect="16 / 9"
      />
      <Capabilities />
    </div>
  );
}
