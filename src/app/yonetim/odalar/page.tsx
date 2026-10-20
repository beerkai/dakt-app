import Link from "next/link";

import { getAllUserEmails } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

import GMPageFooter from "../components/GMPageFooter";
import GMPageHeader from "../components/GMPageHeader";
import OdalarMonitor from "./OdalarMonitor";

export const metadata = {
  title: "Aktif Odalar · Genel Müdürlük",
};

export default async function OdalarPage() {
  const supabase = await createClient();

  const { data: rooms } = await supabase
    .from("rooms")
    .select("*")
    .in("status", ["waiting", "playing"])
    .order("created_at", { ascending: false });

  const roomIds = rooms?.map((r) => r.id) ?? [];

  const { data: players } =
    roomIds.length > 0
      ? await supabase
          .from("room_players")
          .select("*")
          .in("room_id", roomIds)
          .is("left_at", null)
      : { data: [] };

  const emailMap = await getAllUserEmails();

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
