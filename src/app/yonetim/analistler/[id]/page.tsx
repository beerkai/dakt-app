import Link from "next/link";
import { notFound } from "next/navigation";

import { getUserEmail } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

import GMPageFooter from "../../components/GMPageFooter";
import GMPageHeader from "../../components/GMPageHeader";
import AnalystActions from "./AnalystActions";

export const metadata = {
  title: "Analist Detay · Genel Müdürlük",
};

export default async function AnalystDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [profileRes, email] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).maybeSingle(),
    getUserEmail(id),
  ]);

  const profile = profileRes.data;

  if (!profile) notFound();

  const { data: solves } = await supabase
    .from("solved_cases")
    .select("*")
    .eq("user_id", id)
    .order("solved_at", { ascending: false });

  return (
    <>
      <GMPageHeader
        section="B — KAYIT"
        subject={`@${profile.username}`}
        reference={`02-${id.slice(0, 8).toUpperCase()}`}
      />

      <div style={{ marginBottom: 16 }}>
        <Link href="/yonetim/analistler" className="gm-topnav-back">
          ◂ Tüm Analistler
        </Link>
      </div>

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h1 className="gm-section-title">@{profile.username}</h1>
      </div>

      <div className="gm-card" style={{ marginBottom: 32 }}>
        <div className="gm-card-corner" />
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "150px 1fr",
            gap: "12px 24px",
            fontSize: 12,
            fontFamily: "var(--font-special-elite), monospace",
          }}
        >
          <dt
            style={{
              color: "var(--gm-meta)",
              letterSpacing: "0.15em",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Rol
          </dt>
          <dd
            style={{
              margin: 0,
              color:
                profile.role === "admin"
                  ? "var(--gm-accent)"
                  : "var(--gm-ink)",
            }}
          >
            {profile.role === "admin" ? "DİREKTÖR" : "ANALİST"}
          </dd>

          <dt
            style={{
              color: "var(--gm-meta)",
              letterSpacing: "0.15em",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Tester
          </dt>
          <dd style={{ margin: 0 }}>
            {profile.is_tester
              ? "Evet — kapalı vaka erişimi var"
              : "Hayır"}
          </dd>

          <dt
            style={{
              color: "var(--gm-meta)",
              letterSpacing: "0.15em",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            E-posta
          </dt>
          <dd
            style={{
              margin: 0,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12,
            }}
          >
            {email ?? (
              <em style={{ color: "var(--gm-meta)" }}>— misafir hesap</em>
            )}
          </dd>

          <dt
            style={{
              color: "var(--gm-meta)",
              letterSpacing: "0.15em",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Renk
          </dt>
          <dd style={{ margin: 0, textTransform: "uppercase" }}>
            {profile.color}
          </dd>

          <dt
            style={{
              color: "var(--gm-meta)",
              letterSpacing: "0.15em",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Kayıt
          </dt>
          <dd style={{ margin: 0 }}>
            {new Date(profile.created_at).toLocaleString("tr-TR")}
          </dd>

          <dt
            style={{
              color: "var(--gm-meta)",
              letterSpacing: "0.15em",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Son Görülme
          </dt>
          <dd style={{ margin: 0 }}>
            {profile.last_seen_at
              ? new Date(profile.last_seen_at).toLocaleString("tr-TR")
              : "Hiç giriş yapmamış"}
          </dd>

          <dt
            style={{
              color: "var(--gm-meta)",
              letterSpacing: "0.15em",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Durum
          </dt>
          <dd
            style={{
              margin: 0,
              color: profile.suspended_at
                ? "var(--gm-stamp-red)"
                : "var(--gm-stamp-green)",
            }}
          >
            {profile.suspended_at
              ? `ASKIDA — ${profile.suspended_reason ?? "Sebep belirtilmemiş"}`
              : "AKTİF"}
          </dd>

          <dt
            style={{
              color: "var(--gm-meta)",
              letterSpacing: "0.15em",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Çözülmüş
          </dt>
          <dd style={{ margin: 0 }}>{solves?.length ?? 0} vaka</dd>
        </dl>
      </div>

      <AnalystActions
        userId={profile.id}
        username={profile.username}
        currentRole={profile.role}
        isTester={!!profile.is_tester}
        isSuspended={!!profile.suspended_at}
        solvedCount={solves?.length ?? 0}
      />

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h2 className="gm-section-title">Çözüm Geçmişi</h2>
      </div>

      {solves && solves.length > 0 ? (
        <div className="gm-list">
          {solves.map((s, idx) => (
            <div key={s.case_id} className="gm-list-row">
              <span className="gm-list-index">
                {String(idx + 1).padStart(2, "0")}.
              </span>
              <span className="gm-list-name">Vaka {s.case_id}</span>
              <span className="gm-list-detail">
                {Math.round(s.accuracy * 100)}% doğruluk · {s.attempt_count}{" "}
                deneme
              </span>
              <span className="gm-list-meta-box">
                {new Date(s.solved_at).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p
          style={{
            fontFamily: "var(--font-special-elite), monospace",
            color: "var(--gm-meta)",
            fontStyle: "italic",
          }}
        >
          Henüz çözüm yok.
        </p>
      )}

      <GMPageFooter section="RANK" page="02" />
    </>
  );
}
