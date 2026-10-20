import Link from "next/link";

import { getAllUserEmails } from "@/lib/admin";
import { fetchAllRows } from "@/lib/fetch-all-rows";
import { createClient } from "@/lib/supabase/server";

import GMPageFooter from "../components/GMPageFooter";
import GMPageHeader from "../components/GMPageHeader";
import OdalarMonitor from "./OdalarMonitor";

export const metadata = {
  title: "Aktif Odalar · Genel Müdürlük",
};

export default async function OdalarPage() {
  const supabase = await createClient();

  const rooms = await fetchAllRows<{
    id: string;
    code: string;
    case_id: string;
    host_user_id: string;
    status: string;
    created_at: string;
    started_at: string | null;
  }>((from, to) =>
    supabase
      .from("rooms")
      .select("*")
      .in("status", ["waiting", "playing"])
      .order("created_at", { ascending: false })
      .range(from, to),
  );

  const roomIds = rooms?.map((r) => r.id) ?? [];

  const { data: players } =
    roomIds.length > 0
      ? await supabase
          .from("room_players")
          .select("*")
          .in("room_id", roomIds)
          .is("left_at", null)
      : { data: [] };

  let emailMap = new Map<string, string | null>();
  try {
    emailMap = await getAllUserEmails();
  } catch {
    emailMap = new Map();
  }

  return (
    <>
      <GMPageHeader
        section="E — OPERASYON"
        subject="AKTİF ODA İZLEME"
        reference="05-LIVE"
      />

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h1 className="gm-section-title">
          <span className="gm-live-dot" />
          Bölüm I — Şu An Aktif ({rooms?.length ?? 0})
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Link href="/yonetim/odalar/gecmis" className="gm-topnav-back">
          Geçmiş Odalar →
        </Link>
      </div>

      <p
        style={{
          fontFamily: "var(--font-newsreader), serif",
          fontSize: 12,
          color: "var(--gm-ink-soft)",
          marginBottom: 24,
          lineHeight: 1.7,
        }}
      >
        Liste her 5 saniyede bir tazelenir. &quot;Müdahale&quot; — host gibi
        davranıp odayı sonlandırma yetkisi verir. Sadece kayıt-dışı durumlarda
        kullan.
      </p>

      <OdalarMonitor
        initialRooms={rooms ?? []}
        initialPlayers={players ?? []}
        emailMap={Object.fromEntries(emailMap)}
      />

      <GMPageFooter section="LIVE" page="05" />
    </>
  );
}
