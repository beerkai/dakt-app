import { createClient } from "@/lib/supabase/server";
import { getCase } from "@/lib/case-helpers";
import type { AnalystColor, Room, RoomPlayer } from "@/lib/supabase/types";
import { notFound, redirect } from "next/navigation";

import LobbyClient from "./LobbyClient";

function trAnalystColor(c: AnalystColor): string {
  const m: Record<AnalystColor, string> = {
    mavi: "mavi",
    sari: "sarı",
    yesil: "yeşil",
    mor: "mor",
    turuncu: "turuncu",
  };
  return m[c];
}

export default async function LobiPage({
  params,
}: {
  params: Promise<{ kod: string }>;
}) {
  const { kod } = await params;
  const code = kod.toUpperCase();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/giris");

  const { data: room } = await supabase
    .from("rooms")
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (!room) notFound();

  const roomRow = room as unknown as Room;

  if (room.status === "playing") {
    redirect(`/vaka/${room.case_id}/brief?room=${room.id}`);
  }

  if (room.status === "archived" || room.status === "solved") {
    redirect("/davalar?error=archived");
  }

  const { data: playerInRoom } = await supabase
    .from("room_players")
    .select("id")
    .eq("room_id", room.id)
    .eq("user_id", user.id)
    .is("left_at", null)
    .maybeSingle();

  if (!playerInRoom) {
    redirect("/davalar?error=not-in-room");
  }

  const caseData = getCase(room.case_id);
  if (!caseData) notFound();

  const { data: players } = await supabase
    .from("room_players")
    .select("*")
    .eq("room_id", room.id)
    .is("left_at", null)
    .order("joined_at", { ascending: true });

  const { data: profile } = await supabase
    .from("profiles")
    .select("color")
    .eq("id", user.id)
    .single();

  const { data: mePlayer } = await supabase
    .from("room_players")
    .select("color")
    .eq("room_id", room.id)
    .eq("user_id", user.id)
    .is("left_at", null)
    .single();

  let colorReassignMessage: string | null = null;
  if (
    profile?.color &&
    mePlayer?.color &&
    profile.color !== mePlayer.color
  ) {
    const fromC = profile.color as AnalystColor;
    const toC = mePlayer.color as AnalystColor;
    colorReassignMessage = `Senin rengin (${trAnalystColor(fromC)}) bu odada başkası tarafından kullanılıyor. Sana ${trAnalystColor(toC)} atandı.`;
  }

  return (
    <LobbyClient
      room={roomRow}
      caseData={caseData}
      currentUserId={user.id}
      initialPlayers={(players ?? []) as RoomPlayer[]}
      colorReassignMessage={colorReassignMessage}
    />
  );
}
