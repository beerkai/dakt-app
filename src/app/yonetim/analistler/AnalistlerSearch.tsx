"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface ProfileWithMeta {
  id: string;
  username: string;
  color: string;
  role: string;
  is_tester: boolean;
  last_seen_at: string | null;
  suspended_at: string | null;
  created_at: string;
  email: string | null;
  solvedCount: number;
}

interface Props {
  yoneticiler: ProfileWithMeta[];
  testerlar: ProfileWithMeta[];
  analistler: ProfileWithMeta[];
  emailWarning?: string | null;
}

function isOnline(lastSeen: string | null): boolean {
  if (!lastSeen) return false;
  const diff = Date.now() - new Date(lastSeen).getTime();
  return diff < 5 * 60 * 1000;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

function ProfileRow({
  profile,
  index,
  showAdminBadge = false,
  showTesterBadge = false,
}: {
  profile: ProfileWithMeta;
  index: number;
  showAdminBadge?: boolean;
  showTesterBadge?: boolean;
}) {
  const online = isOnline(profile.last_seen_at);
  const suspended = !!profile.suspended_at;

  return (
    <Link
      href={`/yonetim/analistler/${profile.id}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <div className="gm-list-row">
        <span className="gm-list-index">
          {String(index + 1).padStart(3, "0")}.
        </span>
        <span
          className={`gm-list-name ${showAdminBadge ? "gm-list-name-accent" : ""}`}
        >
          {online && <span className="gm-live-dot" />}@{profile.username}
          {showAdminBadge && <span className="gm-off-record">DİREKTÖR</span>}
          {showTesterBadge && (
            <span
              className="gm-off-record"
              style={{
                color: "var(--gm-stamp-blue)",
                borderColor: "var(--gm-stamp-blue)",
                marginLeft: 4,
              }}
            >
              TEST
            </span>
          )}
          {suspended && (
            <span
              className="gm-off-record"
              style={{
                color: "var(--gm-stamp-red)",
                marginLeft: 4,
              }}
            >
              ASKIDA
            </span>
          )}
        </span>
        <span className="gm-list-detail">
          {profile.email ?? (
            <em style={{ color: "var(--gm-meta)" }}>misafir</em>
          )}
          {" · "}
          {profile.solvedCount} vaka
        </span>
        <span className="gm-list-meta-box">{formatDate(profile.created_at)}</span>
      </div>
    </Link>
  );
}

function EmptySection({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: "20px 24px",
        fontFamily: "var(--font-newsreader), serif",
        fontSize: 12,
        color: "var(--gm-meta)",
        fontStyle: "italic",
        background: "var(--gm-paper-bright)",
        border: "1px dashed var(--gm-rule)",
      }}
    >
      {message}
    </div>
  );
}

export default function AnalistlerSearch({
  yoneticiler,
  testerlar,
  analistler,
  emailWarning,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    function matches(p: ProfileWithMeta): boolean {
      if (!normalizedQuery) return true;
      const username = p.username.toLowerCase();
      const email = (p.email ?? "").toLowerCase();
      return username.includes(normalizedQuery) || email.includes(normalizedQuery);
    }
    return {
      yoneticiler: yoneticiler.filter(matches),
      testerlar: testerlar.filter(matches),
      analistler: analistler.filter(matches),
    };
  }, [query, yoneticiler, testerlar, analistler]);

  const totalAll =
    yoneticiler.length + testerlar.length + analistler.length;
  const totalFiltered =
    filtered.yoneticiler.length +
    filtered.testerlar.length +
    filtered.analistler.length;

  return (
    <>
      {/* Arama */}
      <div style={{ marginBottom: 24 }}>
        {emailWarning ? (
          <p className="gm-alert" role="alert">
            E-postalar okunamadı. Servis anahtarını kontrol et. {emailWarning}
          </p>
        ) : null}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kullanıcı adı veya e-posta"
          className="gm-input"
          aria-label="Analist ara"
        />
        {query ? (
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "var(--gm-meta)",
              marginTop: 8,
              textTransform: "uppercase",
            }}
          >
            {totalFiltered} sonuç / {totalAll} toplam
          </div>
        ) : null}
      </div>

      {/* BÖLÜM I — YÖNETİCİLER */}
      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h2 className="gm-section-title">
          Bölüm I — Yöneticiler ({filtered.yoneticiler.length})
        </h2>
      </div>

      {filtered.yoneticiler.length > 0 ? (
        <div className="gm-list">
          {filtered.yoneticiler.map((p, idx) => (
            <ProfileRow
              key={p.id}
              profile={p}
              index={idx}
              showAdminBadge
              showTesterBadge={p.is_tester}
            />
          ))}
        </div>
      ) : (
        <EmptySection
          message={
            query
              ? "Aramayla eşleşen yönetici yok."
              : "Henüz yönetici tanımlanmamış."
          }
        />
      )}

      {/* BÖLÜM II — TESTER'LAR */}
      <div className="gm-section-heading" style={{ marginTop: 32 }}>
        <span className="gm-section-bar" />
        <h2 className="gm-section-title">
          Bölüm II — Tester&apos;lar ({filtered.testerlar.length})
        </h2>
      </div>

      {filtered.testerlar.length > 0 ? (
        <div className="gm-list">
          {filtered.testerlar.map((p, idx) => (
            <ProfileRow
              key={p.id}
              profile={p}
              index={idx}
              showTesterBadge
            />
          ))}
        </div>
      ) : (
        <EmptySection
          message={
            query
              ? "Aramayla eşleşen tester yok."
              : "Henüz tester yok. Yönetim panelinden bir analiste tester rolü verebilirsin."
          }
        />
      )}

      {/* BÖLÜM III — ANALİSTLER */}
      <div className="gm-section-heading" style={{ marginTop: 32 }}>
        <span className="gm-section-bar" />
        <h2 className="gm-section-title">
          Bölüm III — Analistler ({filtered.analistler.length})
        </h2>
      </div>

      {filtered.analistler.length > 0 ? (
        <div className="gm-list">
          {filtered.analistler.map((p, idx) => (
            <ProfileRow key={p.id} profile={p} index={idx} />
          ))}
        </div>
      ) : (
        <EmptySection
          message={
            query
              ? "Aramayla eşleşen analist yok."
              : "Henüz kayıtlı analist yok."
          }
        />
      )}
    </>
  );
}
