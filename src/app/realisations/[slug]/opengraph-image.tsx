import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PROJECTS, getProject } from "@/lib/projects";

export const alt = "Réalisation Maisé Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

// Social card for a case study: the project's own photo on the right, the
// project name and place on the studio's palette on the left.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  const name = p?.name ?? "Maisé Studio";
  const place = p ? `${p.sector.fr} · ${p.city}` : "Paris";

  let photo: string | null = null;
  if (p) {
    const file = await readFile(path.join(process.cwd(), "public", p.image));
    photo = `data:image/jpeg;base64,${file.toString("base64")}`;
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1d1714", color: "#f4eee1" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", width: 700 }}>
          <div style={{ fontSize: 24, letterSpacing: 8, color: "#d3af61", textTransform: "uppercase" }}>
            Réalisation
          </div>
          <div style={{ fontSize: name.length > 14 ? 76 : 100, marginTop: 24, fontStyle: "italic", fontFamily: "Georgia, serif", lineHeight: 1.05 }}>
            {name}
          </div>
          <div style={{ fontSize: 34, marginTop: 24, color: "rgba(244,238,225,0.75)" }}>{place}</div>
          <div style={{ marginTop: 56, fontSize: 28, color: "#d3af61" }}>Maisé Studio, Paris</div>
        </div>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" width={500} height={630} style={{ width: 500, height: 630, objectFit: "cover" }} />
        )}
      </div>
    ),
    size,
  );
}
