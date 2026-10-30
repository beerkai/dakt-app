"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type ReactNode } from "react";

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

function Glyph({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <svg
      className="app-tab-icon"
      viewBox="0 0 24 24"
      width="26"
      height="26"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function RootGlyph({
  name,
  active,
}: {
  name: "davalar" | "oda" | "profil" | "giris";
  active: boolean;
}) {
  if (name === "davalar") {
    return (
      <Glyph active={active}>
        <path d="M4 8.2V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9.6a2 2 0 0 0-2-2h-6.2L10 5.5H6a2 2 0 0 0-2 2.7z" />
      </Glyph>
    );
  }
  if (name === "oda") {
    return (
      <Glyph active={active}>
        <circle cx="9" cy="8" r="2.3" />
        <circle cx="16" cy="9" r="1.8" />
        <path d="M4.6 18.4c.6-2.5 2.5-3.9 4.4-3.9s3.8 1.4 4.4 3.9" />
        <path d="M13.8 14.8c.8-.4 1.7-.5 2.6-.4 1.5.2 2.6 1.2 3.1 3" />
      </Glyph>
    );
  }
  if (name === "giris") {
    return (
      <Glyph active={active}>
        <path d="M10 7h7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-7" />
        <path d="M13 12H4" />
        <path d="M7 9l-3 3 3 3" />
      </Glyph>
    );
  }
  return (
    <Glyph active={active}>
      <circle cx="12" cy="8" r="3" />
      <path d="M5.5 19.2c.9-3 3.1-4.5 6.5-4.5s5.6 1.5 6.5 4.5" />
    </Glyph>
  );
}

function CaseGlyph({ tab, active }: { tab: TabId; active: boolean }) {
  switch (tab) {
    case "brief":
      return (
        <Glyph active={active}>
          <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5z" />
          <path d="M14 3.6V8h4.2" />
          <path d="M8.5 12.5h7" />
          <path d="M8.5 16h5" />
        </Glyph>
      );
    case "supheliler":
      return (
        <Glyph active={active}>
          <circle cx="12" cy="8" r="3" />
          <path d="M5.5 19.2c.9-3 3.1-4.5 6.5-4.5s5.6 1.5 6.5 4.5" />
        </Glyph>
      );
    case "ifadeler":
      return (
        <Glyph active={active}>
          <path d="M5 6.5h14v8.5H9.2L5 18.2V6.5z" />
        </Glyph>
      );
    case "adli-tip":
      return (
        <Glyph active={active}>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 8.5v7" />
          <path d="M8.5 12h7" />
        </Glyph>
      );
    case "deliller":
      return (
        <Glyph active={active}>
          <circle cx="11" cy="11" r="5.2" />
          <path d="M15.2 15.2 20 20" />
        </Glyph>
      );
    case "belgeler":
      return (
        <Glyph active={active}>
          <path d="M8 7h9v12H8z" />
          <path d="M6 5h9v12" />
        </Glyph>
      );
    case "teknik":
      return (
        <Glyph active={active}>
          <rect x="7" y="7" width="10" height="10" rx="1.2" />
          <path d="M9.5 4.5v2.5M12 4.5v2.5M14.5 4.5v2.5M9.5 17v2.5M12 17v2.5M14.5 17v2.5M4.5 9.5H7M4.5 12H7M4.5 14.5H7M17 9.5h2.5M17 12h2.5M17 14.5h2.5" />
        </Glyph>
      );
    case "deduction":
      return (
        <Glyph active={active}>
          <rect x="4" y="4" width="16" height="16" rx="1.2" />
          <path d="M4 9h16" />
          <path d="M9 9v11" />
        </Glyph>
      );
    case "cozum":
      return (
        <Glyph active={active}>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M8.6 12.2 11 14.6l4.5-5" />
        </Glyph>
      );
    default:
      return null;
  }
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
            const active =
              pathname === `/vaka/${caseId}/${tab}` ||
              pathname.startsWith(`/vaka/${caseId}/${tab}/`);
            return (
              <Link
                key={tab}
                href={href}
                className={`${mono} app-tab${active ? " app-tab-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <CaseGlyph tab={tab} active={active} />
                <span className="app-tab-label">{TAB_LABEL[tab]}</span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="app-tab-bar-root">
          <RootTab
            href="/davalar"
            label="Davalar"
            icon="davalar"
            active={pathname.startsWith("/davalar")}
          />
          <RootTab
            href={sessionCode ? `/oda/${sessionCode}` : "/oda/katil"}
            label="Oda"
            icon="oda"
            active={pathname.startsWith("/oda")}
          />
          <RootTab
            href={user ? "/profil" : "/giris"}
            label={user ? "Profil" : "Giriş"}
            icon={user ? "profil" : "giris"}
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
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: "davalar" | "oda" | "profil" | "giris";
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${mono} app-tab app-tab-root${active ? " app-tab-active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      <RootGlyph name={icon} active={active} />
      <span className="app-tab-label">{label}</span>
    </Link>
  );
}
