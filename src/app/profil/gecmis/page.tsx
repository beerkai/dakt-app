import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { caseTabHref } from "@/lib/case-tab-routes";
import { getCase } from "@/lib/case-helpers";
import { createClient } from "@/lib/supabase/server";
import type { SolvedCase } from "@/lib/supabase/types";

import { ResetHistoryButton } from "./ResetHistoryButton";

export const metadata: Metadata = {
  title: "Geçmiş · D.A.K.T.",
  description: "Çözdüğün vakaların kronolojik kaydı.",
};

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-newsreader),serif]";

export default async function ProfilGecmisPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const { data: solved } = await supabase
    .from("solved_cases")
    .select("*")
    .eq("user_id", user.id)
    .order("solved_at", { ascending: false });

  const rows = (solved ?? []) as SolvedCase[];
  const coopRooms = await loadCoopHistory(supabase, user.id);

  const dateTimeFmt = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (rows.length === 0 && coopRooms.length === 0) {
    return (
      <div className="relative z-[1] mx-auto w-full max-w-[720px] flex-1 px-5 py-12 md:px-7 md:py-16">
        <header className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
            Geçmiş
          </h1>
          <p className={`text-[16px] text-[var(--subtitle-text)] ${typewriter}`}>
            Çözdüğün vakaların kronolojik kaydı
          </p>
        </header>
        <p className="mx-auto mb-8 max-w-md text-center text-[15px] italic leading-relaxed text-[var(--kraft-dark)] [font-family:var(--font-cormorant),serif]">
          Henüz geçmiş yok. İlk vakanı çözünce burada görünecek.
        </p>
        <div className="text-center">
          <Link
            href="/davalar"
            className={`inline-flex border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-8 py-4 text-[10px] uppercase tracking-[0.26em] text-[var(--paper)] transition-colors hover:bg-[var(--bordeaux-bright)] ${mono}`}
          >
            Davalara Git →
          </Link>
        </div>

        <ResetHistoryButton />
      </div>
    );
  }

  return (
    <div className="relative z-[1] mx-auto w-full max-w-[720px] flex-1 px-5 py-10 md:px-7 md:py-14">
      <header className="mb-10">
        <h1 className="mb-3 text-4xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
          Geçmiş
        </h1>
        <p className={`text-[16px] text-[var(--subtitle-text)] ${typewriter}`}>
          Çözdüğün vakaların kronolojik kaydı
        </p>
      </header>

      {rows.length === 0 ? (
        <p className={`m-0 text-[15px] text-[var(--meta-label)] ${typewriter}`}>
          Henüz çözülmüş vaka kaydın yok.
        </p>
      ) : null}
      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {rows.map((row) => {
          const caseData = getCase(row.case_id);
          const codename = caseData?.codename ?? "—";
          const briefHref = caseTabHref(row.case_id, "brief");
          return (
            <li key={row.id}>
              <Link
                href={briefHref}
                className="block border border-[var(--kraft-dark)] bg-[var(--anthracite-2)] p-5 transition-[border-color,box-shadow] hover:border-[var(--bordeaux-bright)] hover:shadow-[0_0_20px_rgba(0,0,0,0.35)] md:p-6"
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2 border-b border-[var(--rule)] pb-3">
                  <p className="m-0 text-[11px] uppercase tracking-[0.28em] text-[var(--kraft)] [font-family:var(--font-cormorant),serif]">
                    DOSYA №{row.case_id} ·{" "}
                    <span className="italic text-[var(--paper)]">
                      {codename.toLocaleUpperCase("tr-TR")}
                    </span>
                  </p>
                  <span className="case-solved-badge shrink-0">✓ ÇÖZÜLDÜ</span>
                </div>
                <p
                  className={`${mono} mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--kraft-light)]`}
                >
                  SÜRE:{" "}
                  {Math.floor(row.duration_seconds / 60)} dk{" "}
                  {row.duration_seconds % 60} sn · DENEME:{" "}
                  {row.attempt_count}.
                </p>
                <p className={`m-0 text-[15px] text-[var(--kraft-dark)] ${typewriter}`}>
                  {dateTimeFmt.format(new Date(row.solved_at))}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mt-12" aria-labelledby="gecmis-oda-oturumlari">
        <h2
          id="gecmis-oda-oturumlari"
          className={`mb-4 text-[11px] uppercase tracking-[0.26em] text-[var(--kraft)] ${mono}`}
        >
          Oda Oturumları
        </h2>
        {coopRooms.length === 0 ? (
          <p className={`m-0 text-[15px] leading-relaxed text-[var(--meta-label)] ${typewriter}`}>
            Henüz kapanmış bir co-op odan yok. Ekiple oynadığın vakalar burada
            listelenecek.
          </p>
        ) : (
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {coopRooms.map((room) => {
              const codename = getCase(room.case_id)?.codename ?? "—";
              const endedAt = room.finished_at ?? room.archived_at;
              const solvedByMe = rows.some((r) => r.case_id === room.case_id);
              return (
                <li
                  key={room.id}
                  className="flex flex-wrap items-center justify-between gap-3 border border-[var(--rule)] bg-[var(--anthracite)] px-5 py-4"
                >
                  <div>
                    <p className="m-0 text-[11px] uppercase tracking-[0.24em] text-[var(--kraft)] [font-family:var(--font-cormorant),serif]">
                      DOSYA №{room.case_id} ·{" "}
                      <span className="italic text-[var(--paper)]">
                        {codename.toLocaleUpperCase("tr-TR")}
                      </span>
                    </p>
                    <p className={`m-0 mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--meta-label)] ${mono}`}>
                      ODA {room.code} · {room.isHost ? "HOST" : "ANALİST"}
                      {endedAt ? ` · ${dateTimeFmt.format(new Date(endedAt))}` : ""}
                    </p>
                  </div>
                  <span
                    className={`${mono} shrink-0 text-[10px] uppercase tracking-[0.2em] ${
                      solvedByMe ? "text-[var(--kraft-light)]" : "text-[var(--meta-label)]"
                    }`}
                  >
                    {solvedByMe ? "✓ Çözüldü" : room.status === "archived" ? "Arşivlendi" : "Kapandı"}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <ResetHistoryButton />
    </div>
  );
}

type CoopHistoryRoom = {
  id: string;
  code: string;
  case_id: string;
  status: string;
  finished_at: string | null;
  archived_at: string | null;
  isHost: boolean;
};

async function loadCoopHistory(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
): Promise<CoopHistoryRoom[]> {
  const { data: memberships } = await supabase
    .from("room_players")
    .select("room_id")
    .eq("user_id", userId);
  const roomIds = [...new Set((memberships ?? []).map((m) => m.room_id))];
  if (roomIds.length === 0) return [];

  const { data: rooms } = await supabase
    .from("rooms")
    .select("id, code, case_id, status, host_user_id, finished_at, archived_at")
    .in("id", roomIds)
    .in("status", ["solved", "archived"])
    .order("created_at", { ascending: false })
    .limit(20);

  return (rooms ?? []).map((r) => ({
    id: String(r.id),
    code: String(r.code ?? "").toUpperCase(),
    case_id: String(r.case_id),
    status: String(r.status),
    finished_at: r.finished_at ?? null,
    archived_at: r.archived_at ?? null,
    isHost: r.host_user_id === userId,
  }));
}
