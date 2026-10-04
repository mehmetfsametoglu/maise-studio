import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimisation is on: responsive srcset plus AVIF/WebP for the large
  // photographs. (It used to be disabled, which shipped 2 MB PNGs as they were.)
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The portfolio moved to /realisations. One hop, permanent, so old links
      // and anything already indexed keep working.
      { source: "/work", destination: "/realisations", permanent: true },
      // The old live-preview pages are now case studies. The first slug was renamed.
      { source: "/ornek/route95", destination: "/realisations/route-95", permanent: true },
      { source: "/ornek/:slug", destination: "/realisations/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
