import { NextResponse, type NextRequest } from "next/server";

// The studio's WhatsApp number lives only on the server (WHATSAPP_NUMBER) and
// is never shipped to the browser: buttons point at this route, which builds
// the wa.me URL and answers with a redirect. If the variable is missing the
// visitor lands on the contact page instead of a broken link.
const MAX_TEXT = 1200;

function buildTarget(request: NextRequest, text: string) {
  const number = (process.env.WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  if (!number) return new URL("/contact", request.url);
  const target = new URL(`https://wa.me/${number}`);
  const clean = text.trim().slice(0, MAX_TEXT);
  // %20, not "+": wa.me reads the query literally.
  if (clean) target.search = `?text=${encodeURIComponent(clean)}`;
  return target;
}

export function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text") ?? "";
  return NextResponse.redirect(buildTarget(request, text), 302);
}

// The contact form posts here so name / email never travel in a URL.
export async function POST(request: NextRequest) {
  const data = await request.formData().catch(() => null);
  const raw = data?.get("text");
  const text = typeof raw === "string" ? raw : "";
  // 303 turns the POST into a GET on the destination.
  return NextResponse.redirect(buildTarget(request, text), 303);
}
