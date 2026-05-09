"use client";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type RoomVote = {
  user_id: string;
  username: string;
  user_color: string;
  suspect_id: string;
};

type UseRoomVotingOpts = {
  roomId: string;
  userId: string;
  playerCount: number;
  onConsensus: (suspectId: string) => void;
};

export function useRoomVoting({
  roomId,
  userId,
  playerCount,
  onConsensus,
}: UseRoomVotingOpts) {
  const supabase = useMemo(() => createClient(), []);
  const [votes, setVotes] = useState<RoomVote[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const onConsensusRef = useRef(onConsensus);
  onConsensusRef.current = onConsensus;

  const firedRef = useRef(false);

  const loadVotes = useCallback(async () => {
    const { data, error } = await supabase
      .from("room_votes")
      .select("user_id, username, user_color, suspect_id")
      .eq("room_id", roomId);

    if (!error && data) {
      setVotes(data as RoomVote[]);
    } else if (error) {
      console.warn("[useRoomVoting] load:", error.message);
    }
    setLoading(false);
  }, [roomId, supabase]);

  useEffect(() => {
    firedRef.current = false;
    setLoading(true);
    void loadVotes();

    const channel = supabase
      .channel(`room-votes:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_votes",
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          void loadVotes();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [roomId, supabase, loadVotes]);

  useEffect(() => {
    const ch = supabase
      .channel(`coop-vote-final:${roomId}`)
      .on("broadcast", { event: "finalize" }, ({ payload }) => {
        const sid = (payload as { suspectId?: string })?.suspectId;
        if (!sid || firedRef.current) return;
        firedRef.current = true;
        onConsensusRef.current(sid);
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(ch);
    };
  }, [roomId, supabase]);

  useEffect(() => {
    if (firedRef.current || playerCount < 1) return;
    if (votes.length < playerCount) return;
    const sid = votes[0]?.suspect_id;
    if (!sid || !votes.every((v) => v.suspect_id === sid)) return;
    firedRef.current = true;
    onConsensusRef.current(sid);
  }, [votes, playerCount]);

  const submitVote = useCallback(
    async (suspectId: string) => {
      setSubmitting(true);
      try {
        const { data: me, error: meErr } = await supabase
          .from("room_players")
          .select("username, color")
          .eq("room_id", roomId)
          .eq("user_id", userId)
          .is("left_at", null)
          .maybeSingle();

        if (meErr || !me) {
          console.error("[useRoomVoting] room_players:", meErr);
          return;
        }

        const { error } = await supabase.from("room_votes").upsert(
          {
            room_id: roomId,
            user_id: userId,
            username: me.username as string,
            user_color: me.color as string,
            suspect_id: suspectId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "room_id,user_id" },
        );

        if (error) {
          console.error("[useRoomVoting] upsert:", error);
        } else {
          void loadVotes();
        }
      } finally {
        setSubmitting(false);
      }
    },
    [roomId, userId, supabase, loadVotes],
  );

  const broadcastFinalize = useCallback(
    async (suspectId: string) => {
      const ch = supabase.channel(`coop-vote-final:${roomId}`);
      await new Promise<void>((resolve) => {
        ch.subscribe((status) => {
          if (status === "SUBSCRIBED") resolve();
        });
      });

      await ch.send({
        type: "broadcast",
        event: "finalize",
        payload: { suspectId },
      });

      void supabase.removeChannel(ch);

      if (!firedRef.current) {
        firedRef.current = true;
        onConsensusRef.current(suspectId);
      }
    },
    [roomId, supabase],
  );

  return {
    votes,
    loading,
    submitting,
    submitVote,
    broadcastFinalize,
    myVote: votes.find((v) => v.user_id === userId)?.suspect_id ?? null,
  };
}
