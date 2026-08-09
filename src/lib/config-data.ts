import type { DictKey } from "@/lib/i18n";

export type BizKey = "cafe" | "clinic" | "hotel";
export type TierKey = "basic" | "mid" | "premium";

export const BUSINESS: {
  key: BizKey;
  nameKey: DictKey;
  descKey: DictKey;
  accent: string;
  accentSoft: string;
}[] = [
  { key: "cafe", nameKey: "biz.cafe.name", descKey: "biz.cafe.desc", accent: "#c8934e", accentSoft: "rgba(200,147,78,0.14)" },
  { key: "clinic", nameKey: "biz.clinic.name", descKey: "biz.clinic.desc", accent: "#8a9a78", accentSoft: "rgba(138,154,120,0.14)" },
  { key: "hotel", nameKey: "biz.hotel.name", descKey: "biz.hotel.desc", accent: "#a05248", accentSoft: "rgba(160,82,72,0.14)" },
];

export const TIERS: {
  key: TierKey;
  nameKey: DictKey;
  tagKey: DictKey;
  price: number;
}[] = [
  { key: "basic", nameKey: "tier.basic.name", tagKey: "tier.basic.tag", price: 900 },
  { key: "mid", nameKey: "tier.mid.name", tagKey: "tier.mid.tag", price: 2200 },
  { key: "premium", nameKey: "tier.premium.name", tagKey: "tier.premium.tag", price: 4500 },
];

export function bizByKey(key: BizKey) {
  return BUSINESS.find((b) => b.key === key)!;
}

export function tierByKey(key: TierKey) {
  return TIERS.find((t) => t.key === key)!;
}
