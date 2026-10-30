"use client";

import { useAuth } from "@/components/AuthProvider";
import {
  DAKT_LOCAL_SOLVED_KEY,
} from "@/lib/local-solved-storage";
import {
  getActiveSession,
  setActiveSession,
  type ActiveSession,
} from "@/lib/active-session";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { runInBackground } from "@/lib/background-task";

function guestLocallySolved(caseId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(DAKT_LOCAL_SOLVED_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return false;
    return parsed.some(
      (x) =>
        x &&
        typeof x === "object" &&
        (x as { case_id?: string }).case_id === caseId,
    );
  } catch {
    return false;
  }
}

interface SessionTrackerProps {
  caseId: string;
  caseName: string;
  username: string;
  /** Kayıtlı kullanıcı: sunucuda bu vaka çözüldü mü (belge turu — oturum yazma) */
  serverMarksSolved?: boolean;
}

export default function SessionTracker({
  caseId,
  caseName,
  username,
  serverMarksSolved,
}: SessionTrackerProps) {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");
  const { user } = useAuth();

  useEffect(() => {
    if (serverMarksSolved) return;
    if (!user && guestLocallySolved(caseId)) return;

    const existing = getActiveSession();

    if (existing && existing.caseId === caseId) {
      if (roomId && existing.mode === "solo") {
        setActiveSession({
          ...existing,
          mode: "coop",
          roomId,
        });
        window.dispatchEvent(new Event("dakt-session-change"));
      }
      return;
    }

    const newSession: ActiveSession = roomId
      ? {
          mode: "coop",
          caseId,
          caseName,
          startedAt: Date.now(),
          username,
          roomId,
        }
      : {
          mode: "solo",
          caseId,
          caseName,
          startedAt: Date.now(),
          username,
        };

    setActiveSession(newSession);
    window.dispatchEvent(new Event("dakt-session-change"));
  }, [caseId, caseName, username, roomId, serverMarksSolved, user]);

  useEffect(() => {
    if (!roomId) return;

    async function enrichCoopSession() {
      const supabase = createClient();
      const { data: room } = await supabase
        .from("rooms")
        .select("code, host_user_id")
        .eq("id", roomId)
        .single();

      if (!room) return;

      const {
        data: { user: u },
      } = await supabase.auth.getUser();

      const session = getActiveSession();
      if (!session || session.caseId !== caseId) return;

      setActiveSession({
        ...session,
        code: room.code as string,
        isHost: u?.id === room.host_user_id,
      });
      window.dispatchEvent(new Event("dakt-session-change"));
    }

    runInBackground(enrichCoopSession, "SessionTracker");
  }, [roomId, caseId]);

  return null;
}
