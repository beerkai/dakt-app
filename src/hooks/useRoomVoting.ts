"use client";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type RoomVoteStatus =
  | "waiting"
  | "all_voted_agree"
  | "all_voted_disagree";

export function useRoomVoting({
  roomId,
  userId,
  playerCount,
}: {
  roomId: string;
  userId: string;
  playerCount: number;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const cancelledRef = useRef(false);

  const mergeRows = useCallback(
    (rows: { user_id: string; suspect_id: string }[] | null) => {
      const next: Record<string, string> = {};
      for (const r of rows ?? []) {
        next[r.user_id] = r.suspect_id;
      }
      setVotes(next);
    },
    [],
  );

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("room_votes")
      .select("user_id, suspect_id")
      .eq("room_id", roomId);

    if (cancelledRef.current) return;
    if (error) {
      console.warn("[useRoomVoting]", error.message);
      return;
    }
    mergeRows(data);
  }, [roomId, supabase, mergeRows]);

  useEffect(() => {
    cancelledRef.current = false;
    setLoading(true);

    void (async () => {
      await load();
      if (!cancelledRef.current) setLoading(false);
    })();

    const channel = supabase
      .channel(`votes:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_votes",
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          void load();
        },
      )
      .subscribe();

    return () => {
      cancelledRef.current = true;
      void supabase.removeChannel(channel);
    };
  }, [roomId, supabase, load]);

  const myVote = votes[userId] ?? null;
  const voteCount = Object.keys(votes).length;
  const allVoted = playerCount > 0 && voteCount >= playerCount;
  const values = Object.values(votes);
  const uniqueSuspects = new Set(values);
  const isUnanimous = allVoted && uniqueSuspects.size === 1;
  const unanimousSuspect = isUnanimous ? (values[0] ?? null) : null;

  const status: RoomVoteStatus = !allVoted
    ? "waiting"
    : isUnanimous
      ? "all_voted_agree"
      : "all_voted_disagree";

  const castVote = useCallback(
    async (suspectId: string) => {
      const { error } = await supabase.from("room_votes").upsert(
        {
          room_id: roomId,
          user_id: userId,
          suspect_id: suspectId,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "room_id,user_id" },
      );
      if (error) throw error;
      await load();
    },
    [roomId, userId, supabase, load],
  );

  return {
    votes,
    myVote,
    castVote,
    allVoted,
    isUnanimous,
    unanimousSuspect,
    status,
    loading,
  };
}
