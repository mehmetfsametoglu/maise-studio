// Single source of truth for who Maisé Studio is. Every title, JSON-LD block,
// llms.txt line and footer fact should come from here (or from docs/entity-profile.md,
// which repeats the same wording for external profiles).
//
// Only facts already public on the site live here. Nothing below is invented:
// no street address, no founding date, no headcount, no social profiles.

export const SITE = {
  name: "Maisé Studio",
  url: "https://www.maisestudio.com",
  email: "studiomaise@gmail.com",
  locality: "Paris",
  country: "FR",
  countryName: "France",
  // Contact hours as stated on the contact page (availability, not a shop opening time).
  hoursLabel: "Tous les jours, 9h-19h",
  responseTime: "moins de 3 heures",
  team: ["Mehmet Sametoglu", "Ismail Cakir"],
  // One-sentence entity definition, reused in metadata, JSON-LD and llms.txt.
  short:
    "Maisé Studio est un studio de design et développement web basé à Paris, qui crée des sites sur mesure pour restaurants, cafés, hôtels, boutiques et entreprises locales.",
  // Same definition, a little longer, shown on the home page.
  long: "Maisé Studio est un studio de design et développement web basé à Paris. On conçoit des sites sur mesure pour restaurants, cafés, hôtels, boutiques et entreprises, de la direction artistique à la mise en ligne.",
  // Verified social profiles only. Both accounts confirmed by the owner and checked online.
  instagram: [
    { label: "Instagram FR", handle: "maisestudio.fr", url: "https://www.instagram.com/maisestudio.fr/" },
    { label: "Instagram TR", handle: "maisestudio.tr", url: "https://www.instagram.com/maisestudio.tr/" },
  ],
} as const;

// Profile URLs for structured data.
// Add other verified profiles (LinkedIn, ...) here once they exist.
export const SAME_AS: string[] = [...SITE.instagram.map((i) => i.url)];

export function absoluteUrl(path = "/") {
  return `${SITE.url}${path === "/" ? "" : path}`;
}
