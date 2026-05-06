import type { AnalystColor } from "@/lib/supabase/types";

/** Analist rengi → UI hex (Ceylin / nav / profil). */
export const ANALYST_COLOR_HEX: Record<AnalystColor, string> = {
  mavi: "#4a90e2",
  sari: "#f4d568",
  yesil: "#7cb342",
  mor: "#9c5fb3",
  turuncu: "#e07a3c",
};

/** Analist rengi → etiket (TR, büyük harf). */
export const ANALYST_COLOR_LABEL_TR: Record<AnalystColor, string> = {
  mavi: "MAVİ",
  sari: "SARI",
  yesil: "YEŞİL",
  mor: "MOR",
  turuncu: "TURUNCU",
};

export function analystHex(color: AnalystColor): string {
  return ANALYST_COLOR_HEX[color];
}

export function analystLabelTr(color: AnalystColor): string {
  return ANALYST_COLOR_LABEL_TR[color];
}
