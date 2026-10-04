import { NextResponse } from "next/server";
import { OUTBOUND } from "@/lib/outbound";

// Outbound links to the client and example sites go through our own address, so
// the pages carry /go/<name> instead of the hosting address of each site, and
// only sites listed in our data can be reached this way (no open redirect).
// Blocked for crawlers in robots.ts.
export function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const target = Object.hasOwn(OUTBOUND, slug) ? OUTBOUND[slug] : undefined;
    if (!target) return NextResponse.redirect(new URL("/realisations", _req.url), 307);
    return NextResponse.redirect(target, 307);
  });
}
