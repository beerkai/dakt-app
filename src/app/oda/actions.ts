"use server";

import { revalidatePath } from "next/cache";

import { getCase } from "@/lib/case-helpers";
import { createClient } from "@/lib/supabase/server";
import type { AnalystColor } from "@/lib/supabase/types";

const ANALYST_COLORS: AnalystColor[] = [
  "mavi",
  "sari",
  "yesil",
  "mor",
  "turuncu",
];

const MAX_ROOM_PLAYERS = 5;
const GUEST_USERNAME_MAX = 48;

// 1. ODA KUR
export async function createRoom(caseId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Oda kurmak için giriş yapmalısın" };
  }

  if (!getCase(caseId)) {
    return { error: "Vaka bulunamadı" };
  }

  const { data: caseMeta } = await supabase
    .from("cases_metadata")
    .select("status")
    .eq("case_id", caseId)
    .maybeSingle();
  if (!caseMeta || caseMeta.status === "draft" || caseMeta.status === "archived") {
    return { error: "Bu vaka şu an oynanamıyor" };
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
  | { requiresRejoin: true; code: string };

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
  if (!user.is_anonymous) {
    return { error: "Bu işlem yalnızca misafir oturumları içindir" };
  }

  const trimmed = username.trim();
  if (!trimmed) {
    return { error: "Takma ad gerekli" };
  }
  if (trimmed.length > GUEST_USERNAME_MAX) {
    return { error: `Takma ad en fazla ${GUEST_USERNAME_MAX} karakter olabilir` };
  }
  if (!ANALYST_COLORS.includes(color)) {
    return { error: "Geçersiz renk" };
  }

  const { data: taken } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", trimmed)
    .neq("id", user.id)
    .maybeSingle();
  if (taken) {
    return { error: "Bu takma ad zaten kullanılıyor" };
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
    .maybeSingle();

  if (!room) {
    return { error: "Oda bulunamadı" };
  }

  if (room.status === "archived" || room.status === "solved") {
    return { error: "Bu oda artık aktif değil" };
  }

  const { data: existingPlayer } = await supabase
    .from("room_players")
    .select("*")
    .eq("room_id", room.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingPlayer) {
    if (!existingPlayer.left_at) {
      return { success: true, code: normalizedCode };
    }
    return { requiresRejoin: true, code: normalizedCode };
  }

  if (room.status !== "waiting") {
    return {
      error:
        "Oda zaten başlamış. Daha önce oda üyesi değilsen katılamazsın.",
    };
  }

  const { data: activePlayers } = await supabase
    .from("room_players")
    .select("user_id, color")
    .eq("room_id", room.id)
    .is("left_at", null);

  if (!activePlayers) {
    return { error: "Oda bilgileri alınamadı" };
  }

  if (activePlayers.length >= MAX_ROOM_PLAYERS) {
    return { error: `Oda dolu (${MAX_ROOM_PLAYERS}/${MAX_ROOM_PLAYERS})` };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, color")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { error: "Profil bulunamadı" };
  }

  const usedColors = activePlayers.map((p) => p.color as AnalystColor);
  let assignedColor: AnalystColor = profile.color;

  if (usedColors.includes(profile.color)) {
    const available = ANALYST_COLORS.filter((c) => !usedColors.includes(c));
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
    return { error: `Odaya katılınamadı: ${joinError.message}` };
  }

  // Sayım ile ekleme arasında eşzamanlı katılımlar kapasiteyi aşarsa
  // en son katılan geri çekilir.
  const { data: afterJoin } = await supabase
    .from("room_players")
    .select("user_id, joined_at")
    .eq("room_id", room.id)
    .is("left_at", null)
    .order("joined_at", { ascending: true });
  if (afterJoin && afterJoin.length > MAX_ROOM_PLAYERS) {
    const admitted = afterJoin
      .slice(0, MAX_ROOM_PLAYERS)
      .some((p) => p.user_id === user.id);
    if (!admitted) {
      await supabase
        .from("room_players")
        .delete()
        .eq("room_id", room.id)
        .eq("user_id", user.id);
      return { error: `Oda dolu (${MAX_ROOM_PLAYERS}/${MAX_ROOM_PLAYERS})` };
    }
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
    .is("left_at", null)
    .maybeSingle();

  if (!player) return { error: "Oyuncu bulunamadı" };

  const { error } = await supabase
    .from("room_players")
    .update({ is_ready: !player.is_ready })
    .eq("room_id", roomId)
    .eq("user_id", user.id)
    .is("left_at", null);

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
    .select("host_user_id")
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

  return { success: true };
}

export async function terminateCase(roomId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Giriş yapılmamış" };

  const { data: room } = await supabase
    .from("rooms")
    .select("host_user_id, case_id, status, started_at, code")
    .eq("id", roomId)
    .single();

  if (!room) return { error: "Oda bulunamadı" };
  if (room.host_user_id !== user.id) {
    return { error: "Sadece host vakayı sonlandırabilir" };
  }
  if (room.status !== "playing") {
    return { error: "Bu oda zaten aktif değil" };
  }

  const { error } = await supabase
    .from("rooms")
    .update({
      status: "solved",
      finished_at: new Date().toISOString(),
    })
    .eq("id", roomId);

  if (error) return { error: error.message };

  let durationSeconds = 0;
  if (room.started_at) {
    durationSeconds = Math.floor(
      (Date.now() - new Date(room.started_at).getTime()) / 1000,
    );
  }

  const roomCode = String(room.code ?? "").toUpperCase();
  if (roomCode) {
    revalidatePath(`/oda/${roomCode}`);
  }

  return {
    success: true as const,
    caseId: room.case_id,
    durationSeconds,
    code: roomCode,
  };
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

export type RejoinRoomResult =
  | { success: true; redirect: string }
  | { error: string };

// 6. ODAYA TEKRAR KATIL (daha önce ayrılmış oyuncu)
export async function rejoinRoom(roomId: string): Promise<RejoinRoomResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Giriş gerekli" };

  const { data: room } = await supabase
    .from("rooms")
    .select("id, code, case_id, status")
    .eq("id", roomId)
    .maybeSingle();

  if (!room) return { error: "Oda bulunamadı" };
  if (room.status !== "waiting" && room.status !== "playing") {
    return { success: true, redirect: "/davalar?error=archived" };
  }

  const { data: previous } = await supabase
    .from("room_players")
    .select("left_at")
    .eq("room_id", room.id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!previous) return { error: "Bu odanın üyesi değilsin" };

  if (previous.left_at) {
    const { count } = await supabase
      .from("room_players")
      .select("user_id", { count: "exact", head: true })
      .eq("room_id", room.id)
      .is("left_at", null);
    if ((count ?? 0) >= MAX_ROOM_PLAYERS) {
      return { error: `Oda dolu (${MAX_ROOM_PLAYERS}/${MAX_ROOM_PLAYERS})` };
    }

    const { data: updated, error } = await supabase
      .from("room_players")
      .update({ left_at: null, is_ready: false })
      .eq("room_id", room.id)
      .eq("user_id", user.id)
      .select("user_id");

    if (error) return { error: `Tekrar katılım başarısız: ${error.message}` };
    if (!updated || updated.length === 0) {
      return { error: "Tekrar katılım kaydedilemedi" };
    }
  }

  const code = String(room.code ?? "").toUpperCase();
  revalidatePath(`/oda/${code}`);
  return {
    success: true,
    redirect:
      room.status === "playing"
        ? `/vaka/${room.case_id}/brief?room=${room.id}`
        : `/oda/${code}`,
  };
}
