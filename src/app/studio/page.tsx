import type { Metadata } from "next";
import { StudioIntro } from "@/components/studio-intro";
import { StudioVisual } from "@/components/studio-visual";
import { StudioProcess } from "@/components/studio-process";
import { Capabilities } from "@/components/capabilities";

export const metadata: Metadata = {
  title: "Studio — Maisé Studio",
  description: "Comment Maisé Studio conçoit et développe un site, du brief à la mise en ligne.",
};

export default function StudioPage() {
  return (
    <div>
      <StudioIntro />
      <StudioVisual
        src="/studio/interior.png"
        alt="Maisé Studio — brand aesthetic"
        captionKey="studio.visual1"
      />
      <StudioProcess />
      <StudioVisual
        src="/studio/process-board.png"
        alt="Maisé Studio — from strategy to launch"
        captionKey="studio.visual2"
        aspect="16 / 9"
      />
      <Capabilities />
    </div>
  );
}
