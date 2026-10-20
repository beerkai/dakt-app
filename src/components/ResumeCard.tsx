"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import {
  getReturnUrl,
  type ActiveSession,
} from "@/lib/active-session";
import { readLastPlace, type LastPlace } from "@/lib/last-place";

const SESSION_KEY = "dakt_active_session";

let sessionRaw: string | null | undefined;
let sessionCached: ActiveSession | null = null;

function readSession(): ActiveSession | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
  if (raw === sessionRaw) return sessionCached;
  sessionRaw = raw;
  if (!raw) {
    sessionCached = null;
    return null;
  }
  try {
    sessionCached = JSON.parse(raw) as ActiveSession;
  } catch {
    sessionCached = null;
  }
  return sessionCached;
}

function subscribe(onChange: () => void) {
  window.addEventListener("dakt-last-place", onChange);
  window.addEventListener("dakt-session-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("dakt-last-place", onChange);
    window.removeEventListener("dakt-session-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function pick(place: LastPlace | null, session: ActiveSession | null) {
  if (!place && !session) return null;
  const usePlace =
    place &&
    (!session ||
      place.caseId === session.caseId ||
      place.updatedAt >= session.startedAt);
  if (usePlace && place) {
    return {
      kicker: "Kaldığın yer",
      title: `${place.caseId} · ${place.codename.toLocaleUpperCase("tr-TR")}`,
      detail: place.tabLabel,
      href: place.href,
    };
  }
  if (!session) return null;
  return {
    kicker: session.mode === "coop" ? "Açık oda" : "Yarım kalan vaka",
    title: `${session.caseId} · ${session.caseName}`,
    detail: session.code ? `Oda ${session.code}` : "Brief",
    href: getReturnUrl(session),
  };
}

export function ResumeCard() {
  const place = useSyncExternalStore(subscribe, readLastPlace, () => null);
  const session = useSyncExternalStore(subscribe, readSession, () => null);
  const view = pick(place, session);
  if (!view) return null;

  return (
    <Link href={view.href} className="resume-card">
      <span>
        <p className="resume-card-kicker">{view.kicker}</p>
        <p className="resume-card-title">{view.title}</p>
        <p className="resume-card-detail">{view.detail}</p>
      </span>
      <span className="resume-card-go">Devam et</span>
    </Link>
  );
}
