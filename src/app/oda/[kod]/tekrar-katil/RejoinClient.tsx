"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { CaseIdentity } from "@/lib/case-types";
import { rejoinRoom } from "@/app/oda/actions";

export function RejoinClient({
  room,
  caseData,
}: {
  room: {
    id: string;
    case_id: string;
    code: string;
    status: string;
  };
  caseData: CaseIdentity;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRejoin() {
    setLoading(true);
    setError(null);

    try {
      const result = await rejoinRoom(room.id);
      if ("error" in result) {
        setError(result.error);
        setLoading(false);
        return;
      }
      router.push(result.redirect);
    } catch (err) {
       
      console.error("Rejoin failed:", err);
      setError("Bir hata oluştu");
      setLoading(false);
    }
  }

  const codenameUpper = caseData.codename.toLocaleUpperCase("tr-TR");

  return (
    <div className="rejoin-page">
      <div className="rejoin-card">
        <div className="rejoin-corner" aria-hidden />

        <h1 className="rejoin-title">Bu odadan ayrılmıştın</h1>

        <p className="rejoin-description">
          {codenameUpper} vakasının odası ({room.code}) hâlâ aktif. Tekrar
          katılmak istiyor musun?
        </p>

        {error ? <p className="rejoin-error">{error}</p> : null}

        <div className="rejoin-actions">
          <button
            type="button"
            onClick={() => router.push("/davalar")}
            className="confirm-btn confirm-btn-cancel"
          >
            Hayır, Davalara Dön
          </button>
          <button
            type="button"
            onClick={() => void handleRejoin()}
            disabled={loading}
            className="confirm-btn confirm-btn-primary"
          >
            {loading ? "Katılıyor..." : "Tekrar Katıl"}
          </button>
        </div>
      </div>
    </div>
  );
}
