"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/components/AuthProvider";
import { useCaseRoomId } from "@/hooks/useCaseRoomId";
import { createClient } from "@/lib/supabase/client";
import type { PlayerStampKind } from "@/lib/case-types";
import {
  isRoomMarkKind,
  type RoomItemMark,
} from "@/lib/room-item-marks";

type PlayerMe = {
  roomId: string;
  userId: string;
  username: string;
  color: string;
};

type RoomMarksContextValue = {
  roomId: string | null;
  myUserId: string | null;
  marks: RoomItemMark[];
  marksForItem: (itemId: string) => RoomItemMark[];
  myMarkForItem: (itemId: string) => PlayerStampKind | null;
  setMark: (itemId: string, kind: PlayerStampKind | null) => Promise<void>;
};

const RoomMarksContext = createContext<RoomMarksContextValue>({
  roomId: null,
  myUserId: null,
  marks: [],
  marksForItem: () => [],
  myMarkForItem: () => null,
  setMark: async () => {},
});

export function useRoomMarks() {
  return useContext(RoomMarksContext);
}

function parseMarkRows(data: unknown[] | null): RoomItemMark[] {
  const rows: RoomItemMark[] = [];
  for (const raw of data ?? []) {
    const row = raw as Record<string, unknown>;
    const kind = String(row.mark_kind ?? "");
    if (!isRoomMarkKind(kind)) continue;
    rows.push({
      user_id: String(row.user_id),
      item_id: String(row.item_id),
      mark_kind: kind,
      username: String(row.username ?? ""),
      user_color: String(row.user_color ?? ""),
      updated_at: String(row.updated_at ?? ""),
    });
  }
  return rows;
}

export function RoomMarksProvider({
  caseId,
  children,
}: {
  caseId: string;
  children: ReactNode;
}) {
  const roomId = useCaseRoomId(caseId);
  const { user } = useAuth();
  const supabase = useMemo(() => createClient(), []);
  const [marks, setMarks] = useState<RoomItemMark[]>([]);
  const [me, setMe] = useState<PlayerMe | null>(null);

  const fetchMarks = useCallback(
    async (rid: string): Promise<RoomItemMark[] | null> => {
      const { data, error } = await supabase
        .from("room_item_marks")
        .select("user_id, item_id, mark_kind, username, user_color, updated_at")
        .eq("room_id", rid);

      if (error) {
        console.warn("[RoomMarks] load:", error.message);
        return null;
      }
      return parseMarkRows(data);
    },
    [supabase],
  );

  useEffect(() => {
    if (!roomId || !user) return;

    let cancelled = false;

    async function boot() {
      const { data: profile } = await supabase
        .from("room_players")
        .select("username, color")
        .eq("room_id", roomId)
        .eq("user_id", user!.id)
        .is("left_at", null)
        .maybeSingle();

      if (cancelled) return;
      setMe({
        roomId: roomId!,
        userId: user!.id,
        username: String(profile?.username ?? "Analist"),
        color: String(profile?.color ?? ""),
      });

      const rows = await fetchMarks(roomId!);
      if (cancelled || !rows) return;
      setMarks(rows);
    }

    void boot();

    const channel = supabase
      .channel(`room-item-marks:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_item_marks",
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          void (async () => {
            const rows = await fetchMarks(roomId);
            if (cancelled || !rows) return;
            setMarks(rows);
          })();
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [roomId, user, supabase, fetchMarks]);

  const activeMe =
    me && roomId && user && me.roomId === roomId && me.userId === user.id
      ? me
      : null;
  const visibleMarks = useMemo(
    () => (roomId && user ? marks : []),
    [roomId, user, marks],
  );

  const marksForItem = useCallback(
    (itemId: string) => visibleMarks.filter((m) => m.item_id === itemId),
    [visibleMarks],
  );

  const myMarkForItem = useCallback(
    (itemId: string) => {
      if (!user) return null;
      return (
        visibleMarks.find((m) => m.item_id === itemId && m.user_id === user.id)
          ?.mark_kind ?? null
      );
    },
    [visibleMarks, user],
  );

  const setMark = useCallback(
    async (itemId: string, kind: PlayerStampKind | null) => {
      if (!roomId || !activeMe) return;

      setMarks((prev) => {
        const without = prev.filter(
          (m) => !(m.item_id === itemId && m.user_id === activeMe.userId),
        );
        if (!kind) return without;
        return [
          ...without,
          {
            user_id: activeMe.userId,
            item_id: itemId,
            mark_kind: kind,
            username: activeMe.username,
            user_color: activeMe.color,
            updated_at: new Date().toISOString(),
          },
        ];
      });

      if (!kind) {
        const { error } = await supabase
          .from("room_item_marks")
          .delete()
          .eq("room_id", roomId)
          .eq("user_id", activeMe.userId)
          .eq("item_id", itemId);
        if (error) {
          console.error("[RoomMarks] delete:", error.message);
          const rows = await fetchMarks(roomId);
          if (rows) setMarks(rows);
        }
        return;
      }

      const { error } = await supabase.from("room_item_marks").upsert(
        {
          room_id: roomId,
          user_id: activeMe.userId,
          item_id: itemId,
          mark_kind: kind,
          username: activeMe.username,
          user_color: activeMe.color,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "room_id,user_id,item_id" },
      );
      if (error) {
        console.error("[RoomMarks] upsert:", error.message);
        const rows = await fetchMarks(roomId);
        if (rows) setMarks(rows);
      }
    },
    [roomId, activeMe, supabase, fetchMarks],
  );

  const value = useMemo<RoomMarksContextValue>(
    () => ({
      roomId,
      myUserId: user?.id ?? null,
      marks: visibleMarks,
      marksForItem,
      myMarkForItem,
      setMark,
    }),
    [
      roomId,
      user?.id,
      visibleMarks,
      marksForItem,
      myMarkForItem,
      setMark,
    ],
  );

  return (
    <RoomMarksContext.Provider value={value}>
      {children}
    </RoomMarksContext.Provider>
  );
}
