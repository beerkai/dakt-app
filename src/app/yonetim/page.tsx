import { createClient } from "@/lib/supabase/server";

import GMPageFooter from "./components/GMPageFooter";
import GMPageHeader from "./components/GMPageHeader";
import LiveRoomCount from "./components/LiveRoomCount";

export const metadata = {
  title: "Operasyon Durumu · Genel Müdürlük",
};

function usernameFromJoined(profiles: unknown): string | null {
  if (profiles != null && typeof profiles === "object") {
    if (Array.isArray(profiles))
      return (profiles[0] as { username?: string | null } | undefined)
        ?.username ?? null;
    return (profiles as { username?: string | null }).username ?? null;
  }
  return null;
}

export default async function YonetimDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalAnalysts },
    { count: totalSolved },
    { data: activeRooms },
    { data: recentSolvesRaw },
    { data: cases },
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("solved_cases").select("user_id", { count: "exact", head: true }),
    supabase.from("rooms").select("*").in("status", ["waiting", "playing"]),
    supabase
      .from("solved_cases")
      .select("user_id, case_id, accuracy, attempt_count, solved_at, profiles(username)")
      .order("solved_at", { ascending: false })
      .limit(10),
    supabase.from("cases_metadata").select("*"),
  ]);

  type SolveRow = {
    user_id: string;
    case_id: string;
    accuracy: number;
    attempt_count: number;
    solved_at: string;
    profiles: unknown;
  };
  const solveRows = (recentSolvesRaw ?? []) as SolveRow[];

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count: activeToday } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .gte("last_seen_at", oneDayAgo);

  const playingRooms = activeRooms?.filter((r) => r.status === "playing") ?? [];
  const waitingRooms = activeRooms?.filter((r) => r.status === "waiting") ?? [];

  const publishedCases =
    cases?.filter((c) => c.status === "published").length ?? 0;
  const testCases = cases?.filter((c) => c.status === "test").length ?? 0;
  const draftCases = cases?.filter((c) => c.status === "draft").length ?? 0;

  return (
    <>
      <GMPageHeader
        section="A — OPERASYON"
        subject="DURUM PANELİ"
        reference="01-OPS"
      />

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h1 className="gm-section-title">Bölüm I — Anlık Durum</h1>
      </div>

      <div className="gm-stat-grid">
        <div className="gm-stat-card">
          <span className="gm-stat-label">Toplam Analist</span>
          <div className="gm-stat-value">{totalAnalysts ?? 0}</div>
          <div className="gm-stat-sub">
            son 24sa: {activeToday ?? 0} aktif
          </div>
        </div>

        <div className="gm-stat-card">
          <span className="gm-stat-label">Çözülmüş Vaka</span>
          <div className="gm-stat-value">{totalSolved ?? 0}</div>
          <div className="gm-stat-sub">tüm zamanlar</div>
        </div>

        <LiveRoomCount
          initialActiveRooms={activeRooms?.length ?? 0}
          initialPlaying={playingRooms.length}
          initialWaiting={waitingRooms.length}
        />

        <div className="gm-stat-card">
          <span className="gm-stat-label">Yayında Vaka</span>
          <div className="gm-stat-value">{publishedCases}</div>
          <div className="gm-stat-sub">
            {testCases} test · {draftCases} taslak
          </div>
        </div>
      </div>

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h2 className="gm-section-title">Bölüm II — Son Vaka Kapanışları</h2>
      </div>

      {solveRows.length > 0 ? (
        <div className="gm-list">
          {solveRows.map((solve, idx: number) => {
            const date = new Date(solve.solved_at);
            const dateStr = date.toLocaleString("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={`${solve.user_id}-${solve.case_id}`}
                className="gm-list-row"
              >
                <span className="gm-list-index">
                  {String(idx + 1).padStart(2, "0")}.
                </span>
                <span className="gm-list-name">
                  {usernameFromJoined(solve.profiles) ?? "—"}
                  <span
                    style={{
                      color: "var(--gm-meta)",
                      marginLeft: 12,
                      fontWeight: 400,
                    }}
                  >
                    Vaka {solve.case_id}
                  </span>
                </span>
                <span className="gm-list-detail">
                  {Math.round(solve.accuracy)}% doğruluk ·{" "}
                  {solve.attempt_count} deneme
                </span>
                <span className="gm-list-meta-box">{dateStr}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p
          style={{
            fontFamily: "var(--font-special-elite), monospace",
            color: "var(--gm-meta)",
            fontStyle: "italic",
            padding: "24px 0",
          }}
        >
          Henüz kayıtlı çözüm yok.
        </p>
      )}

      <GMPageFooter section="OPS_DIV" page="01" />
    </>
  );
}
