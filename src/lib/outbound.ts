// Server-only: the hosting addresses of the client and example sites. They are
// kept out of the data that pages and components receive, so they are not
// written into the pages. Only /go/[slug] reads this file. The slug must match
// a project in projects.ts or an example in concepts.ts.
export const OUTBOUND: Record<string, string> = {
  "le-40": "https://lequarante.lovable.app",
  "route-95": "https://route95.lovable.app",
  "voler-coffee": "https://voolercoffee.lovable.app",
  "bloom-mosaic": "https://mosaic-motion-studio.lovable.app",
  "maison-vesper": "https://maison-vesper-concept.lovable.app",
  "lumea-skin": "https://lumeaskin-calm-concept.lovable.app",
};
