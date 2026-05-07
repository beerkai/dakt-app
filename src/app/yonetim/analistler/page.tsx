import Link from "next/link";

import { getAllUserEmails } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

import GMPageFooter from "../components/GMPageFooter";
import GMPageHeader from "../components/GMPageHeader";

export const metadata = {
  title: "Analistler · Genel Müdürlük",
};

export default async function AnalistlerPage() {
  const supabase = await createClient();

  const [{ data: profiles }, emailMap] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "id, username, color, role, is_tester, last_seen_at, suspended_at, created_at",
      )
      .order("created_at", { ascending: false }),
    getAllUserEmails(),
  ]);

  const { data: solvedCounts } = await supabase
    .from("solved_cases")
    .select("user_id");

  const solvedMap = new Map<string, number>();
  solvedCounts?.forEach((s) => {
    solvedMap.set(s.user_id, (solvedMap.get(s.user_id) ?? 0) + 1);
  });

  function isOnline(lastSeen: string | null): boolean {
    if (!lastSeen) return false;
    const diff = Date.now() - new Date(lastSeen).getTime();
    return diff < 5 * 60 * 1000;
  }

  return (
    <>
      <GMPageHeader
        section="B — KAYIT"
        subject="ANALİST SİCİLİ"
        reference="02-RANK"
      />

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h1 className="gm-section-title">
          Bölüm I — Tüm Analistler ({profiles?.length ?? 0})
        </h1>
      </div>

      {profiles && profiles.length > 0 ? (
        <div className="gm-list">
          {profiles.map((p, idx) => {
            const solved = solvedMap.get(p.id) ?? 0;
            const online = isOnline(p.last_seen_at);
            const suspended = !!p.suspended_at;

            return (
              <div key={p.id} className="gm-list-row">
                <span className="gm-list-index">
                  {String(idx + 1).padStart(3, "0")}.
                </span>
                <Link
                  href={`/yonetim/analistler/${p.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <span
                    className={`gm-list-name ${p.role === "admin" ? "gm-list-name-accent" : ""}`}
                  >
                    {online && <span className="gm-live-dot" />}@{p.username}
                    {p.role === "admin" && (
                      <span className="gm-off-record">DİREKTÖR</span>
                    )}
                    {p.is_tester && (
                      <span
                        className="gm-off-record"
                        style={{
                          color: "var(--gm-stamp-blue)",
                          borderColor: "var(--gm-stamp-blue)",
                        }}
                      >
                        TEST
                      </span>
                    )}
                    {suspended && (
                      <span
                        className="gm-off-record"
                        style={{ color: "var(--gm-stamp-red)" }}
                      >
                        ASKIDA
                      </span>
                    )}
                  </span>
                </Link>
                <span className="gm-list-detail">
                  {emailMap.get(p.id) ?? (
                    <em style={{ color: "var(--gm-meta)" }}>misafir</em>
                  )}
                  {" · "}
                  {solved} vaka
                </span>
                <span className="gm-list-meta-box">
                  {new Date(p.created_at).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Analist yok.</p>
      )}

      <GMPageFooter section="RANK" page="02" />
    </>
  );
}
