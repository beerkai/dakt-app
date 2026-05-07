"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ConfirmModal from "@/components/ConfirmModal";
import * as actions from "../../actions";

interface Props {
  userId: string;
  username: string;
  currentRole: string;
  isTester: boolean;
  isSuspended: boolean;
  solvedCount: number;
  isSelf: boolean;
  isLastAdmin: boolean;
}

export default function AnalystActions({
  userId,
  username,
  currentRole,
  isTester,
  isSuspended,
  solvedCount,
  isSelf,
  isLastAdmin,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  async function handle(
    actionKey: string,
    fn: () => Promise<{ error?: string; redirect?: string } | void>,
  ) {
    setLoading(actionKey);
    try {
      const result = await fn();
      if (result && "error" in result && result.error) {
        alert("Hata: " + result.error);
      } else if (result && "redirect" in result && result.redirect) {
        router.push(result.redirect);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert("Beklenmeyen hata");
    } finally {
      setLoading(null);
      setModal(null);
    }
  }

  return (
    <>
      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h2 className="gm-section-title">İdari Aksiyonlar</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginBottom: 32,
        }}
      >
        <button
          type="button"
          className="gm-button"
          disabled={loading !== null}
          onClick={() =>
            setModal(isTester ? "revoke_tester" : "grant_tester")
          }
        >
          {isTester ? "Tester Rolünü Kaldır" : "Tester Yap"}
        </button>

        <button
          type="button"
          className="gm-button gm-button-accent"
          disabled={
            loading !== null ||
            isSelf ||
            (currentRole === "admin" && isLastAdmin)
          }
          onClick={() =>
            setModal(currentRole === "admin" ? "demote" : "promote")
          }
          title={
            isSelf
              ? "Kendi rolünü değiştiremezsin"
              : currentRole === "admin" && isLastAdmin
                ? "Son yöneticisin, indirilemezsin"
                : ""
          }
        >
          {currentRole === "admin" ? "Yöneticiliği Kaldır" : "Yönetici Yap"}
        </button>

        <button
          type="button"
          className="gm-button"
          disabled={loading !== null}
          onClick={() => {
            setNewUsername(username);
            setUsernameModalOpen(true);
          }}
        >
          Username Değiştir
        </button>

        <button
          type="button"
          className="gm-button gm-button-accent"
          disabled={loading !== null || solvedCount === 0}
          onClick={() => setModal("reset_progress")}
        >
          Tüm Çözümleri Sıfırla ({solvedCount})
        </button>

        <button
          type="button"
          className="gm-button gm-button-danger"
          disabled={loading !== null || currentRole === "admin"}
          onClick={() => setModal(isSuspended ? "unsuspend" : "suspend")}
        >
          {isSuspended ? "Askıyı Kaldır" : "Hesabı Askıya Al"}
        </button>

        <button
          type="button"
          className="gm-button gm-button-danger"
          disabled={loading !== null || currentRole === "admin"}
          onClick={() => setModal("delete")}
        >
          Hesabı Sil (CASCADE)
        </button>
      </div>

      <ConfirmModal
        open={modal === "reset_progress"}
        onClose={() => setModal(null)}
        onConfirm={() =>
          handle("reset_progress", () =>
            actions.resetUserProgress(userId, username),
          )
        }
        title={`@${username} — tüm çözüm kayıtlarını sıfırla?`}
        description="Bu kullanıcının tüm solved_cases kayıtları silinir. Co-op geçmişi etkilenmez. GERİ ALINAMAZ."
        confirmText="Sıfırla"
        cancelText="İptal"
        variant="danger"
      />

      <ConfirmModal
        open={modal === "suspend"}
        onClose={() => setModal(null)}
        onConfirm={() =>
          handle("suspend", () =>
            actions.suspendUser(userId, username, "Yönetim kararı"),
          )
        }
        title={`@${username} — hesabı askıya al?`}
        description="Kullanıcı giriş yapamaz. İstediğin zaman geri alabilirsin."
        confirmText="Askıya Al"
        cancelText="İptal"
        variant="warning"
      />

      <ConfirmModal
        open={modal === "grant_tester"}
        onClose={() => setModal(null)}
        onConfirm={() =>
          handle("grant_tester", () => actions.setTester(userId, true))
        }
        title={`@${username} — Tester rolü ver?`}
        description="Bu kullanıcı 'test' durumundaki vakaları görebilecek ve oynayabilecek. İstediğin zaman geri alabilirsin."
        confirmText="Tester Yap"
        cancelText="İptal"
        variant="default"
      />

      <ConfirmModal
        open={modal === "revoke_tester"}
        onClose={() => setModal(null)}
        onConfirm={() =>
          handle("revoke_tester", () => actions.setTester(userId, false))
        }
        title={`@${username} — Tester rolünü kaldır?`}
        description="Bu kullanıcı artık 'test' durumundaki vakaları göremez. Yayında olan vakalara erişimi devam eder."
        confirmText="Rolü Kaldır"
        cancelText="İptal"
      />

      <ConfirmModal
        open={modal === "promote"}
        onClose={() => setModal(null)}
        onConfirm={() =>
          handle("promote", () =>
            actions.changeUserRole(userId, username, "admin"),
          )
        }
        title={`@${username} — Yönetici yap?`}
        description="Bu kullanıcı tüm Genel Müdürlük yetkilerine sahip olacak: kullanıcı silme, vaka durumu değiştirme, oda sonlandırma. Dikkatli ver."
        confirmText="Yönetici Yap"
        cancelText="İptal"
        variant="warning"
      />

      <ConfirmModal
        open={modal === "demote"}
        onClose={() => setModal(null)}
        onConfirm={() =>
          handle("demote", () =>
            actions.changeUserRole(userId, username, "user"),
          )
        }
        title={`@${username} — Yöneticiliği kaldır?`}
        description="Bu kullanıcı normal analist olacak. Genel Müdürlük'e erişimi sona erecek. Tester rolü varsa korunur."
        confirmText="Yöneticiliği Kaldır"
        cancelText="İptal"
        variant="danger"
      />

      <ConfirmModal
        open={modal === "unsuspend"}
        onClose={() => setModal(null)}
        onConfirm={() =>
          handle("unsuspend", () =>
            actions.unsuspendUser(userId, username),
          )
        }
        title={`@${username} — askıyı kaldır?`}
        description="Kullanıcı tekrar giriş yapabilecek."
        confirmText="Askıyı Kaldır"
      />

      <ConfirmModal
        open={modal === "delete"}
        onClose={() => setModal(null)}
        onConfirm={() =>
          handle("delete", () => actions.deleteUser(userId, username))
        }
        title={`@${username} — hesabı SİL?`}
        description="Bu işlem GERİ ALINAMAZ. Profil + tüm ilişkili kayıtlar ve Supabase Auth kullanıcısı tamamen silinir."
        confirmText="Hesabı Sil"
        cancelText="İptal"
        variant="danger"
      />

      {usernameModalOpen ? (
        <div
          className="confirm-modal-backdrop"
          onClick={() => setUsernameModalOpen(false)}
        >
          <div
            className="confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-modal-corner" />
            <h3 className="confirm-modal-title">Username değiştir</h3>
            <p className="confirm-modal-description">
              Yeni username 2-24 karakter, sadece harf/rakam/alt çizgi.
            </p>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              autoFocus
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid var(--gm-rule)",
                background: "var(--gm-paper-bright)",
                color: "var(--gm-ink)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 13,
                marginBottom: 24,
              }}
            />
            <div className="confirm-modal-actions">
              <button
                type="button"
                onClick={() => setUsernameModalOpen(false)}
                className="confirm-btn confirm-btn-cancel"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={() => {
                  void (async () => {
                    setLoading("change_username");
                    try {
                      const result = await actions.changeUsername(
                        userId,
                        username,
                        newUsername,
                      );
                      if (result?.error) {
                        alert("Hata: " + result.error);
                      } else {
                        setUsernameModalOpen(false);
                        router.refresh();
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Beklenmeyen hata");
                    } finally {
                      setLoading(null);
                    }
                  })();
                }}
                className="confirm-btn confirm-btn-primary"
              >
                Değiştir
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
