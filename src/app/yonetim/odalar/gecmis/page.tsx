import Link from "next/link";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";

import GMPageFooter from "../../components/GMPageFooter";
import GMPageHeader from "../../components/GMPageHeader";

export const metadata: Metadata = {
  title: "Geçmiş Odalar · Genel Müdürlük",
};

interface Room {
  id: string;
  code: string;
  case_id: string;
  host_user_id: string;
  status: string;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  archived_at: string | null;
}

function formatDuration(start: string | null, end: string | null): string {
  if (!start || !end) return "—";
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return `${mins} dk`;
  const hours = Math.floor(mins / 60);
  return `${hours}sa ${mins % 60}dk`;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  solved: { label: "ÇÖZÜLDÜ", color: "var(--gm-stamp-green)" },
  archived: { label: "ARŞİV", color: "var(--gm-meta)" },
  terminated: { label: "SONLANDIRILDI", color: "var(--gm-stamp-red)" },
};

export default async function GecmisOdalarPage() {
  const supabase = await createClient();

  const { data: rooms } = await supabase
    .from("rooms")
    .select("*")
    .in("status", ["solved", "archived", "terminated"])
    .order("finished_at", { ascending: false, nullsFirst: false })
    .limit(100);

  return (
    <>
      <GMPageHeader
        section="E — OPERASYON"
        subject="GEÇMİŞ ODALAR"
        reference="05B-HIST"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 16,
        }}
      >
        <Link href="/yonetim/odalar" className="gm-topnav-back">
          ◂ Aktif Odalar
        </Link>
      </div>

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h1 className="gm-section-title">
          Bölüm I — Son 100 Kapatılan Oda
        </h1>
      </div>

      <p
        style={{
          fontFamily: "var(--font-special-elite), monospace",
          fontSize: 12,
          color: "var(--gm-ink-soft)",
          marginBottom: 24,
          lineHeight: 1.7,
        }}
      >
        Çözülmüş, sonlandırılmış veya arşivlenmiş odalar. Oda kodları
        yeniden kullanılabilir.
      </p>

      {!rooms || rooms.length === 0 ? (
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
            Henüz kapatılmış oda yok.
          </p>
        </div>
      ) : (
        <div className="gm-list">
          {(rooms as Room[]).map((room, idx: number) => {
            const statusInfo = STATUS_LABELS[room.status] ?? {
              label: room.status.toUpperCase(),
              color: "var(--gm-meta)",
            };
            return (
              <div key={room.id} className="gm-list-row">
                <span className="gm-list-index">
                  {String(idx + 1).padStart(3, "0")}.
                </span>
                <span className="gm-list-name">
                  Oda {room.code}
                  <span
                    style={{
                      color: "var(--gm-meta)",
                      marginLeft: 12,
                      fontWeight: 400,
                      fontSize: 11,
                    }}
                  >
                    Vaka {room.case_id}
                  </span>
                </span>
                <span className="gm-list-detail">
                  süre: {formatDuration(room.started_at, room.finished_at)}
                </span>
                <span
                  className="gm-list-meta-box"
                  style={{
                    color: statusInfo.color,
                    borderColor: statusInfo.color,
                  }}
                >
                  {statusInfo.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <GMPageFooter section="HIST" page="05B" />
    </>
  );
}
