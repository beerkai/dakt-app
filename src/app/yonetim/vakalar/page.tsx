import { createClient } from "@/lib/supabase/server";

import { getAllCaseAdminSummaries } from "@/lib/case-helpers";
import { fetchAllRows } from "@/lib/fetch-all-rows";

import GMPageFooter from "../components/GMPageFooter";
import GMPageHeader from "../components/GMPageHeader";
import CaseStatusControl from "./CaseStatusControl";

export const metadata = {
  title: "Vaka Dosyaları · Genel Müdürlük",
};

export default async function VakalarPage() {
  const supabase = await createClient();

  const allCases = getAllCaseAdminSummaries();

  const { data: metadata } = await supabase
    .from("cases_metadata")
    .select("*");

  const metaMap = new Map(metadata?.map((m) => [m.case_id, m]) ?? []);

  const allSolves = await fetchAllRows<{
    case_id: string;
    attempt_count: number;
  }>((from, to) =>
    supabase
      .from("solved_cases")
      .select("case_id, attempt_count")
      .range(from, to),
  );

  const statsMap = new Map<string, { count: number; firstTry: number }>();
  allSolves?.forEach((s) => {
    const cur = statsMap.get(s.case_id) ?? { count: 0, firstTry: 0 };
    cur.count += 1;
    if (s.attempt_count === 1) cur.firstTry += 1;
    statsMap.set(s.case_id, cur);
  });

  return (
    <>
      <GMPageHeader
        section="C — ARŞİV"
        subject="VAKA DOSYALARI"
        reference="03-CASE"
      />

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h1 className="gm-section-title">
          Bölüm I — Tüm Vakalar ({allCases.length})
        </h1>
      </div>

      <p
        style={{
          fontFamily: "var(--font-newsreader), serif",
          fontSize: 12,
          color: "var(--gm-ink-soft)",
          marginBottom: 24,
          lineHeight: 1.7,
        }}
      >
        Vaka durumu değiştirildiğinde anasayfa ve /davalar sayfası otomatik
        günceller. Test durumundaki vakalar sadece tester rolündeki
        kullanıcılara görünür.
      </p>

      <div className="gm-list">
        {allCases.map((c, idx) => {
          const meta = metaMap.get(c.id);
          const stats = statsMap.get(c.id);
          const status = meta?.status ?? "missing";

          return (
            <div key={c.id} className="gm-list-row">
              <span className="gm-list-index">{String(idx + 1).padStart(2, "0")}.</span>
              <div>
                <div className="gm-list-name">
                  Vaka {c.id} — {c.codename}
                </div>
                <div className="gm-list-detail" style={{ marginTop: 4 }}>
                  {stats?.count ?? 0} çözüm ·
                  {stats
                    ? ` %${Math.round((stats.firstTry / stats.count) * 100)} ilk denemede`
                    : " henüz çözen yok"}
                </div>
              </div>
              <span className="gm-list-detail">
                {c.suspectCount} şüpheli · {c.documentCount} belge
              </span>
              <CaseStatusControl caseId={c.id} currentStatus={status} />
            </div>
          );
        })}
      </div>

      <GMPageFooter section="CASE" page="03" />
    </>
  );
}
