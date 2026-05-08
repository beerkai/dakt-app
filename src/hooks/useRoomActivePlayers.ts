"use client";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type RoomPlayerStrip = { username: string; color: string };

const POLLING_INTERVAL_MS = 10_000;
const CHANNEL_RETRY_MS = 3000;

export function useRoomActivePlayers(roomId: string | null) {
  const supabase = useMemo(() => createClient(), []);
  const [players, setPlayers] = useState<RoomPlayerStrip[]>([]);
  const [loading, setLoading] = useState(Boolean(roomId));

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
    if (currentRoomId !== roomIdRef.current) return;

    if (error) {
      console.warn("[useRoomActivePlayers] fetch error:", error.message);
      if (initial) setLoading(false);
      return;
    }

    setPlayers((data ?? []) as RoomPlayerStrip[]);
    if (initial) setLoading(false);
  }, [supabase]);

  useEffect(() => {
    cancelledRef.current = false;
    let retryTimer: number | undefined;
    let channelGen = 0;
    let activeChannel: ReturnType<typeof supabase.channel> | null = null;

    if (!roomId) {
      setPlayers([]);
      setLoading(false);
      return;
    }

    void load(true);

    function teardownChannel() {
      if (activeChannel) {
        void supabase.removeChannel(activeChannel);
        activeChannel = null;
      }
    }

    function subscribeChannel() {
      if (cancelledRef.current) return;
      if (roomIdRef.current !== roomId) return;

      teardownChannel();
      channelGen += 1;
      const tag = channelGen;

      const ch = supabase
        .channel(`room-presence-vaka:${roomId}:${tag}`)
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
          if (cancelledRef.current) return;
          if (roomIdRef.current !== roomId) return;
          if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            console.warn(
              `[useRoomActivePlayers] subscription ${status}, retry in ${CHANNEL_RETRY_MS / 1000}s`,
            );
            teardownChannel();
            retryTimer = window.setTimeout(
              () => subscribeChannel(),
              CHANNEL_RETRY_MS,
            );
          }
        });
      activeChannel = ch;
    }

    subscribeChannel();

    const pollInterval = window.setInterval(() => {
      void load(false);
    }, POLLING_INTERVAL_MS);

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void load(false);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    function handleFocus() {
      void load(false);
    }
    window.addEventListener("focus", handleFocus);

    return () => {
      cancelledRef.current = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      window.clearInterval(pollInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      teardownChannel();
    };
  }, [roomId, supabase, load]);

  return { players, loading, count: players.length };
}
