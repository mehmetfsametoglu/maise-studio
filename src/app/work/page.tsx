import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";

export const metadata: Metadata = {
  title: "Réalisations — Maisé Studio",
  description: "Les sites que Maisé Studio a conçus et mis en ligne.",
};

export default function WorkPage() {
  return <WorkIndex />;
}
