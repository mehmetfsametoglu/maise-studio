import { NextResponse, type NextRequest } from "next/server";
import { SITE } from "@/lib/site";

// "On vous rappelle" requests. The request is checked here, then mailed to the
// studio through Resend. Nothing is stored and the phone number is never
// written to the logs.
//
// Environment (server only):
//   RESEND_API_KEY       required, without it the feature is off and the
//                        layout hides the button (see app/layout.tsx)
//   CALLBACK_TO_EMAIL    where requests go, defaults to the studio address
//   CALLBACK_FROM_EMAIL  sender, defaults to Resend's test sender
//   RESEND_API_URL       only for tests against a local mock server
const WHEN = { now: "Maintenant", morning: "Matin", afternoon: "Après-midi", evening: "Soir" } as const;
const CODES = ["+33", "+90", "+44", "+1", "+49", "+32", "+41"] as const;

// Small in-memory limiter: enough to stop a loop from one address. It resets
// when the server instance restarts, which is fine for a contact form.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 2000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return false;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "");

export async function POST(request: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ ok: false, error: "disabled" }, { status: 503 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  // Honeypot: a real visitor never fills this field. Answer as if it worked.
  if (str((body as Record<string, unknown>).website, 200)) return NextResponse.json({ ok: true });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  const b = body as Record<string, unknown>;
  const name = str(b.name, 80);
  const digits = str(b.phone, 30).replace(/\D/g, "").replace(/^0+/, "");
  const code = CODES.find((c) => c === b.code);
  const when = typeof b.when === "string" && b.when in WHEN ? (b.when as keyof typeof WHEN) : null;
  const activity = str(b.activity, 120);
  const consent = b.consent === true;

  if (name.length < 2 || digits.length < 6 || digits.length > 13 || !code || !when || !consent) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const text = [
    "Nouvelle demande de rappel depuis le site.",
    "",
    `Nom : ${name}`,
    `Téléphone : ${code} ${digits}`,
    `Activité : ${activity || "non précisée"}`,
    `Moment préféré : ${WHEN[when]}`,
    `Langue du site : ${str(b.lang, 4) || "fr"}`,
    "Consentement : donné via la case à cocher.",
  ].join("\n");

  const api = process.env.RESEND_API_URL || "https://api.resend.com/emails";
  try {
    const res = await fetch(api, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CALLBACK_FROM_EMAIL || `${SITE.name} <onboarding@resend.dev>`,
        to: [process.env.CALLBACK_TO_EMAIL || SITE.email],
        subject: `Demande de rappel : ${name}`,
        text,
      }),
    });
    if (!res.ok) return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
