"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ConfirmModal from "@/components/ConfirmModal";
import { createClient } from "@/lib/supabase/client";

import { adminTerminateRoom } from "../actions";

interface Room {
  id: string;
  code: string;
  case_id: string;
  host_user_id: string;
  status: string;
  created_at: string;
  started_at: string | null;
}

interface Player {
  room_id: string;
  user_id: string;
  username: string;
  color: string;
  is_ready: boolean;
  joined_at: string;
}

interface Props {
  initialRooms: Room[];
  initialPlayers: Player[];
  emailMap: Record<string, string | null>;
}

export default function OdalarMonitor({
  initialRooms,
  initialPlayers,
  emailMap,
}: Props) {
  const router = useRouter();
  const [rooms, setRooms] = useState(initialRooms);
  const [players, setPlayers] = useState(initialPlayers);
  const [terminateModal, setTerminateModal] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function refetch() {
      const { data: roomsData } = await supabase
        .from("rooms")
        .select("*")
        .in("status", ["waiting", "playing"])
        .order("created_at", { ascending: false });

      const roomIds = roomsData?.map((r) => r.id) ?? [];

      const { data: playersData } =
        roomIds.length > 0
          ? await supabase
              .from("room_players")
              .select("*")
              .in("room_id", roomIds)
              .is("left_at", null)
          : { data: [] };

      setRooms((roomsData ?? []) as Room[]);
      setPlayers((playersData ?? []) as Player[]);
      setLastRefresh(new Date());
    }

    const interval = setInterval(refetch, 5000);

    const channel = supabase
      .channel("admin-rooms-monitor")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        () => {
          void refetch();
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "room_players" },
        () => {
          void refetch();
        },
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      void supabase.removeChannel(channel);
    };
  }, []);

  function getRoomPlayers(roomId: string) {
    return players.filter((p) => p.room_id === roomId);
  }

  async function handleTerminate(roomId: string) {
    setLoading(roomId);
    try {
      const result = await adminTerminateRoom(roomId);
      if (result?.error) {
        alert("Hata: " + result.error);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert("Beklenmeyen hata");
    } finally {
      setLoading(null);
      setTerminateModal(null);
    }
  }

  function formatDuration(startTime: string | null): string {
    if (!startTime) return "—";
    const diffMs = lastRefresh.getTime() - new Date(startTime).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins} dk`;
    const hours = Math.floor(mins / 60);
    return `${hours}sa ${mins % 60}dk`;
  }

  return (
    <>
      <div
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 9,
          letterSpacing: "0.2em",
          color: "var(--gm-meta)",
          marginBottom: 16,
          textTransform: "uppercase",
        }}
      >
        Son tazeleme: {lastRefresh.toLocaleTimeString("tr-TR")} · Otomatik
        5sn
      </div>

      {rooms.length === 0 ? (
        <div className="gm-card">
          <div className="gm-card-corner" />
          <p
            style={{
              fontFamily: "var(--font-special-elite), monospace",
              color: "var(--gm-meta)",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            Şu an aktif oda yok.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {rooms.map((room) => {
            const roomPlayers = getRoomPlayers(room.id);
            const playing = room.status === "playing";

            return (
              <div key={room.id} className="gm-card">
                <div className="gm-card-corner" />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 16,
                    paddingBottom: 12,
                    borderBottom: "1px dashed var(--gm-rule-soft)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: 10,
                        letterSpacing: "0.25em",
                        color: "var(--gm-meta)",
                        textTransform: "uppercase",
                      }}
                    >
                      Oda
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontStyle: "italic",
                        fontSize: 24,
                        color: "var(--gm-ink)",
                        margin: "4px 0",
                      }}
                    >
                      {room.code}{" "}
                      <span style={{ fontSize: 14, color: "var(--gm-meta)" }}>
                        · Vaka {room.case_id}
                      </span>
                    </h3>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span
                      className="gm-list-meta-box"
                      style={{
                        background: playing
                          ? "rgba(90, 122, 74, 0.15)"
                          : "var(--gm-paper)",
                        color: playing
                          ? "var(--gm-stamp-green)"
                          : "var(--gm-meta)",
                        borderColor: playing
                          ? "var(--gm-stamp-green)"
                          : "var(--gm-rule)",
                      }}
                    >
                      {playing ? (
                        <>
                          <span className="gm-live-dot" />
                          OYNANIYOR
                        </>
                      ) : (
                        "BEKLİYOR"
                      )}
                    </span>
                    <div
                      style={{
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: 10,
                        color: "var(--gm-meta)",
                        marginTop: 6,
                        letterSpacing: "0.15em",
                      }}
                    >
                      {playing && room.started_at
                        ? `süre: ${formatDuration(room.started_at)}`
                        : `bekleme: ${formatDuration(room.created_at)}`}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontSize: 9,
                      letterSpacing: "0.25em",
                      color: "var(--gm-meta)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Analistler ({roomPlayers.length}/5)
                  </span>

                  <div style={{ display: "grid", gap: 6 }}>
                    {roomPlayers.map((p) => {
                      const isHost = p.user_id === room.host_user_id;
                      const email = emailMap[p.user_id];
                      return (
                        <div
                          key={`${room.id}-${p.user_id}`}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "20px 1fr 1fr 80px",
                            gap: 12,
                            alignItems: "baseline",
                            fontFamily: "var(--font-jetbrains-mono), monospace",
                            fontSize: 11,
                            padding: "6px 0",
                          }}
                        >
                          <span style={{ color: "var(--gm-accent)" }}>
                            {isHost ? "★" : "·"}
                          </span>
                          <span
                            style={{
                              color: "var(--gm-ink)",
                              fontWeight: isHost ? 600 : 400,
                            }}
                          >
                            @{p.username}
                            {isHost ? (
                              <span
                                style={{
                                  color: "var(--gm-accent)",
                                  marginLeft: 8,
                                  fontSize: 9,
                                  letterSpacing: "0.2em",
                                }}
                              >
                                HOST
                              </span>
                            ) : null}
                          </span>
                          <span
                            style={{
                              color: "var(--gm-meta)",
                              fontFamily: "var(--font-special-elite), monospace",
                              fontSize: 11,
                            }}
                          >
                            {email ?? "misafir"}
                          </span>
                          <span
                            style={{
                              fontSize: 9,
                              letterSpacing: "0.18em",
                              textAlign: "right",
                              color: p.is_ready
                                ? "var(--gm-stamp-green)"
                                : "var(--gm-meta-light)",
                              textTransform: "uppercase",
                            }}
                          >
                            {!playing && (p.is_ready ? "HAZIR" : "BEKLİYOR")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    type="button"
                    className="gm-button gm-button-danger"
                    disabled={loading === room.id}
                    onClick={() => setTerminateModal(room.id)}
                  >
                    ⊗ Odayı Sonlandır
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmModal
        open={terminateModal !== null}
        onClose={() => setTerminateModal(null)}
        onConfirm={() => {
          if (terminateModal) void handleTerminate(terminateModal);
        }}
        title="Odayı zorla sonlandır?"
        description="Tüm oyuncular sonlandırma sayfasına yönlenir. Bu aksiyon GERİ ALINAMAZ. Sadece sorunlu odalar için kullan."
        confirmText="Sonlandır"
        cancelText="İptal"
        variant="danger"
      />
    </>
  );
}
