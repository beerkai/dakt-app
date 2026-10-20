"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import { useAuth } from "@/components/AuthProvider";
import { getActiveSession } from "@/lib/active-session";
import { caseTabHref, TAB_LABEL } from "@/lib/case-tab-routes";
import { getCaseTabs, subscribeCaseTabs } from "@/lib/case-tab-store";
import { useCaseRoomId } from "@/hooks/useCaseRoomId";
import type { TabId } from "@/lib/case-types";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

function subscribeSession(onChange: () => void) {
  window.addEventListener("dakt-session-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("dakt-session-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function hideBar(pathname: string) {
  return pathname.startsWith("/yonetim") || pathname.startsWith("/gm");
}

export function AppTabBar() {
  const pathname = usePathname() ?? "/";
  const { user } = useAuth();
  const caseMatch = pathname.match(/^\/vaka\/([^/]+)/);
  const caseId = caseMatch?.[1] ?? null;
  const roomId = useCaseRoomId(caseId ?? undefined);
  const published = useSyncExternalStore(subscribeCaseTabs, getCaseTabs, () => null);
  const sessionCode = useSyncExternalStore(
    subscribeSession,
    () => {
      const session = getActiveSession();
      return session?.mode === "coop" && session.code ? session.code : null;
    },
    () => null,
  );

  if (hideBar(pathname)) return null;

  const tabs: TabId[] = published?.caseId === caseId ? published.tabs : [];

  return (
    <nav
      className="app-tab-bar md:hidden"
      aria-label={caseId ? "Dosya bölümleri" : "Uygulama"}
    >
      {caseId ? (
        <div className="app-tab-bar-scroll">
          {tabs.map((tab) => {
            const href = caseTabHref(caseId!, tab, roomId);
            const active = pathname === `/vaka/${caseId}/${tab}` || pathname.startsWith(`/vaka/${caseId}/${tab}/`);
            return (
              <Link
                key={tab}
                href={href}
                className={`${mono} app-tab${active ? " app-tab-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {TAB_LABEL[tab]}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="app-tab-bar-root">
          <RootTab href="/davalar" label="Davalar" active={pathname.startsWith("/davalar")} />
          <RootTab
            href={sessionCode ? `/oda/${sessionCode}` : "/oda/katil"}
            label="Oda"
            active={pathname.startsWith("/oda")}
          />
          <RootTab
            href={user ? "/profil" : "/giris"}
            label={user ? "Profil" : "Giriş"}
            active={pathname.startsWith("/profil") || pathname.startsWith("/giris")}
          />
        </div>
      )}
    </nav>
  );
}

function RootTab({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${mono} app-tab app-tab-root${active ? " app-tab-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
