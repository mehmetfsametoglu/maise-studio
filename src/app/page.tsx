import { HeroFilm } from "@/components/hero-film";
import { RealWork } from "@/components/real-work";
import { AiVisibility } from "@/components/ai-visibility";
import { Configurator } from "@/components/configurator";

export default function Home() {
  return (
    <div className="relative">
      <HeroFilm />
      <RealWork />
      <AiVisibility />
      <Configurator />
    </div>
  );
}
