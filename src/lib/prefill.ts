import { PACKAGES, type TierKey } from "@/lib/pricing";

// What the configurator hands to the contact page in the URL. Everything is
// checked against a whitelist: the page never trusts raw query values.
export type BizKey = "cafe" | "clinic" | "hotel";
export type Prefill = {
  biz?: BizKey;
  tier?: TierKey;
  langs: ("fr" | "en" | "tr")[];
  price?: { amount: number; currency: "EUR" | "TRY" };
};

const BIZ: BizKey[] = ["cafe", "clinic", "hotel"];
const LANGS = ["fr", "en", "tr"] as const;

export function parsePrefill(get: (key: string) => string | null): Prefill | null {
  const biz = BIZ.find((b) => b === get("activite"));
  const tier = (Object.keys(PACKAGES) as TierKey[]).find((t) => t === get("formule"));
  const langs = (get("langues") ?? "")
    .split(",")
    .filter((l): l is (typeof LANGS)[number] => (LANGS as readonly string[]).includes(l));
  const amount = Number(get("prix"));
  const currency: "EUR" | "TRY" | null = get("devise") === "TRY" ? "TRY" : get("devise") === "EUR" ? "EUR" : null;
  const price: Prefill["price"] =
    currency && Number.isInteger(amount) && amount > 0 && amount < 100000 ? { amount, currency } : undefined;

  if (!biz && !tier && !price) return null;
  return { biz, tier, langs, price };
}
