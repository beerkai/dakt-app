import { requireAdminDb } from "@/lib/admin";

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

function isoHoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

export default async function YonetimDashboardPage() {
  // profiles/solved_cases RLS yalnızca kendi satırı → tüm kullanıcılar için service role.
  const { adminDb: supabase } = await requireAdminDb();

  const [
    analystsRes,
    solvedRes,
    activeRoomsRes,
    playingRes,
    waitingRes,
    solvesRes,
    casesRes,
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("solved_cases").select("user_id", { count: "exact", head: true }),
    supabase
      .from("rooms")
      .select("id", { count: "exact", head: true })
      .in("status", ["waiting", "playing"]),
    supabase
      .from("rooms")
      .select("id", { count: "exact", head: true })
      .eq("status", "playing"),
    supabase
      .from("rooms")
      .select("id", { count: "exact", head: true })
      .eq("status", "waiting"),
    supabase
      .from("solved_cases")
      .select("user_id, case_id, accuracy, attempt_count, solved_at, profiles(username)")
      .order("solved_at", { ascending: false })
      .limit(10),
    supabase.from("cases_metadata").select("status"),
  ]);

  const totalAnalysts = analystsRes.error ? null : (analystsRes.count ?? 0);
  const totalSolved = solvedRes.error ? null : (solvedRes.count ?? 0);
  const recentSolvesRaw = solvesRes.data;
  const cases = casesRes.error ? null : casesRes.data;

  type SolveRow = {
    user_id: string;
    case_id: string;
    accuracy: number;
    attempt_count: number;
    solved_at: string;
    profiles: unknown;
  };
  const solveRows = (recentSolvesRaw ?? []) as SolveRow[];

  const oneDayAgo = isoHoursAgo(24);
  const activeTodayRes = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .gte("last_seen_at", oneDayAgo);
  const activeToday = activeTodayRes.error ? null : (activeTodayRes.count ?? 0);

  const activeRoomCount = activeRoomsRes.error ? null : (activeRoomsRes.count ?? 0);
  const playingCount = playingRes.error ? null : (playingRes.count ?? 0);
  const waitingCount = waitingRes.error ? null : (waitingRes.count ?? 0);

  const publishedCases = cases
    ? cases.filter((c) => c.status === "published").length
    : null;
  const testCases = cases
    ? cases.filter((c) => c.status === "test").length
    : null;
  const draftCases = cases
    ? cases.filter((c) => c.status === "draft").length
    : null;

  const queryWarning = [
    analystsRes.error,
    solvedRes.error,
    activeRoomsRes.error,
    playingRes.error,
    waitingRes.error,
    solvesRes.error,
    casesRes.error,
    activeTodayRes.error,
  ].some(Boolean);

  return (
    <>
      <GMPageHeader
        section="A — OPERASYON"
        subject="DURUM PANELİ"
        reference="01-OPS"
      />

      {queryWarning ? (
        <p className="gm-alert" role="alert">
          Bazı sayaçlar okunamadı. Çizgi, eksik veriyi işaret eder.
        </p>
      ) : null}

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h1 className="gm-section-title">Bölüm I — Anlık Durum</h1>
      </div>

      <div className="gm-stat-grid">
        <div className="gm-stat-card">
          <span className="gm-stat-label">Toplam Analist</span>
          <div className="gm-stat-value">{totalAnalysts ?? "—"}</div>
          <div className="gm-stat-sub">
            son 24sa: {activeToday ?? "—"} aktif
          </div>
        </div>

        <div className="gm-stat-card">
          <span className="gm-stat-label">Çözülmüş Vaka</span>
          <div className="gm-stat-value">{totalSolved ?? "—"}</div>
          <div className="gm-stat-sub">tüm zamanlar</div>
        </div>

        <LiveRoomCount
          initialActiveRooms={activeRoomCount}
          initialPlaying={playingCount}
          initialWaiting={waitingCount}
        />

        <div className="gm-stat-card">
          <span className="gm-stat-label">Yayında Vaka</span>
          <div className="gm-stat-value">{publishedCases ?? "—"}</div>
          <div className="gm-stat-sub">
            {testCases ?? "—"} test · {draftCases ?? "—"} taslak
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
                  {solve.attempt_count === 1
                    ? "ilk denemede"
                    : `${solve.attempt_count} deneme`}
                </span>
                <span className="gm-list-meta-box">{dateStr}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p
          style={{
            fontFamily: "var(--font-newsreader), serif",
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
