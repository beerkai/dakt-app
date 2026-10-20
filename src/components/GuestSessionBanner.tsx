"use client";

import { useAuth } from "@/components/AuthProvider";
import { DAKT_GUEST_USERNAME_KEY } from "@/lib/guest-session";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GuestSessionBanner() {
  const { user, loading } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (user) return;

    const dismissed = sessionStorage.getItem("dakt_guest_banner_dismissed");
    if (dismissed) return;

    try {
      const guestUsername = localStorage.getItem(DAKT_GUEST_USERNAME_KEY);
      if (!guestUsername?.trim()) return;
    } catch {
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), 1000);
    return () => window.clearTimeout(timer);
  }, [user, loading]);

  function handleDismiss() {
    setVisible(false);
    sessionStorage.setItem("dakt_guest_banner_dismissed", "true");
  }

  if (!visible) return null;

  return (
    <div className="guest-banner">
      <div className="guest-banner-content">
        <div className="guest-banner-icon">◉</div>
        <div className="guest-banner-text">
          <strong>Misafir oturumu</strong>
          <p>
            İlerlemen yalnızca bu tarayıcıda saklanır; Pano notları 24 saat
            sonra silinir. Kalıcı kaydetmek ve co-op için{" "}
            <Link href="/giris" className="guest-banner-link">
              hesap aç
            </Link>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="guest-banner-close"
          aria-label="Kapat"
        >
          ×
        </button>
      </div>
    </div>
  );
}
