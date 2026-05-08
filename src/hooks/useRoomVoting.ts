"use client";

import { createClient } from "@/lib/supabase/client";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CoopVoteStatus =
  | "waiting"
  | "all_voted_agree"
  | "all_voted_disagree";

export type UseRoomVotingParams = {
  roomId: string | null;
  userId: string | null;
  playerCount: number;
};

function rowsToVotes(
  rows: { user_id: string; suspect_id: string }[] | null,
): Map<string, string> {
  const m = new Map<string, string>();
  for (const r of rows ?? []) {
    m.set(r.user_id, r.suspect_id);
  }
  return m;
}

export function useRoomVoting({
  roomId,
  userId,
  playerCount,
}: UseRoomVotingParams) {
  const supabase = useMemo(() => createClient(), []);
  const [votes, setVotes] = useState<Map<string, string>>(new Map());

  const cancelledRef = useRef(false);
  const roomIdRef = useRef(roomId);
  roomIdRef.current = roomId;

  const applyRows = useCallback(
    (rows: { user_id: string; suspect_id: string }[] | null) => {
      if (cancelledRef.current) return;
      if (roomIdRef.current !== roomId) return;
      setVotes(rowsToVotes(rows));
    },
    [roomId],
  );

  const load = useCallback(async () => {
    const rid = roomIdRef.current;
    if (!rid) {
      applyRows([]);
      return;
    }
    const { data, error } = await supabase
      .from("room_votes")
      .select("user_id, suspect_id")
      .eq("room_id", rid);

    if (error) {
      console.warn("[useRoomVoting] fetch error:", error.message);
      return;
    }
    applyRows(data);
  }, [supabase, applyRows]);

  useEffect(() => {
    cancelledRef.current = false;
    if (!roomId) {
      setVotes(new Map());
      return;
    }

    void load();

    let retryTimer: number | undefined;
    let channelGen = 0;
    let activeChannel: ReturnType<typeof supabase.channel> | null = null;

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
        .channel(`room-votes:${roomId}:${tag}`)
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
        .subscribe((status) => {
          if (cancelledRef.current) return;
          if (roomIdRef.current !== roomId) return;
          if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            console.warn("[useRoomVoting] subscription issue, retry:", status);
            teardownChannel();
            retryTimer = window.setTimeout(() => subscribeChannel(), 3000);
          }
        });
      activeChannel = ch;
    }

    subscribeChannel();

    return () => {
      cancelledRef.current = true;
      if (retryTimer) window.clearTimeout(retryTimer);
      teardownChannel();
    };
  }, [roomId, supabase, load]);

  const myVote = userId ? (votes.get(userId) ?? null) : null;

  const allVoted =
    playerCount > 0 && votes.size >= playerCount;

  const suspectSet = useMemo(() => new Set(votes.values()), [votes]);
  const isUnanimous = allVoted && suspectSet.size === 1;
  const unanimousSuspect = isUnanimous
    ? [...suspectSet][0] ?? null
    : null;

  const status: CoopVoteStatus = !allVoted
    ? "waiting"
    : isUnanimous
      ? "all_voted_agree"
      : "all_voted_disagree";

  const castVote = useCallback(
    async (suspectId: string) => {
      if (!roomId || !userId) return;
      const { error } = await supabase.from("room_votes").upsert(
        {
          room_id: roomId,
          user_id: userId,
          suspect_id: suspectId,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "room_id,user_id" },
      );
      if (error) {
        console.error("[useRoomVoting] castVote:", error.message);
        throw error;
      }
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
  };
}
