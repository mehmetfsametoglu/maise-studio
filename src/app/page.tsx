import { Hero } from "@/components/hero";
import { RealWork } from "@/components/real-work";
import { AiVisibility } from "@/components/ai-visibility";
import { Configurator } from "@/components/configurator";

// The home page answers three questions in about ten seconds: what do they
// do (hero), is there proof (real work), how much (configurator). Services,
// the scroll-driven showcase and the brand story live on /studio.
export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <RealWork />
      <AiVisibility />
      <Configurator />
    </div>
  );
}
