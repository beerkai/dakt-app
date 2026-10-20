"use client";

import { useMemo, useState } from "react";

import { BottomSheet } from "@/components/BottomSheet";
import { useRoomVoting, type RoomVote } from "@/hooks/useRoomVoting";

const COLOR_FILL: Record<string, string> = {
  mavi: "#4a90d9",
  sari: "#d9c04a",
  yesil: "#5a9f6e",
  mor: "#8b6bb0",
  turuncu: "#d97a4a",
};

export type CoopOverlaySuspect = {
  id: string;
  name: string;
  role: string;
  code?: string;
};

type CoopVotingOverlayProps = {
  roomId: string;
  suspects: CoopOverlaySuspect[];
  activeUserIds: string[];
  userId: string;
  onVoteComplete: (suspectId: string) => void;
  hostBypassEnabled: boolean;
  isHost: boolean;
};

const mono =
  "[font-family:var(--font-jetbrains-mono),monospace] text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300 ease-in-out";

export function CoopVotingOverlay({
  roomId,
  suspects,
  activeUserIds,
  userId,
  onVoteComplete,
  hostBypassEnabled,
  isHost,
}: CoopVotingOverlayProps) {
  const { votes, loading, submitting, submitVote, broadcastFinalize, myVote } =
    useRoomVoting({
      roomId,
      userId,
      activeUserIds,
      onConsensus: onVoteComplete,
    });
  const [sheetOpen, setSheetOpen] = useState(false);

  const tallies = useMemo(() => {
    const m = new Map<string, RoomVote[]>();
    for (const v of votes) {
      const arr = m.get(v.suspect_id) ?? [];
      arr.push(v);
      m.set(v.suspect_id, arr);
    }
    return m;
  }, [votes]);

  const votedName = suspects.find((s) => s.id === myVote)?.name;

  function renderGrid() {
    return (
      <div className="suspect-grid" role="group" aria-label="Şüpheliye oy ver">
        {suspects.map((s) => {
          const sel = myVote === s.id;
          const pile = tallies.get(s.id) ?? [];
          return (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              aria-pressed={sel}
              aria-disabled={submitting}
              aria-label={`${s.name} — ${s.role}. ${pile.length} oy`}
              className={`suspect-card${sel ? " suspect-card--vote-selected" : ""}${submitting ? " opacity-60" : ""}`}
              onClick={() => {
                if (!submitting) void submitVote(s.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!submitting) void submitVote(s.id);
                }
              }}
            >
              {s.code ? <div className="suspect-id">{s.code}</div> : null}
              <h3 className="suspect-name">{s.name}</h3>
              <div className="suspect-role">{s.role}</div>
              {pile.length > 0 ? (
                <div
                  className="mt-3 flex flex-wrap gap-1"
                  aria-label="Bu şüpheliye verilen oylar"
                >
                  {pile.map((v) => (
                    <span
                      key={v.user_id}
                      title={v.username}
                      className="inline-block size-3 rounded-sm border border-[var(--rule)]"
                      style={{
                        backgroundColor:
                          COLOR_FILL[v.user_color] ?? "var(--kraft)",
                      }}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="cozum-callout-warn">
        Co-op oylama — her analist bir şüpheli seçer. Tüm oylar aynı kişide
        birleşince zarf açılır.
        {votes.length > 0 ? (
          <span className="mt-2 block text-[var(--body-text)]">
            Oy veren: {votes.length} / {activeUserIds.length}
          </span>
        ) : null}
      </div>

      {loading && votes.length === 0 ? (
        <div className="coop-vote-skeleton" aria-hidden>
          <div className="skeleton h-24 w-full" />
          <div className="skeleton h-24 w-full" />
        </div>
      ) : (
        <>
          <div className="coop-vote-desktop">{renderGrid()}</div>
          <div className="coop-vote-mobile">
            <button
              type="button"
              className="coop-vote-open"
              onClick={() => setSheetOpen(true)}
            >
              {votedName ? `Oy: ${votedName}` : "Oy ver"}
            </button>
            <BottomSheet
              open={sheetOpen}
              title="Oy ver"
              onClose={() => setSheetOpen(false)}
            >
              {renderGrid()}
            </BottomSheet>
          </div>
        </>
      )}

      {hostBypassEnabled && isHost && myVote ? (
        <div className="mt-8 border border-[var(--kraft-dark)] bg-[var(--anthracite-2)] p-4">
          <p
            className={`${mono} mb-4 text-[var(--kraft-light)]`}
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            Ev sahibi: herkes aynı kişi için anlaşamazsa, seçiminle oylamayı
            bitirebilirsin (diğer analistlerin ekranı da güncellenir).
          </p>
          <button
            type="button"
            disabled={submitting}
            className={`${mono} w-full border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)] disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={() => void broadcastFinalize(myVote)}
          >
            ▸ Seçimimle devam et
          </button>
        </div>
      ) : null}
    </>
  );
}
