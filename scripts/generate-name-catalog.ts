/**
 * vaka-kaynak/katalog/kullanılan-isimler.md dosyasını statik vaka verisinden üretir.
 * Çalıştır: npm run catalog:names
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { getAllCases } from "../src/lib/case-helpers";

const out: string[] = [
  "# Kullanılan Karakter İsimleri",
  "",
  "Yeni vaka karakterlerinde **bu isimleri tekrar etme**. Aynı isim farklı vakada okuyucuyu karıştırır.",
  "",
  "> Bu dosya `scripts/generate-name-catalog.ts` ile statik vaka verisinden üretilir; elle düzenleme yapma.",
  "",
];

const surnameCount = new Map<string, string[]>();
const firstNameCount = new Map<string, string[]>();

function track(map: Map<string, string[]>, key: string | undefined, caseId: string) {
  if (!key) return;
  const list = map.get(key) ?? [];
  list.push(caseId);
  map.set(key, list);
}

for (const c of getAllCases()) {
  out.push(`## Vaka ${c.id} — ${c.codename}`, "");
  out.push("| Rol | Ad Soyad | Görev |", "|-----|----------|-------|");
  out.push(`| Kurban | ${c.victim} | — |`);
  for (const s of c.suspects) {
    const role = s.id === c.verdict.perpetratorId ? "Fail" : "Şüpheli";
    out.push(`| ${role} | ${s.name} | ${s.role} |`);
    const parts = s.name.trim().split(/\s+/);
    track(surnameCount, parts.at(-1), c.id);
    track(firstNameCount, parts[0], c.id);
  }
  out.push("", "---", "");
}

function repeatedIn(map: Map<string, string[]>) {
  return [...map.entries()]
    .map(([name, ids]) => [name, [...new Set(ids)]] as const)
    .filter(([, ids]) => ids.length > 1)
    .sort((a, b) => a[0].localeCompare(b[0], "tr"));
}

for (const [title, map] of [
  ["Birden fazla vakada geçen soyadları", surnameCount],
  ["Birden fazla vakada geçen adlar", firstNameCount],
] as const) {
  out.push(`## ${title}`, "");
  const repeated = repeatedIn(map);
  if (repeated.length === 0) out.push("Yok.");
  for (const [name, ids] of repeated) out.push(`- **${name}** — ${ids.join(", ")}`);
  out.push("");
}

const target = join(process.cwd(), "vaka-kaynak", "katalog", "kullanılan-isimler.md");
writeFileSync(target, out.join("\n"));
console.log(`yazıldı: ${target}`);
