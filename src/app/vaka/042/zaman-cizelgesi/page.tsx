"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TimelineEventDef = {
  id: string;
  time: string;
  source: string;
  critical?: boolean;
  body: ReactNode;
};

const TL_CHRONO: TimelineEventDef[] = [
  {
    id: "tl-0",
    time: "18:00",
    source: "SMS · Sinem ifadesi",
    body: (
      <>
        Burak → Sinem: &quot;Bu akşam konuşmamız lazım&quot;
      </>
    ),
  },
  {
    id: "tl-1",
    time: "21:00",
    source: "042-I · Ses kaydı",
    critical: true,
    body: <>Meryem, Burak&apos;a tehdit içerikli sesli mesaj gönderir.</>,
  },
  {
    id: "tl-2",
    time: "21:58",
    source: "GSM",
    body: (
      <>
        Burak&apos;ın telefonu Caferağa 47. Sokak — bina önünde sinyal verir.
      </>
    ),
  },
  {
    id: "tl-3",
    time: "22:06",
    source: "GSM",
    body: (
      <>
        Burak&apos;ın telefonu — <strong>bina içinde</strong>, zayıf sinyal.
      </>
    ),
  },
  {
    id: "tl-4",
    time: "22:14",
    source: "GSM · Adli Tıp",
    critical: true,
    body: <>
      Sinyal kesildi. Cihaz kapatıldı veya darbe ile parazitlendi.
    </>,
  },
  {
    id: "tl-5",
    time: "22:19",
    source: "GSM",
    critical: true,
    body: (
      <>
        WhatsApp &quot;okundu&quot; işareti. <strong>Mesajı kim açtı?</strong>
      </>
    ),
  },
  {
    id: "tl-6",
    time: "22:30 — 00:30",
    source: "042-B",
    body: <>Adli tıp tahmini ölüm zamanı.</>,
  },
  {
    id: "tl-7",
    time: "23:00+",
    source: "İfadeler · ÇELİŞKİ ZONU",
    critical: true,
    body: (
      <>
        Aylin: &quot;Burak kapıyı çaldı, açmadım&quot; · Meryem:
        &quot;4. kat yakınlarında bekledim, Burak&apos;ı gördüm&quot;.
      </>
    ),
  },
  {
    id: "tl-8",
    time: "23:08",
    source: "042-J",
    critical: true,
    body: (
      <>
        Asansör Kat 0 → Kat 4. <strong>Kimse üstlenmiyor.</strong>
      </>
    ),
  },
  {
    id: "tl-9",
    time: "23:17",
    source: "042-J",
    critical: true,
    body: (
      <>
        Asansör Kat 4 → Kat 0. <strong>Adımlar hızlıydı.</strong> Kimse
        üstlenmiyor.
      </>
    ),
  },
  {
    id: "tl-10",
    time: "~24:00",
    source: "Şükrü ifadesi",
    body: (
      <>
        Şükrü kömürlükten çıkar — yukarıdan inen &quot;topuklu, saçları açık
        kadın&quot; karaltı görür.
      </>
    ),
  },
  {
    id: "tl-11",
    time: "00:37",
    source: "GSM",
    body: (
      <>Burak&apos;ın telefonu son sinyali verir — sabit konum.</>
    ),
  },
  {
    id: "tl-12",
    time: "01:00",
    source: "042-D",
    body: <>Emir, Aylin&apos;in evine gelir (taksiyle, şarapla).</>,
  },
  {
    id: "tl-13",
    time: "03:00",
    source: "İfadeler",
    body: <>Emir Aylin&apos;in evinden ayrılır.</>,
  },
  {
    id: "tl-14",
    time: "03:15",
    source: "İfadeler",
    body: <>Emir taksiye biner.</>,
  },
  {
    id: "tl-15",
    time: "03:27 (gerçek)",
    source: "042-H",
    body: (
      <>
        Aylin konteynere siyah poşet bırakır (kamera 02:40 + 47dk).
      </>
    ),
  },
  {
    id: "tl-16",
    time: "04:15",
    source: "042-A",
    body: <>Çöp kamyonu personeli cesedi bulur.</>,
  },
];

/** Sabit karışık başlangıç: kronolojik sıra dışında, her yüklemede aynı. */
const FIXED_SHUFFLE_IDX = [
  16, 0, 8, 4, 12, 2, 15, 6, 10, 13, 1, 9, 7, 3, 11, 14, 5,
] as const;

const INITIAL_ORDERED_IDS = FIXED_SHUFFLE_IDX.map((i) => TL_CHRONO[i]!.id);

function SortableTimelineCard({ evt }: { evt: TimelineEventDef }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: evt.id });

  const tstr = CSS.Transform.toString(transform);
  const scaled =
    !tstr || tstr === "none"
      ? `scale(${isDragging ? 1.022 : 1})`
      : `${tstr} scale(${isDragging ? 1.022 : 1})`;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: scaled, transition }}
      {...listeners}
      {...attributes}
      className={`tl-drag-card${evt.critical ? " critical" : ""}${
        isDragging ? " is-dragging" : ""
      }`}
    >
      <div className="tl-drag-time">{evt.time}</div>
      <div className="tl-drag-event">{evt.body}</div>
      <div className="tl-drag-source">{evt.source}</div>
    </div>
  );
}

export default function ZamanCizelgesiPage() {
  const [orderedIds, setOrderedIds] = useState<string[]>(() => [
    ...INITIAL_ORDERED_IDS,
  ]);

  const byId = useMemo(
    () => new Map(TL_CHRONO.map((e) => [e.id, e])),
    [],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 220, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over !== null && active.id !== over.id) {
      setOrderedIds((ids) => {
        const oldIndex = ids.indexOf(active.id as string);
        const newIndex = ids.indexOf(over.id as string);
        return arrayMove(ids, oldIndex, newIndex);
      });
    }
  }

  return (
    <section id="timeline">
      <div className="section-head">
        <div className="section-num">07</div>
        <h2 className="section-title">Zaman Çizelgesi</h2>
        <span className="section-sub">12-13 Mayıs 2025</span>
      </div>

      <div className="board">
        <p className="timeline-puzzle-hint">
          ▸ Kartları sürükleyerek olayları kronolojik sıraya diz. İpuçlarına
          göre düzenini güncelleyebilirsin.
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={orderedIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="timeline-sortable-wrap">
              {orderedIds.map((id) => {
                const evt = byId.get(id);
                if (!evt) return null;
                return <SortableTimelineCard key={id} evt={evt} />;
              })}
            </div>
          </SortableContext>
        </DndContext>

        <div className="timeline-reset-row">
          <button
            type="button"
            className="timeline-reset-btn"
            onClick={() => setOrderedIds([...INITIAL_ORDERED_IDS])}
          >
            Düzeni Sıfırla
          </button>
        </div>
      </div>
    </section>
  );
}
