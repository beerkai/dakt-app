"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useRoomActivePlayers } from "@/hooks/useRoomActivePlayers";
import { createClient } from "@/lib/supabase/client";
import type { Room } from "@/lib/supabase/types";

/** Sadece vaka dosyaları: operasyon şeridi (canlı saat, UTC+3). */
export function SystemBar() {
  const router = useRouter();
  const [parts, setParts] = useState({ h: "--", m: "--", s: "--" });
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const { players, count: activePlayerCount, loading: playersLoading } =
    useRoomActivePlayers(roomId);

  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function tick() {
      const d = new Date();
      setParts({
        h: String(d.getHours()).padStart(2, "0"),
        m: String(d.getMinutes()).padStart(2, "0"),
        s: String(d.getSeconds()).padStart(2, "0"),
      });
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!roomId) {
      setRoomCode(null);
      return;
    }

    const supabase = createClient();
    async function fetchCode() {
      const { data } = await supabase
        .from("rooms")
        .select("code")
        .eq("id", roomId)
        .single();
      if (data?.code) setRoomCode(String(data.code));
    }
    void fetchCode();
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`room-status-bar:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${roomId}`,
        },
        (payload) => {
          const updated = payload.new as Room;
          if (updated.status === "solved") {
            router.push(`/oda/${updated.code}/sonlandirildi`);
            return;
          }
          if (updated.status === "archived") {
            router.push("/davalar?error=archived");
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [roomId, router]);

  function handleCopy() {
    if (!roomCode) return;
    void navigator.clipboard.writeText(roomCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const { h, m, s } = parts;
  const playersTooltip = players.map((p) => p.username).join(", ");

  return (
    <div
      className="system-bar flex items-center justify-end border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.4)] px-4 py-1 md:px-7 md:py-1.5"
      title="D.A.K.T. operasyon merkezine bağlısın"
    >
      <p
        className="m-0 flex flex-wrap items-center justify-end gap-x-1.5 gap-y-0.5 text-[var(--kraft-dark)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] text-[9px] font-medium uppercase leading-none tracking-[0.2em] md:text-[10px]"
      >
        <span className="live-dot mb-px inline-block shrink-0 align-middle" aria-hidden />
        <span>Bağlantı</span>
        <span aria-hidden className="opacity-60">
          ·
        </span>
        <span>Canlı</span>
        <span aria-hidden className="opacity-60">
          ·
        </span>
        <span className="inline md:hidden tabular-nums">
          {h}:{m} UTC+3
        </span>
        <span className="hidden md:inline tabular-nums">
          {h}:{m}:{s} · UTC+3
        </span>
        {roomId && !playersLoading && activePlayerCount > 0 ? (
          <>
            <span aria-hidden className="opacity-60">
              ·
            </span>
            <span
              className="system-bar-analysts inline-flex items-center gap-1"
              title={playersTooltip || undefined}
            >
              <span
                className="live-dot live-dot-green mb-px inline-block shrink-0 align-middle"
                aria-hidden
              />
              <span className="tabular-nums">
                {activePlayerCount} analist çevrimiçi
              </span>
            </span>
          </>
        ) : null}
        {roomCode ? (
          <>
            <span aria-hidden className="opacity-60">
              ·
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="system-bar-room"
              title="Kodu kopyala"
            >
              ODA: {roomCode}
              <span className="system-bar-copy" aria-hidden>
                {copied ? "✓" : "📋"}
              </span>
            </button>
          </>
        ) : null}
      </p>
    </div>
  );
}
