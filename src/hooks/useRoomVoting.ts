"use client";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useMemo, useState } from "react";

export interface RoomVote {
  id: string;
  room_id: string;
  user_id: string;
  username: string;
  user_color: string | null;
  voted_suspect_id: string;
  created_at: string;
  updated_at: string;
}

export interface VotingState {
  votes: RoomVote[];
  myVote: RoomVote | null;
  loading: boolean;
  error: string | null;
}

export function useRoomVoting(roomId: string | null, myUserId: string | null) {
  const supabase = useMemo(() => createClient(), []);
  const [state, setState] = useState<VotingState>({
    votes: [],
    myVote: null,
    loading: !!roomId,
    error: null,
  });

  const fetchVotes = useCallback(async () => {
    if (!roomId) return;

    const { data, error } = await supabase
      .from("room_votes")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (error) {
      setState((s) => ({ ...s, error: error.message, loading: false }));
      return;
    }

    const votes = (data ?? []) as RoomVote[];
    const myVote = votes.find((v) => v.user_id === myUserId) ?? null;

    setState({
      votes,
      myVote,
      loading: false,
      error: null,
    });
  }, [roomId, myUserId, supabase]);

  useEffect(() => {
    if (!roomId) {
      setState({
        votes: [],
        myVote: null,
        loading: false,
        error: null,
      });
      return;
    }
    setState((s) => ({ ...s, loading: true }));
    void fetchVotes();
  }, [roomId, fetchVotes]);

  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room_votes:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_votes",
          filter: `room_id=eq.${roomId}`,
        },
        () => {
          void fetchVotes();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [roomId, fetchVotes, supabase]);

  useEffect(() => {
    if (!roomId) return;
    const interval = window.setInterval(() => {
      void fetchVotes();
    }, 8000);
    return () => window.clearInterval(interval);
  }, [roomId, fetchVotes]);

  useEffect(() => {
    function refetch() {
      void fetchVotes();
    }
    document.addEventListener("visibilitychange", refetch);
    window.addEventListener("focus", refetch);
    return () => {
      document.removeEventListener("visibilitychange", refetch);
      window.removeEventListener("focus", refetch);
    };
  }, [fetchVotes]);

  const castVote = useCallback(
    async (
      suspectId: string,
      username: string,
      color: string | null,
    ) => {
      if (!roomId || !myUserId) return;

      const { error } = await supabase.from("room_votes").upsert(
        {
          room_id: roomId,
          user_id: myUserId,
          username,
          user_color: color,
          voted_suspect_id: suspectId,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "room_id,user_id" },
      );

      if (error) throw error;
      await fetchVotes();
    },
    [roomId, myUserId, supabase, fetchVotes],
  );

  const retractVote = useCallback(async () => {
    if (!roomId || !myUserId) return;

    const { error } = await supabase
      .from("room_votes")
      .delete()
      .eq("room_id", roomId)
      .eq("user_id", myUserId);

    if (error) throw error;
    await fetchVotes();
  }, [roomId, myUserId, supabase, fetchVotes]);

  return {
    ...state,
    castVote,
    retractVote,
    refetch: fetchVotes,
  };
}
