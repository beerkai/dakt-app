"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";

export type RoomPlayerStrip = { username: string; color: string };

export function useRoomActivePlayers(roomId: string | null) {
  const supabase = useMemo(() => createClient(), []);
  const [players, setPlayers] = useState<RoomPlayerStrip[]>([]);
  const [loading, setLoading] = useState(Boolean(roomId));

  useEffect(() => {
    if (!roomId) {
      setPlayers([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load(initial: boolean) {
      if (initial) setLoading(true);
      const { data } = await supabase
        .from("room_players")
        .select("username, color")
        .eq("room_id", roomId)
        .is("left_at", null);
      if (!cancelled) {
        setPlayers((data ?? []) as RoomPlayerStrip[]);
        if (initial) setLoading(false);
      }
    }

    void load(true);

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
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [roomId, supabase]);

  return { players, loading, count: players.length };
}
