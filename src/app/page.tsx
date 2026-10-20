import { HomeHero } from "@/components/home-hero";
import { HomeProof } from "@/components/home-proof";
import { HomePositioning } from "@/components/home-positioning";
import { RealWork } from "@/components/real-work";
import { HomeIndustries } from "@/components/home-industries";
import { HomeHow } from "@/components/home-how";
import { HomeWhy } from "@/components/home-why";
import { HomeFormulas } from "@/components/home-formulas";
import { AiVisibility } from "@/components/ai-visibility";
import { Configurator } from "@/components/configurator";
import { HomeFaq } from "@/components/home-faq";

export default function Home() {
  return (
    <div className="relative">
      <HomeHero />
      <HomeProof />
      <HomePositioning />
      <RealWork />
      <HomeIndustries />
      <HomeWhy />
      <HomeHow />
      <AiVisibility />
      <HomeFormulas />
      <Configurator />
      <HomeFaq />
    </div>
  );
}
