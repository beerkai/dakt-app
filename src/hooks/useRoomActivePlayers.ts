"use client";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type RoomPlayerStrip = { username: string; color: string };

const POLLING_INTERVAL_MS = 8000;

export function useRoomActivePlayers(roomId: string | null) {
  const supabase = useMemo(() => createClient(), []);
  const [players, setPlayers] = useState<RoomPlayerStrip[]>([]);
  const [loading, setLoading] = useState(Boolean(roomId));

  // Stable load function — referans değişmesin
  const cancelledRef = useRef(false);
  const roomIdRef = useRef(roomId);
  roomIdRef.current = roomId;

  const load = useCallback(async (initial: boolean) => {
    const currentRoomId = roomIdRef.current;
    if (!currentRoomId) {
      setPlayers([]);
      if (initial) setLoading(false);
      return;
    }

    if (initial) setLoading(true);

    const { data, error } = await supabase
      .from("room_players")
      .select("username, color")
      .eq("room_id", currentRoomId)
      .is("left_at", null);

    if (cancelledRef.current) return;
    if (currentRoomId !== roomIdRef.current) return; // race condition guard

    if (error) {
      console.warn("[useRoomActivePlayers] fetch error:", error.message);
      // Hata durumunda mevcut state'i KORU, sıfırlama
      if (initial) setLoading(false);
      return;
    }

    setPlayers((data ?? []) as RoomPlayerStrip[]);
    if (initial) setLoading(false);
  }, [supabase]);

  useEffect(() => {
    cancelledRef.current = false;

    if (!roomId) {
      setPlayers([]);
      setLoading(false);
      return;
    }

    // İlk yükleme
    void load(true);

    // KATMAN 1: Real-time subscription
    const channel = supabase
      .channel(`room-presence-vaka:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_players",
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          void load(false);
        },
      )
      .subscribe((status) => {
        // Subscription error veya timeout durumunda log
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          console.warn(`[useRoomActivePlayers] subscription ${status}, polling will recover`);
        }
      });

    // KATMAN 2: Polling fallback (real-time kaçırırsa yakalar)
    const pollInterval = window.setInterval(() => {
      void load(false);
    }, POLLING_INTERVAL_MS);

    // KATMAN 3: Visibility change — sekme aktif olunca hemen refresh
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void load(false);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // KATMAN 4: Window focus — focus alındığında refresh
    function handleFocus() {
      void load(false);
    }
    window.addEventListener("focus", handleFocus);

    return () => {
      cancelledRef.current = true;
      window.clearInterval(pollInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      void supabase.removeChannel(channel);
    };
  }, [roomId, supabase, load]);

  return { players, loading, count: players.length };
}
