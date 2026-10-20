"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
} from "react";

import { useAuth } from "@/components/AuthProvider";
import { useCaseRoomId } from "@/hooks/useCaseRoomId";
import { caseTabHref } from "@/lib/case-tab-routes";
import { safeHtml } from "@/lib/html-sanitize";
import { createClient } from "@/lib/supabase/client";
import type { TimelineCard } from "@/lib/timeline-cards";
import {
  readSoloTimeline,
  writeSoloTimeline,
} from "@/lib/timeline-storage";

import { checkTimelineOrder } from "./actions";

function reorder(ids: string[], from: number, to: number): string[] {
  if (from === to || from < 0 || to < 0 || from >= ids.length || to >= ids.length) {
    return ids;
  }
  const next = [...ids];
  const [item] = next.splice(from, 1);
  if (!item) return ids;
  next.splice(to, 0, item);
  return next;
}

export function TimelineBoardClient({
  caseId,
  initialCards,
  sectionHint,
}: {
  caseId: string;
  initialCards: TimelineCard[];
  sectionHint: string;
}) {
  const roomId = useCaseRoomId(caseId);
  const { user } = useAuth();
  const supabase = useMemo(() => createClient(), []);
  const byId = useMemo(() => {
    const m = new Map<string, TimelineCard>();
    for (const c of initialCards) m.set(c.id, c);
    return m;
  }, [initialCards]);
  const seedOrder = useMemo(
    () => initialCards.map((c) => c.id),
    [initialCards],
  );

  const [order, setOrder] = useState<string[]>(seedOrder);
  const [settled, setSettled] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [checking, setChecking] = useState(false);
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "ok">("idle");
  const [error, setError] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const persistRoomTimer = useRef<number | null>(null);
  const skipRoomEcho = useRef(false);

  const applyOrder = useCallback(
    (next: string[], opts?: { persistSolo?: boolean; persistRoom?: boolean }) => {
      setOrder(next);
      if (settled) return;
      if (opts?.persistSolo !== false && !roomId) {
        writeSoloTimeline(caseId, { order: next, settled: false });
      }
      if (opts?.persistRoom && roomId && user) {
        if (persistRoomTimer.current) {
          window.clearTimeout(persistRoomTimer.current);
        }
        persistRoomTimer.current = window.setTimeout(() => {
          skipRoomEcho.current = true;
          void supabase
            .from("room_timeline")
            .upsert(
              {
                room_id: roomId,
                event_order: next,
                settled: false,
                updated_by: user.id,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "room_id" },
            )
            .then(({ error: err }) => {
              if (err) console.warn("[Timeline] room upsert:", err.message);
            });
        }, 280);
      }
    },
    [caseId, roomId, settled, supabase, user],
  );

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      if (roomId) {
        const { data, error: err } = await supabase
          .from("room_timeline")
          .select("event_order, settled")
          .eq("room_id", roomId)
          .maybeSingle();
        if (cancelled) return;
        if (err) console.warn("[Timeline] load:", err.message);
        if (data?.event_order?.length) {
          const ids = (data.event_order as string[]).filter((id) =>
            byId.has(id),
          );
          const missing = seedOrder.filter((id) => !ids.includes(id));
          setOrder([...ids, ...missing]);
          setSettled(data.settled === true);
          setFeedback(data.settled ? "ok" : "idle");
        } else {
          setOrder(seedOrder);
          setSettled(false);
          if (user) {
            void supabase.from("room_timeline").upsert(
              {
                room_id: roomId,
                event_order: seedOrder,
                settled: false,
                updated_by: user.id,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "room_id" },
            );
          }
        }
      } else {
        const solo = readSoloTimeline(caseId);
        if (solo?.order?.length) {
          const ids = solo.order.filter((id) => byId.has(id));
          const missing = seedOrder.filter((id) => !ids.includes(id));
          setOrder([...ids, ...missing]);
          setSettled(solo.settled);
          setFeedback(solo.settled ? "ok" : "idle");
        } else {
          setOrder(seedOrder);
          setSettled(false);
        }
      }
      if (!cancelled) setHydrated(true);
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [caseId, roomId, seedOrder, byId, supabase, user]);

  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room-timeline:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_timeline",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          if (skipRoomEcho.current) {
            skipRoomEcho.current = false;
            return;
          }
          const row = payload.new as {
            event_order?: string[];
            settled?: boolean;
          } | null;
          if (!row?.event_order) return;
          const ids = row.event_order.filter((id) => byId.has(id));
          const missing = seedOrder.filter((id) => !ids.includes(id));
          setOrder([...ids, ...missing]);
          if (row.settled) {
            setSettled(true);
            setFeedback("ok");
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [roomId, supabase, byId, seedOrder]);

  useEffect(() => {
    return () => {
      if (persistRoomTimer.current) {
        window.clearTimeout(persistRoomTimer.current);
      }
    };
  }, []);

  const move = useCallback(
    (index: number, delta: number) => {
      if (settled) return;
      const to = index + delta;
      const next = reorder(order, index, to);
      if (next === order) return;
      setFeedback("idle");
      setError(null);
      applyOrder(next, { persistRoom: Boolean(roomId) });
    },
    [applyOrder, order, roomId, settled],
  );

  function onDragStart(id: string) {
    if (settled) return;
    setDragId(id);
  }

  function onDragOver(e: DragEvent, overId: string) {
    e.preventDefault();
    if (!dragId || dragId === overId || settled) return;
  }

  function onDrop(overId: string) {
    if (!dragId || settled) return;
    const from = order.indexOf(dragId);
    const to = order.indexOf(overId);
    setDragId(null);
    if (from < 0 || to < 0 || from === to) return;
    const next = reorder(order, from, to);
    setFeedback("idle");
    setError(null);
    applyOrder(next, { persistRoom: Boolean(roomId) });
  }

  async function handleCheck() {
    if (settled || checking) return;
    setChecking(true);
    setError(null);
    try {
      const result = await checkTimelineOrder(caseId, order, roomId);
      if ("error" in result) {
        setError(result.error);
        setFeedback("idle");
        return;
      }
      if (result.correct) {
        setSettled(true);
        setFeedback("ok");
        if (!roomId) {
          writeSoloTimeline(caseId, { order, settled: true });
        }
      } else {
        setFeedback("wrong");
      }
    } finally {
      setChecking(false);
    }
  }

  const cards = order
    .map((id) => byId.get(id))
    .filter((c): c is TimelineCard => Boolean(c));

  return (
    <div
      className={`timeline-board${settled ? " timeline-board--settled" : ""}${
        feedback === "wrong" ? " timeline-board--wrong" : ""
      }`}
    >
      <p className="timeline-board-hint">{sectionHint}</p>
      {roomId ? (
        <p className="timeline-board-room">
          Ortak saat — odadaki herkes aynı düzeni görür.
        </p>
      ) : null}

      {!hydrated ? (
        <p className="timeline-board-loading">Kartlar yükleniyor…</p>
      ) : (
        <ol className="timeline-list" aria-label="Olay kartları">
          {cards.map((card, index) => (
            <li
              key={card.id}
              className={`timeline-card${
                card.critical ? " timeline-card--critical" : ""
              }${dragId === card.id ? " timeline-card--dragging" : ""}`}
              draggable={!settled}
              onDragStart={() => onDragStart(card.id)}
              onDragOver={(e) => onDragOver(e, card.id)}
              onDrop={() => onDrop(card.id)}
              onDragEnd={() => setDragId(null)}
            >
              <div className="timeline-card-index" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="timeline-card-body">
                <div className="timeline-card-meta">
                  <span className="timeline-card-time">{card.time}</span>
                  <span className="timeline-card-source">{card.source}</span>
                  {card.critical ? (
                    <span className="timeline-card-flag">Kritik</span>
                  ) : null}
                </div>
                <div
                  className="timeline-card-event"
                  dangerouslySetInnerHTML={safeHtml(card.event)}
                />
              </div>
              {!settled ? (
                <div className="timeline-card-moves">
                  <button
                    type="button"
                    className="timeline-move-btn"
                    aria-label="Yukarı taşı"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="timeline-move-btn"
                    aria-label="Aşağı taşı"
                    disabled={index === cards.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    ↓
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      )}

      <div className="timeline-board-actions">
        {settled ? (
          <>
            <p className="timeline-board-ok" role="status">
              Kronoloji oturdu. Faili seçebilirsiniz.
            </p>
            <Link
              href={caseTabHref(caseId, "cozum", roomId)}
              className="timeline-board-cta"
            >
              Çözüme geç
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="timeline-board-cta"
              disabled={!hydrated || checking}
              onClick={() => void handleCheck()}
            >
              {checking ? "Kontrol…" : "Saati kilitle"}
            </button>
            {feedback === "wrong" ? (
              <p className="timeline-board-wrong-msg" role="status">
                Sıra henüz oturmadı. Kartları yeniden dene.
              </p>
            ) : null}
            {error ? (
              <p className="timeline-board-wrong-msg" role="alert">
                {error}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
