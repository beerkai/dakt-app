"use client";

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
import type { TimelineEvent } from "@/lib/case-types";

function SortableTimelineCard({ evt }: { evt: TimelineEvent }) {
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
      <div
        className="tl-drag-event"
        dangerouslySetInnerHTML={{ __html: evt.event }}
      />
      <div className="tl-drag-source">{evt.source}</div>
    </div>
  );
}

export function TimelineBoardClient({
  events,
  initialOrder,
  sectionNum,
  sectionSub,
}: {
  events: TimelineEvent[];
  initialOrder: string[];
  sectionNum: string;
  sectionSub: string;
}) {
  const [orderedIds, setOrderedIds] = useState<string[]>(() => [
    ...initialOrder,
  ]);

  const byId = useMemo(
    () => new Map(events.map((e) => [e.id, e])),
    [events],
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
        <div className="section-num">{sectionNum}</div>
        <h2 className="section-title">Zaman Çizelgesi</h2>
        <span className="section-sub">{sectionSub}</span>
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
            onClick={() => setOrderedIds([...initialOrder])}
          >
            Düzeni Sıfırla
          </button>
        </div>
      </div>
    </section>
  );
}
