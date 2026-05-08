/**
 * D.A.K.T. Vaka Builder
 * 
 * JSON taslağını TypeScript vaka dosyasına çevirir.
 * 
 * Kullanım:
 *   npx tsx vaka-kaynak/builders/json-to-ts.ts <vakaId>
 * 
 * Örnek:
 *   npx tsx vaka-kaynak/builders/json-to-ts.ts 167
 * 
 * Girdi:
 *   vaka-kaynak/taslaklar/<vakaId>/4-tam.json
 * 
 * Çıktı:
 *   src/data/cases/<vakaId>.ts
 *   src/data/cases/<vakaId>-message-threads.ts (varsa)
 */

import * as fs from "node:fs";
import * as path from "node:path";

// ============================================================
// CLI argüman parse
// ============================================================
const caseId = process.argv[2];
if (!caseId) {
  console.error("HATA: Vaka ID'si gerekli.");
  console.error("Kullanım: npx tsx vaka-kaynak/builders/json-to-ts.ts <vakaId>");
  console.error("Örnek:    npx tsx vaka-kaynak/builders/json-to-ts.ts 167");
  process.exit(1);
}

if (!/^\d{3}$/.test(caseId)) {
  console.error(`HATA: Vaka ID'si 3 haneli olmalı. Verilen: "${caseId}"`);
  process.exit(1);
}

// ============================================================
// Dosya yolları
// ============================================================
const projectRoot = path.resolve(__dirname, "../..");
const draftPath = path.join(
  projectRoot,
  "vaka-kaynak",
  "taslaklar",
  caseId,
  "4-tam.json"
);
const outputCasePath = path.join(
  projectRoot,
  "src",
  "data",
  "cases",
  `${caseId}.ts`
);
const outputThreadsPath = path.join(
  projectRoot,
  "src",
  "data",
  "cases",
  `${caseId}-message-threads.ts`
);

// ============================================================
// JSON oku
// ============================================================
if (!fs.existsSync(draftPath)) {
  console.error(`HATA: Taslak bulunamadı: ${draftPath}`);
  console.error(`Önce 4. aşamayı (4-tam.json) tamamla.`);
  process.exit(1);
}

const rawJson = fs.readFileSync(draftPath, "utf-8");
let caseData: any;
try {
  caseData = JSON.parse(rawJson);
} catch (err) {
  console.error(`HATA: JSON parse edilemedi: ${draftPath}`);
  console.error(err);
  process.exit(1);
}

// _yorum alanlarını kaldır (JSON yorumları, builder'a gerek yok)
function stripComments(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(stripComments);
  }
  if (obj && typeof obj === "object") {
    const cleaned: any = {};
    for (const key in obj) {
      if (key.startsWith("_")) continue;
      cleaned[key] = stripComments(obj[key]);
    }
    return cleaned;
  }
  return obj;
}

caseData = stripComments(caseData);

// ============================================================
// Validation
// ============================================================
function validate(): string[] {
  const errors: string[] = [];

  if (!caseData.id) errors.push("id eksik");
  if (caseData.id !== caseId) {
    errors.push(`id (${caseData.id}) ile dosya adı (${caseId}) uyuşmuyor`);
  }
  if (!caseData.codename) errors.push("codename eksik");
  if (!caseData.fullTitle) errors.push("fullTitle eksik");
  if (typeof caseData.victim !== "string" || !caseData.victim) errors.push("victim (string) eksik");
  if (!caseData.location) errors.push("location eksik");
  if (!caseData.suspects || caseData.suspects.length < 4) {
    errors.push(`En az 4 şüpheli gerekli (${caseData.suspects?.length ?? 0} bulundu)`);
  }

  if (!caseData.testimonies || caseData.testimonies.length < 5) {
    errors.push(`En az 5 ifade gerekli (${caseData.testimonies?.length ?? 0} bulundu)`);
  }

  if (!caseData.verdict?.perpetratorId) {
    errors.push("verdict.perpetratorId eksik");
  } else {
    const failId = caseData.verdict.perpetratorId;
    const matchingSuspect = caseData.suspects?.find(
      (s: any) => s.id === failId
    );
    if (!matchingSuspect) {
      errors.push(`verdict.perpetratorId="${failId}" hiçbir suspects.id ile eşleşmiyor`);
    }
  }

  return errors;
}

const validationErrors = validate();
if (validationErrors.length > 0) {
  console.error("HATA: Validation başarısız:");
  validationErrors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log(`✓ Validation: ${caseData.codename} (${caseData.id})`);

// ============================================================
// MessageThreads ayrıştır (varsa ayrı dosya yaz)
// ============================================================
const messageThreads = caseData.messageThreads ?? [];
const hasMessageThreads = messageThreads.length > 0;

if (hasMessageThreads) {
  const threadsContent = `import type { MessageThread } from "@/lib/case-types";

export const case${caseId}MessageThreads: MessageThread[] = ${JSON.stringify(
    messageThreads,
    null,
    2
  )};
`;
  fs.writeFileSync(outputThreadsPath, threadsContent, "utf-8");
  console.log(`✓ Mesaj zincirleri yazıldı: ${outputThreadsPath}`);
}

// ============================================================
// Ana TS dosyasını üret
// ============================================================
const exportName = `case${caseId}`;

// messageThreads'i ana dosyadan çıkar (ayrı dosyada zaten)
const { messageThreads: _, ...mainCaseData } = caseData;

const importLine = hasMessageThreads
  ? `import { case${caseId}MessageThreads } from "./${caseId}-message-threads";\n`
  : "";

const tsContent = `import type { CaseData } from "@/lib/case-types";
${importLine}
export const ${exportName}: CaseData = ${JSON.stringify(mainCaseData, null, 2)};
${
  hasMessageThreads
    ? `\n// MessageThread referansını CaseData'ya bağla\n(${exportName} as any).messageThreads = case${caseId}MessageThreads;\n`
    : ""
}`;

// JSON.stringify çıktısı string'leri "" ile sarar — TypeScript için bu OK
// Ama property key'lerini de "" ile sarar, bu de geçerli TS

fs.writeFileSync(outputCasePath, tsContent, "utf-8");
console.log(`✓ Ana vaka dosyası yazıldı: ${outputCasePath}`);

// ============================================================
// Sonraki adımlar
// ============================================================
console.log("");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`  ✓ VAKA ${caseId} BUILD TAMAM`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("");
console.log("Sonraki adımlar:");
console.log("");
console.log(`1. src/lib/case-helpers.ts dosyasını aç`);
console.log(`   - Üst tarafta import ekle:`);
console.log(`     import { case${caseId} } from "@/data/cases/${caseId}";`);
console.log(`   - ALL_CASES array'ine ekle (parseInt sıralı yer):`);
console.log(`     case${caseId},`);
console.log("");
console.log(`2. Build test:`);
console.log(`   npm run build`);
console.log("");
console.log(`3. Supabase SQL Editor:`);
console.log(`   INSERT INTO public.cases_metadata (case_id, status, created_at)`);
console.log(`     VALUES ('${caseId}', 'test', now())`);
console.log(`     ON CONFLICT (case_id) DO UPDATE SET status = 'test';`);
console.log("");
console.log(`4. Tester olarak test et: dakt.app/davalar`);
console.log(`   (Eğer tester değilsen /yonetim/analistler/[seni] → Tester Yap)`);
console.log("");
console.log(`5. Beğenirsen status'ü 'published' yap (yönetim panelinden).`);
console.log("");