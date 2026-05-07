"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  leaveRoom,
  startCase,
  toggleReady,
} from "@/app/oda/actions";
import type { CaseData } from "@/lib/case-types";
import { createClient } from "@/lib/supabase/client";
import type {
  AnalystColor,
  Room,
  RoomPlayer,
} from "@/lib/supabase/types";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-special-elite),monospace]";

const COLOR_FILL: Record<AnalystColor, string> = {
  mavi: "#4a90d9",
  sari: "#d9c04a",
  yesil: "#5a9f6e",
  mor: "#8b6bb0",
  turuncu: "#d97a4a",
};

const COLOR_LABEL: Record<AnalystColor, string> = {
  mavi: "mavi",
  sari: "sarı",
  yesil: "yeşil",
  mor: "mor",
  turuncu: "turuncu",
};

type LobbyClientProps = {
  room: Room;
  caseData: CaseData;
  currentUserId: string;
  initialPlayers: RoomPlayer[];
  colorReassignMessage: string | null;
};

export default function LobbyClient({
  room,
  caseData,
  currentUserId,
  initialPlayers,
  colorReassignMessage,
}: LobbyClientProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [players, setPlayers] = useState<RoomPlayer[]>(initialPlayers);
  const [copied, setCopied] = useState(false);
  const [startBusy, setStartBusy] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const [readyBusy, setReadyBusy] = useState(false);
  const [leaveBusy, setLeaveBusy] = useState(false);
  const [colorNoteVisible, setColorNote] = useState(Boolean(colorReassignMessage));

  useEffect(() => {
    setPlayers(initialPlayers);
  }, [initialPlayers]);

  useEffect(() => {
    if (!colorReassignMessage) return;
    setColorNote(true);
    const t = window.setTimeout(() => setColorNote(false), 10_000);
    return () => window.clearTimeout(t);
  }, [colorReassignMessage]);

  useEffect(() => {
    const channel = supabase
      .channel(`room:${room.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_players",
          filter: `room_id=eq.${room.id}`,
        },
        () => {
          router.refresh();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${room.id}`,
        },
        (payload) => {
          const updated = payload.new as Room;
          if (updated.status === "playing") {
            router.push(
              `/vaka/${updated.case_id}/brief?room=${room.id}`,
            );
            return;
          }
          if (updated.status === "archived" || updated.status === "solved") {
            router.push("/davalar?error=archived");
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [room.id, room.case_id, router, supabase]);

  const hostId = room.host_user_id;
  const isHost = currentUserId === hostId;

  const me = players.find((p) => p.user_id === currentUserId);
  const allReady =
    players.length > 0 && players.every((p) => p.is_ready);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(room.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const handleToggleReady = useCallback(async () => {
    if (readyBusy) return;
    setReadyBusy(true);
    const result = await toggleReady(room.id);
    setReadyBusy(false);
    if (result?.error) {
      setStartError(result.error);
      return;
    }
    router.refresh();
  }, [readyBusy, room.id, router]);

  const handleStart = useCallback(async () => {
    if (startBusy || !allReady) return;
    setStartError(null);
    setStartBusy(true);
    const result = await startCase(room.id);
    setStartBusy(false);
    if (result?.error) {
      setStartError(result.error);
      return;
    }
    if (result?.success && result.caseId) {
      router.push(`/vaka/${result.caseId}/brief?room=${room.id}`);
    }
  }, [allReady, room.id, router, startBusy]);

  const handleLeave = useCallback(async () => {
    if (leaveBusy) return;
    setLeaveBusy(true);
    const result = await leaveRoom(room.id);
    setLeaveBusy(false);
    if (result?.error) {
      setStartError(result.error);
      return;
    }
    router.push("/davalar");
  }, [leaveBusy, room.id, router]);

  const slots: ({ player: RoomPlayer } | null)[] = useMemo(() => {
    const row: ({ player: RoomPlayer } | null)[] = players.map(
      (player) => ({ player }),
    );
    while (row.length < 5) row.push(null);
    return row.slice(0, 5);
  }, [players]);

  return (
    <div className="relative z-[1] mx-auto w-full max-w-[1100px] flex-1 px-5 py-10 md:px-7 md:py-14">
      {colorNoteVisible && colorReassignMessage ? (
        <div
          role="status"
          className={`${mono} mb-8 border border-[var(--kraft-dark)] bg-[var(--anthracite-2)] px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-[var(--kraft)]`}
        >
          {colorReassignMessage}
        </div>
      ) : null}

      <header className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p
            className={`${mono} mb-2 text-[10px] uppercase tracking-[0.35em] text-[var(--kraft)]`}
          >
            VAKA №{caseData.id} · {caseData.codename.toUpperCase()}
          </p>
          <h1 className="text-3xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-4xl">
            Lobi
          </h1>
        </div>

        <div className="flex flex-col gap-3 border border-[var(--kraft-dark)] bg-[var(--anthracite)] p-4 shadow-[var(--shadow)]">
          <p
            className={`${mono} text-[9px] uppercase tracking-[0.28em] text-[var(--meta-label)]`}
          >
            Oda kodu
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`${mono} text-2xl uppercase tracking-[0.4em] text-[var(--kraft)] md:text-3xl`}
            >
              {room.code}
            </span>
            <button
              type="button"
              onClick={() => void copyCode()}
              className={`${mono} border border-[var(--kraft)] bg-transparent px-4 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--anthracite-2)]`}
            >
              {copied ? "Kopyalandı" : "Kopyala"}
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(260px,320px)] lg:gap-12">
        <section>
          <h2
            className={`${mono} mb-4 text-[9px] uppercase tracking-[0.28em] text-[var(--meta-label)]`}
          >
            Oyuncular
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {slots.map((slot, i) => (
              <li
                key={slot?.player?.id ?? `empty-${i}`}
                className={`flex min-h-[88px] items-center gap-4 border px-4 py-3 ${
                  slot
                    ? "border-[var(--kraft-dark)] bg-[var(--anthracite)]"
                    : "border-dashed border-[var(--rule)] bg-[var(--anthracite-2)]/80"
                }`}
              >
                {slot ? (
                  <>
                    <span
                      className="h-8 w-8 shrink-0 rounded-full border border-[var(--kraft-dark)]"
                      style={{
                        backgroundColor: COLOR_FILL[slot.player.color],
                      }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p
                          className={`${mono} truncate text-[11px] uppercase tracking-[0.14em] text-[var(--paper)]`}
                        >
                          {slot.player.username}
                        </p>
                        {slot.player.user_id === hostId ? (
                          <span
                            className={`${mono} shrink-0 text-[8px] uppercase tracking-[0.16em] text-[var(--kraft)]`}
                          >
                            ★ host
                          </span>
                        ) : null}
                      </div>
                      <p
                        className={`${typewriter} mt-1 text-[11px] tracking-[0.06em] ${
                          slot.player.is_ready
                            ? "text-[var(--kraft)]"
                            : "text-[var(--meta-label)]"
                        }`}
                      >
                        {slot.player.is_ready ? "✓ Hazır" : "⊙ Bekleniyor"}
                      </p>
                    </div>
                  </>
                ) : (
                  <p
                    className={`${typewriter} w-full text-center text-[12px] tracking-[0.06em] text-[var(--meta-label)]`}
                  >
                    Bekleniyor…
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <aside className="flex flex-col gap-4 border border-[var(--kraft-dark)] bg-[var(--anthracite)] p-6 shadow-[var(--shadow)]">
          {isHost ? (
            <div className="space-y-3">
              <button
                type="button"
                disabled={startBusy || !allReady}
                onClick={() => void handleStart()}
                className={`${mono} w-full border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)] disabled:cursor-not-allowed disabled:opacity-45`}
              >
                {startBusy ? "Başlatılıyor…" : "Vakayı Başlat"}
              </button>
              {!allReady ? (
                <p
                  className={`${typewriter} text-[11px] leading-relaxed tracking-[0.05em] text-[var(--meta-label)]`}
                >
                  Tüm oyuncular hazır olmalı.
                </p>
              ) : null}
            </div>
          ) : null}

          <button
            type="button"
            disabled={readyBusy || !me}
            onClick={() => void handleToggleReady()}
            className={`${mono} w-full border border-[var(--kraft)] bg-transparent py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--anthracite-2)] disabled:opacity-50`}
          >
            {readyBusy
              ? "…"
              : me?.is_ready
                ? "Hazır Değilim"
                : "Hazırım"}
          </button>

          <button
            type="button"
            disabled={leaveBusy}
            onClick={() => void handleLeave()}
            className={`${mono} w-full border border-[var(--kraft-dark)] bg-transparent py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--kraft)] transition-colors hover:border-[var(--kraft)] hover:text-[var(--kraft-light)]`}
          >
            {leaveBusy ? "Ayrılıyor…" : "Odadan Ayrıl"}
          </button>

          {startError ? (
            <p
              className={`${mono} text-[10px] uppercase tracking-[0.12em] text-[var(--bordeaux-bright)]`}
            >
              {startError}
            </p>
          ) : null}

          <p
            className={`${typewriter} mt-2 text-[10px] leading-relaxed tracking-[0.08em] text-[var(--meta-label)]`}
          >
            Renk:{" "}
            {me
              ? `${COLOR_LABEL[me.color]} · ${me.color}`
              : "—"}
          </p>
        </aside>
      </div>
    </div>
  );
}
