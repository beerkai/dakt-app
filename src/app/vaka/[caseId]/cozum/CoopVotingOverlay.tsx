"use client";

import { createClient } from "@/lib/supabase/client";
import { useRoomVoting } from "@/hooks/useRoomVoting";
import { useEffect, useMemo, useState } from "react";

export type CoopOverlaySuspect = {
  id: string;
  name: string;
  role: string;
  code?: string;
};

type Props = {
  roomId: string;
  suspects: CoopOverlaySuspect[];
  playerCount: number;
  userId: string;
  onVoteComplete: (suspectId: string) => void;
  hostBypassEnabled: boolean;
  isHost: boolean;
};

export function CoopVotingOverlay({
  roomId,
  suspects,
  playerCount,
  userId,
  onVoteComplete,
  hostBypassEnabled,
  isHost,
}: Props) {
  const {
    votes,
    myVote,
    castVote,
    unanimousSuspect,
    status,
    loading: votesLoading,
  } = useRoomVoting({ roomId, userId, playerCount });

  const [playerDir, setPlayerDir] = useState<
    Map<string, { username: string; color: string }>
  >(() => new Map());

  useEffect(() => {
    const supabase = createClient();

    async function loadPlayers() {
      const { data, error } = await supabase
        .from("room_players")
        .select("user_id, username, color")
        .eq("room_id", roomId)
        .is("left_at", null);

      if (error) return;

      setPlayerDir(
        new Map(
          (data ?? []).map((p) => {
            const row = p as {
              user_id: string;
              username: string | null;
              color: string | null;
            };
            return [
              row.user_id,
              {
                username: String(row.username ?? ""),
                color: String(row.color ?? "#888"),
              },
            ] as const;
          }),
        ),
      );
    }

    void loadPlayers();
    const id = window.setInterval(() => void loadPlayers(), 12_000);
    return () => clearInterval(id);
  }, [roomId]);

  const btnMono =
    "[font-family:var(--font-jetbrains-mono),monospace] text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300 ease-in-out";

  const unanimousName = useMemo(() => {
    if (!unanimousSuspect) return "—";
    return suspects.find((s) => s.id === unanimousSuspect)?.name ?? "—";
  }, [unanimousSuspect, suspects]);

  const votedCount = Object.keys(votes).length;

  if (votesLoading) {
    return (
      <p
        className={`${btnMono} mb-6 text-[var(--kraft)]`}
        style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
      >
        Oylar yükleniyor…
      </p>
    );
  }

  return (
    <div className="coop-voting-overlay mb-8">
      <div className="cozum-callout-warn mb-6">
        ⚠ Co-op oylama — Tüm analistler aynı şüpheliyi seçmeli.
      </div>

      <div className="suspect-grid">
        {suspects.map((s) => {
          const votersHere = Object.entries(votes).filter(
            ([, sid]) => sid === s.id,
          );
          const myPick = myVote === s.id;
          return (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              className={`suspect-card relative${myPick ? " suspect-card--vote-selected" : ""}`}
              style={
                myPick
                  ? {
                      boxShadow:
                        "0 0 0 2px var(--bordeaux), 0 0 18px rgba(107,22,32,0.35)",
                    }
                  : undefined
              }
              onClick={() => void castVote(s.id).catch(console.error)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  void castVote(s.id).catch(console.error);
                }
              }}
            >
              {myPick ? (
                <span
                  className="absolute left-3 top-3 rounded px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--paper)]"
                  style={{ background: "var(--bordeaux)" }}
                >
                  OYUM
                </span>
              ) : null}
              <div className="suspect-id">{s.code ?? s.id}</div>
              <h3 className="suspect-name">{s.name}</h3>
              <div className="suspect-role">{s.role}</div>
              {votersHere.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--rule)] pt-3">
                  {votersHere.map(([uid]) => {
                    if (uid === userId) return null;
                    const info = playerDir.get(uid);
                    const label = info?.username?.trim() || "Analist";
                    return (
                      <span
                        key={uid}
                        title={label}
                        className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] text-[var(--kraft-light)]"
                        style={{
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                        }}
                      >
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold text-[var(--ink)]"
                          style={{
                            background: info?.color || "var(--gold)",
                          }}
                        >
                          {label.slice(0, 1).toUpperCase()}
                        </span>
                        {label}
                      </span>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        className="mb-4 rounded-sm border px-4 py-3"
        style={{
          background: "var(--ink)",
          borderColor: "var(--bordeaux)",
        }}
      >
        <p
          className="m-0 text-[10px] uppercase tracking-[0.18em] text-[var(--paper)]"
          style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
        >
          {votedCount}/{playerCount} analist oy verdi
        </p>
      </div>

      {status === "all_voted_agree" && unanimousSuspect ? (
        <div
          className="mb-4 rounded-sm border px-4 py-3"
          style={{
            background: "rgba(46, 90, 64, 0.35)",
            borderColor: "var(--bordeaux)",
          }}
        >
          <p
            className="m-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--paper)]"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            ✓ Oy birliği — {unanimousName}
          </p>
        </div>
      ) : null}

      {status === "all_voted_disagree" ? (
        <div
          className="mb-4 rounded-sm border px-4 py-3"
          style={{
            background: "rgba(107, 22, 32, 0.25)",
            borderColor: "var(--bordeaux)",
          }}
        >
          <p
            className="m-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--paper)]"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            ✗ Anlaşılamadı — oyları değiştirin
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 pb-6">
        {status === "all_voted_agree" && unanimousSuspect ? (
          <button
            type="button"
            className={`${btnMono} animate-pulse border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)]`}
            onClick={() => onVoteComplete(unanimousSuspect)}
          >
            ▸ ZARFI AÇ
          </button>
        ) : null}

        {status === "all_voted_disagree" &&
        hostBypassEnabled &&
        isHost &&
        myVote ? (
          <button
            type="button"
            className={`${btnMono} border border-[var(--gold)] bg-[var(--anthracite)] py-4 text-[var(--gold)] hover:border-[var(--bordeaux-bright)]`}
            onClick={() => onVoteComplete(myVote)}
          >
            ▸ Yine de Aç (Host)
          </button>
        ) : null}
      </div>
    </div>
  );
}
