import { HeroFilm } from "@/components/hero-film";
import { HomePositioning } from "@/components/home-positioning";
import { RealWork } from "@/components/real-work";
import { HomeIndustries } from "@/components/home-industries";
import { AiVisibility } from "@/components/ai-visibility";
import { Configurator } from "@/components/configurator";
import { HomeFaq } from "@/components/home-faq";

export default function Home() {
  return (
    <div className="relative">
      <HeroFilm />
      <HomePositioning />
      <RealWork />
      <HomeIndustries />
      <AiVisibility />
      <Configurator />
      <HomeFaq />
    </div>
  );
}
