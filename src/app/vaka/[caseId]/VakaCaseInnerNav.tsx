"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { leaveRoom, terminateCase } from "@/app/oda/actions";
import type { CaseData } from "@/lib/case-types";
import {
  caseTabHref,
  orderedEnabledTabs,
  TAB_LABEL,
} from "@/lib/case-tab-routes";
import { sectionNumForTab } from "@/lib/case-section-utils";
import ConfirmModal from "@/components/ConfirmModal";
import { clearActiveSession, getActiveSession } from "@/lib/active-session";
import { createClient } from "@/lib/supabase/client";

export function VakaCaseInnerNav({
  caseId,
  caseData,
}: {
  caseId: string;
  caseData: CaseData;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room");

  const tabs = orderedEnabledTabs(caseData.enabledTabs);
  const codenameUpper = caseData.codename.toLocaleUpperCase("tr-TR");

  const [isHost, setIsHost] = useState(false);
  const [navExitOpen, setNavExitOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [soloExitOpen, setSoloExitOpen] = useState(false);
  const [exitIsCoop, setExitIsCoop] = useState(false);
  const [coopActionBusy, setCoopActionBusy] = useState(false);
  const [terminateModalOpen, setTerminateModalOpen] = useState(false);

  useEffect(() => {
    if (!roomId) {
      setIsHost(false);
      return;
    }

    async function checkHost() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: room } = await supabase
        .from("rooms")
        .select("host_user_id")
        .eq("id", roomId)
        .single();

      if (room) setIsHost(room.host_user_id === user.id);
    }

    void checkHost();
  }, [roomId]);

  function handleBackDavalarClick(e: React.MouseEvent) {
    e.preventDefault();
    setExitIsCoop(getActiveSession()?.mode === "coop");
    setNavExitOpen(true);
  }

  function confirmNavExit() {
    router.push("/davalar");
  }

  async function confirmLeaveRoom() {
    if (!roomId || coopActionBusy) return;
    setCoopActionBusy(true);
    try {
      const result = await leaveRoom(roomId);
      if (result && "error" in result && result.error) {
        // eslint-disable-next-line no-console
        console.error("Leave error:", result.error);
        setCoopActionBusy(false);
        return;
      }
      clearActiveSession();
      window.dispatchEvent(new Event("dakt-session-change"));
      setLeaveModalOpen(false);
      router.push("/davalar");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Leave failed:", err);
      setCoopActionBusy(false);
    }
  }

  async function confirmTerminateCase() {
    if (!roomId || coopActionBusy) return;
    setCoopActionBusy(true);
    try {
      const result = await terminateCase(roomId);
      if (result && "error" in result && result.error) {
        // eslint-disable-next-line no-console
        console.error("Terminate error:", result.error);
        setCoopActionBusy(false);
        return;
      }
      if (
        result &&
        "success" in result &&
        result.success === true &&
        "code" in result &&
        result.code
      ) {
        clearActiveSession();
        window.dispatchEvent(new Event("dakt-session-change"));
        setTerminateModalOpen(false);
        router.push(`/oda/${result.code}/sonlandirildi`);
        return;
      }
      setCoopActionBusy(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Terminate failed:", err);
      setCoopActionBusy(false);
    }
  }

  function confirmSoloExit() {
    clearActiveSession();
    window.dispatchEvent(new Event("dakt-session-change"));
    router.push("/davalar");
  }

  return (
    <>
      <nav className="vaka-case-strip" aria-label="Vaka gezinmesi ve sekmeler">
        <div className="vaka-case-strip-inner">
          <div className="vaka-case-strip-head">
            <Link
              href="/davalar"
              onClick={handleBackDavalarClick}
              className="vaka-case-strip-back"
            >
              ← DAVALAR
            </Link>
            <p className="vaka-case-strip-id">
              <span className="vaka-case-strip-id-text">
                VAKA №{caseId}
                <span className="vaka-case-strip-id-codename">
                  {" "}
                  · {codenameUpper}
                </span>
              </span>
            </p>
            <div className="vaka-case-strip-head-actions">
              {roomId ? (
                <div className="case-nav-coop-actions">
                  {isHost ? (
                    <button
                      type="button"
                      onClick={() => setTerminateModalOpen(true)}
                      disabled={coopActionBusy}
                      className="case-nav-terminate"
                      title="Vakayı tüm oyuncular için sonlandır"
                    >
                      {coopActionBusy ? "…" : "⊗ VAKAYI SONLANDIR"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLeaveModalOpen(true)}
                      disabled={coopActionBusy}
                      className="case-nav-leave"
                    >
                      {coopActionBusy ? "AYRILIYOR…" : "◂ VAKADAN AYRIL"}
                    </button>
                  )}
                </div>
              ) : (
                <div className="case-nav-coop-actions">
                  <button
                    type="button"
                    onClick={() => setSoloExitOpen(true)}
                    className="case-nav-leave"
                  >
                    ◂ VAKADAN ÇIK
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="vaka-case-strip-tabs-row">
            <div className="vaka-case-strip-tabs">
              {tabs.map((tab) => {
                const href = caseTabHref(caseId, tab);
                const active = pathname === href;
                const num = sectionNumForTab(caseData, tab);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`nav-item${active ? " active" : ""}`}
                  >
                    <span className="num">{num}</span>
                    {TAB_LABEL[tab]}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <ConfirmModal
        open={navExitOpen}
        onClose={() => setNavExitOpen(false)}
        onConfirm={() => {
          setNavExitOpen(false);
          confirmNavExit();
        }}
        title={
          exitIsCoop ? "Biraz mola mı vereceksin?" : "Vakadan çıkmak istiyor musun?"
        }
        description={
          exitIsCoop
            ? "Vakadan ayrılırsan oda devam eder, kod ile geri katılabilirsin. Yarım kalan oturumun sağ alt köşede görünecek."
            : "Sayfayı terk edersen yarım kalan vakanın görüneceği bir göstergeci sağ altta kalır. Vakaya istediğin zaman dönebilirsin."
        }
        confirmText={exitIsCoop ? "Mola Ver" : "Çık"}
        cancelText="Vakaya Geri Dön"
      />

      <ConfirmModal
        open={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        onConfirm={() => void confirmLeaveRoom()}
        title="Vakadan ayrılıyorsun"
        description="Arkadaşların vakaya devam edecek. İstersen kod ile tekrar katılabilirsin — onlar seni görür ve oturum açıksa otomatik geri alır."
        confirmText="Ayrıl"
        cancelText="İptal"
        variant="danger"
      />

      <ConfirmModal
        open={terminateModalOpen}
        onClose={() => setTerminateModalOpen(false)}
        onConfirm={() => void confirmTerminateCase()}
        title="Vakayı tüm oyuncular için sonlandır"
        description="Bu aksiyon geri alınamaz. Tüm oyuncular sonlandırma sayfasına yönlenir. Oradan tek başına devam edebilir veya çıkabilirler."
        confirmText="Vakayı Sonlandır"
        cancelText="Vazgeç"
        variant="danger"
      />
      <ConfirmModal
        open={soloExitOpen}
        onClose={() => setSoloExitOpen(false)}
        onConfirm={() => {
          setSoloExitOpen(false);
          confirmSoloExit();
        }}
        title="Vakadan çıkılıyor"
        description="Oturumun kapanacak; vakaya dönmek için davalar listesinden yeniden girmen gerekir. Best kaydın korunur."
        confirmText="Çık ve Oturumu Kapat"
        cancelText="İptal"
        variant="danger"
      />
    </>
  );
}
