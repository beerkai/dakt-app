"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { CaseData } from "@/lib/case-types";
import { createClient } from "@/lib/supabase/client";

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
  caseData: CaseData;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRejoin() {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Giriş gerekli");
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from("room_players")
        .update({ left_at: null })
        .eq("room_id", room.id)
        .eq("user_id", user.id);

      if (updateError) {
        setError(`Tekrar katılım başarısız: ${updateError.message}`);
        setLoading(false);
        return;
      }

      if (room.status === "playing") {
        router.push(`/vaka/${room.case_id}/brief?room=${room.id}`);
      } else if (room.status === "waiting") {
        router.push(`/oda/${room.code}`);
      } else {
        router.push("/davalar?error=archived");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
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
