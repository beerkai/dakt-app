import { createClient } from "@/lib/supabase/server";

import GMPageFooter from "../components/GMPageFooter";
import GMPageHeader from "../components/GMPageHeader";

export const metadata = {
  title: "Sicil · Genel Müdürlük",
};

const ACTION_LABELS: Record<string, string> = {
  reset_user_progress: "Tüm Çözümler Sıfırlandı",
  reset_single_case: "Tek Vaka Sıfırlandı",
  suspend_user: "Hesap Askıya Alındı",
  unsuspend_user: "Askı Kaldırıldı",
  delete_user: "Hesap Silindi",
  grant_tester: "Tester Yetkisi Verildi",
  revoke_tester: "Tester Yetkisi Alındı",
  promote_to_admin: "Yönetici Yapıldı",
  demote_from_admin: "Yöneticilik Kaldırıldı",
  change_case_status: "Vaka Durumu Değişti",
  change_username: "Username Değiştirildi",
  admin_terminate_room: "Oda Zorla Sonlandırıldı",
  coop_host_bypass_change: "Co-op oylama kuralı değişti",
};

export default async function SicilPage() {
  const supabase = await createClient();

  const { data: logs } = await supabase
    .from("admin_audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <>
      <GMPageHeader
        section="D — SİCİL"
        subject="İDARİ KAYITLAR"
        reference="04-AUDIT"
      />

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h1 className="gm-section-title">Bölüm I — Son 100 Aksiyon</h1>
      </div>

      {logs && logs.length > 0 ? (
        <div className="gm-list">
          {logs.map((log, idx) => {
            const date = new Date(log.created_at);
            const dateStr = date.toLocaleString("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            const targetDisplay =
              log.target_label ??
              (log.action === "delete_user" && log.target_id
                ? `deleted_user_${String(log.target_id).slice(0, 8)}`
                : null);

            return (
              <div key={log.id} className="gm-list-row">
                <span className="gm-list-index">
                  {String(idx + 1).padStart(3, "0")}.
                </span>
                <span className="gm-list-name">
                  {ACTION_LABELS[log.action] ?? log.action}
                  {targetDisplay && (
                    <span
                      style={{
                        color: "var(--gm-meta)",
                        marginLeft: 12,
                        fontWeight: 400,
                        fontSize: 11,
                      }}
                    >
                      → {targetDisplay}
                    </span>
                  )}
                </span>
                <span className="gm-list-detail">
                  imza: @{log.admin_username ?? "—"}
                </span>
                <span className="gm-list-meta-box">{dateStr}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p
          style={{
            fontFamily: "var(--font-newsreader), serif",
            color: "var(--gm-meta)",
            fontStyle: "italic",
            padding: "24px 0",
          }}
        >
          Henüz idari aksiyon kaydı yok.
        </p>
      )}

      <GMPageFooter section="AUDIT" page="04" />
    </>
  );
}
