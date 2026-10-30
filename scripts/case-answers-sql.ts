/**
 * case_answers seed SQL'ini vaka verisinden üretir.
 * Yeni vaka eklenince: `npm run db:case-answers` çıktısını bir migration'a koy ve uygula.
 * (submit_solution RPC'si cevabı yalnızca bu tablodan kontrol eder.)
 */
import { getAllCases } from "@/lib/case-helpers";

const esc = (s: string) => s.replace(/'/g, "''");
const rows = getAllCases().map(
  (c) => `  ('${esc(c.id)}', '${esc(c.verdict.perpetratorId)}')`,
);
console.log(
  `INSERT INTO public.case_answers (case_id, perpetrator_id) VALUES\n${rows.join(",\n")}\nON CONFLICT (case_id) DO UPDATE\n  SET perpetrator_id = EXCLUDED.perpetrator_id, updated_at = now();`,
);
