"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

interface Props {
  initialActiveRooms: number | null;
  initialPlaying: number | null;
  initialWaiting: number | null;
}

export default function LiveRoomCount({
  initialActiveRooms,
  initialPlaying,
  initialWaiting,
}: Props) {
  const [active, setActive] = useState(initialActiveRooms);
  const [playing, setPlaying] = useState(initialPlaying);
  const [waiting, setWaiting] = useState(initialWaiting);

  useEffect(() => {
    const supabase = createClient();

    async function refetch() {
      const [all, playingRows, waitingRows] = await Promise.all([
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
      ]);

      if (!all.error && !playingRows.error && !waitingRows.error) {
        setActive(all.count ?? 0);
        setPlaying(playingRows.count ?? 0);
        setWaiting(waitingRows.count ?? 0);
      }
    }

    const channel = supabase
      .channel("admin-dashboard-rooms")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        () => {
          void refetch();
        },
      )
      .subscribe();

    const interval = setInterval(() => void refetch(), 10000);

    return () => {
      clearInterval(interval);
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="gm-stat-card">
      <span className="gm-stat-label">Aktif Oda</span>
      <div className="gm-stat-value">
        <span className="gm-live-dot" />
        {active ?? "—"}
      </div>
      <div className="gm-stat-sub">
        {playing ?? "—"} oynanıyor · {waiting ?? "—"} bekliyor
      </div>
    </div>
  );
}
