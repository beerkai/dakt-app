"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

interface Props {
  initialActiveRooms: number;
  initialPlaying: number;
  initialWaiting: number;
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
      const { data } = await supabase
        .from("rooms")
        .select("status")
        .in("status", ["waiting", "playing"]);

      if (data) {
        setActive(data.length);
        setPlaying(data.filter((r) => r.status === "playing").length);
        setWaiting(data.filter((r) => r.status === "waiting").length);
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
        {active}
      </div>
      <div className="gm-stat-sub">
        {playing} oynanıyor · {waiting} bekliyor
      </div>
    </div>
  );
}
