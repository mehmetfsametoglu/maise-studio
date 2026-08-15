import type { DictKey } from "@/lib/i18n";

export type RealProject = {
  slug: string;
  name: string;
  url: string;
  image: string;
  sectorKey: DictKey;
};

export const REAL_PROJECTS: RealProject[] = [
  {
    slug: "route95",
    name: "Route 95",
    url: "https://route95.lovable.app",
    image: "/work/route95.png",
    sectorKey: "realwork.route95",
  },
  {
    slug: "bloom-mosaic",
    name: "Bloom Mosaic Studio",
    url: "https://mosaic-motion-studio.lovable.app",
    image: "/work/bloom-mosaic.jpg",
    sectorKey: "realwork.bloom",
  },
  {
    slug: "le-40",
    name: "Le 40",
    url: "https://lequarante.lovable.app",
    image: "/work/lequarante.jpg",
    sectorKey: "realwork.le40",
  },
  {
    slug: "voler-coffee",
    name: "Vøler Coffee & Breakfast",
    url: "https://voolercoffee.lovable.app",
    image: "/work/voolercoffee.jpg",
    sectorKey: "realwork.voler",
  },
];
