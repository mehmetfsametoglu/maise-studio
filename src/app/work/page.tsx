import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Nos projets | Maisé Studio",
  description: "Les sites que nous avons faits et mis en ligne.",
};

export default function WorkPage() {
  return <WorkIndex />;
}
