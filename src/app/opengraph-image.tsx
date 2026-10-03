import { ImageResponse } from "next/og";

export const alt = "Maisé Studio — Paris";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link-preview card for WhatsApp / Instagram / social shares: brand palette
// (espresso, ivory, champagne), no photography and no client material.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#1d1714",
          color: "#f4eee1",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 10, color: "#d3af61", textTransform: "uppercase" }}>
          Paris
        </div>
        <div style={{ fontSize: 132, marginTop: 24, fontStyle: "italic", fontFamily: "Georgia, serif" }}>
          Maisé Studio
        </div>
        <div style={{ fontSize: 40, marginTop: 28, color: "rgba(244,238,225,0.72)" }}>
          Sites web sur mesure, pensés pour votre métier.
        </div>
        <div style={{ width: 120, height: 4, marginTop: 48, background: "#d3af61" }} />
      </div>
    ),
    size,
  );
}
