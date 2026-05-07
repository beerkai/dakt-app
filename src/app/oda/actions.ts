"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { AnalystColor } from "@/lib/supabase/types";

// 1. ODA KUR
export async function createRoom(caseId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Oda kurmak için giriş yapmalısın" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, color")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { error: "Profil bulunamadı" };
  }

  let code: string | null = null;
  for (let i = 0; i < 5; i++) {
    const { data: codeResult, error: rpcError } = await supabase.rpc(
      "generate_room_code",
    );
    if (rpcError) {
      return { error: "Oda kodu üretilemedi, tekrar dene" };
    }

    const candidateCode = String(codeResult ?? "").toUpperCase();
    if (!candidateCode) continue;

    const { data: existing } = await supabase
      .from("rooms")
      .select("id")
      .eq("code", candidateCode)
      .in("status", ["waiting", "playing"])
      .maybeSingle();

    if (!existing) {
      code = candidateCode;
      break;
    }
  }

  if (!code) {
    return { error: "Oda kodu üretilemedi, tekrar dene" };
  }

  const { data: room, error: roomError } = await supabase
    .from("rooms")
    .insert({
      code,
      case_id: caseId,
      host_user_id: user.id,
      status: "waiting",
    })
    .select()
    .single();

  if (roomError || !room) {
    return { error: "Oda oluşturulamadı" };
  }

  const { error: playerError } = await supabase.from("room_players").insert({
    room_id: room.id,
    user_id: user.id,
    username: profile.username,
    color: profile.color,
    is_ready: false,
  });

  if (playerError) {
    await supabase.from("rooms").delete().eq("id", room.id);
    return { error: "Oda kuruldu ama host eklenemedi" };
  }

  revalidatePath("/davalar");
  revalidatePath(`/oda/${code}`);
  return { success: true, code };
}

export type JoinRoomResult =
  | { success: true; code: string }
  | { error: string }
  | { requiresGuestSetup: true; code: string }
  | { needsRejoin: true; code: string };

/** Misafir anon oturumu: profil tetikleyicide yoksa veya eksikse tamamla. */
export async function ensureAnonProfile(
  username: string,
  color: AnalystColor,
): Promise<{ success: true } | { error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Oturum bulunamadı" };
  }

  const trimmed = username.trim();
  if (!trimmed) {
    return { error: "Takma ad gerekli" };
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      username: trimmed,
      color,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

// 2. KODA KATIL
export async function joinRoom(code: string): Promise<JoinRoomResult> {
  const supabase = await createClient();

  const normalizedCode = code
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9]/g, "");
  if (normalizedCode.length !== 6) {
    return { error: "6 haneli kod gir" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { requiresGuestSetup: true, code: normalizedCode };
  }

  const { data: room } = await supabase
    .from("rooms")
    .select("*")
    .eq("code", normalizedCode)
    .eq("status", "waiting")
    .maybeSingle();

  if (!room) {
    return { error: "Oda bulunamadı veya başlamış" };
  }

  const { data: myMembership } = await supabase
    .from("room_players")
    .select("left_at")
    .eq("room_id", room.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (myMembership && !myMembership.left_at) {
    return { success: true, code: normalizedCode };
  }

  if (myMembership?.left_at) {
    return { needsRejoin: true, code: normalizedCode };
  }

  const { data: existingPlayers } = await supabase
    .from("room_players")
    .select("user_id, color")
    .eq("room_id", room.id)
    .is("left_at", null);

  if (!existingPlayers) {
    return { error: "Oda bilgileri alınamadı" };
  }

  if (existingPlayers.length >= 5) {
    return { error: "Oda dolu (5/5)" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, color")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { error: "Profil bulunamadı" };
  }

  const usedColors = existingPlayers.map((p) => p.color as AnalystColor);
  let assignedColor: AnalystColor = profile.color;

  if (usedColors.includes(profile.color)) {
    const allColors: AnalystColor[] = [
      "mavi",
      "sari",
      "yesil",
      "mor",
      "turuncu",
    ];
    const available = allColors.filter((c) => !usedColors.includes(c));
    if (available.length === 0) {
      return { error: "Tüm renkler dolu" };
    }
    assignedColor = available[0];
  }

  const { error: joinError } = await supabase.from("room_players").insert({
    room_id: room.id,
    user_id: user.id,
    username: profile.username,
    color: assignedColor,
    is_ready: false,
  });

  if (joinError) {
    return { error: "Odaya katılınamadı" };
  }

  revalidatePath(`/oda/${normalizedCode}`);
  return { success: true, code: normalizedCode };
}

// 3. HAZIR DURUMUNU DEĞİŞTİR
export async function toggleReady(roomId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Giriş yapılmamış" };

  const { data: player } = await supabase
    .from("room_players")
    .select("is_ready")
    .eq("room_id", roomId)
    .eq("user_id", user.id)
    .single();

  if (!player) return { error: "Oyuncu bulunamadı" };

  const { error } = await supabase
    .from("room_players")
    .update({ is_ready: !player.is_ready })
    .eq("room_id", roomId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  return { success: true };
}

// 4. ODADAN AYRIL
export async function leaveRoom(roomId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Giriş yapılmamış" };

  const { error } = await supabase
    .from("room_players")
    .update({ left_at: new Date().toISOString() })
    .eq("room_id", roomId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  const { data: room } = await supabase
    .from("rooms")
    .select("host_user_id, code")
    .eq("id", roomId)
    .single();

  if (room?.host_user_id === user.id) {
    await supabase
      .from("rooms")
      .update({
        status: "archived",
        archived_at: new Date().toISOString(),
      })
      .eq("id", roomId);
  }

  if (room?.code) {
    revalidatePath(`/oda/${room.code}`);
  }
  return { success: true };
}

// 5. VAKAYI BAŞLAT (Sadece host)
export async function startCase(roomId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Giriş yapılmamış" };

  const { data: room } = await supabase
    .from("rooms")
    .select("host_user_id, case_id, status, code")
    .eq("id", roomId)
    .single();

  if (!room) return { error: "Oda bulunamadı" };
  if (room.host_user_id !== user.id) {
    return { error: "Sadece host başlatabilir" };
  }
  if (room.status !== "waiting") {
    return { error: "Oda zaten başlamış" };
  }

  const { data: players } = await supabase
    .from("room_players")
    .select("is_ready")
    .eq("room_id", roomId)
    .is("left_at", null);

  if (!players || players.length === 0) {
    return { error: "Hiç oyuncu yok" };
  }

  const allReady = players.every((p) => p.is_ready);
  if (!allReady) {
    return { error: "Tüm oyuncular hazır olmalı" };
  }

  const { error } = await supabase
    .from("rooms")
    .update({
      status: "playing",
      started_at: new Date().toISOString(),
    })
    .eq("id", roomId);

  if (error) return { error: error.message };

  if (room.code) {
    revalidatePath(`/oda/${room.code}`);
  }
  return {
    success: true as const,
    caseId: room.case_id,
    roomId,
  };
}
