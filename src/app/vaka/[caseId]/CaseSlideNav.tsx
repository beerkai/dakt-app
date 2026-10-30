"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import type { TabId } from "@/lib/case-types";
import { adjacentTabs, caseTabHref, TAB_LABEL } from "@/lib/case-tab-routes";
import { useCaseRoomId } from "@/hooks/useCaseRoomId";

/** Kısa sekme etiketi ("Çözüm Zarfı" gibi uzun etiketlerde de tek satır). */
function label(tab: TabId): string {
  return TAB_LABEL[tab];
}

/** Ok tuşu / kaydırma bu hedefte yutulmamalı mı? (form alanı, düzenlenebilir alan, modal) */
function isInteractiveTarget(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  if (
    el.closest(
      'input, textarea, select, [contenteditable=""], [contenteditable="true"], [role="slider"], [role="textbox"], [role="dialog"], [data-no-slide-nav]',
    )
  ) {
    return true;
  }
  return false;
}

/** Dokunulan öğe yatay kaydırılabilir bir kabın içinde mi? (sekme şeridi, tablolar, galeri) */
function inHorizontalScroller(el: EventTarget | null): boolean {
  let node = el instanceof Element ? el : null;
  while (node && node !== document.body) {
    if (node.scrollWidth > node.clientWidth + 1) {
      const ox = getComputedStyle(node).overflowX;
      if (ox === "auto" || ox === "scroll") return true;
    }
    node = node.parentElement;
  }
  return false;
}

function overlayOpen(): boolean {
  if (document.documentElement.dataset.appOverlay === "1") return true;
  // Görünür bir modal (yaş kapısı gizliyken DOM'da kalır — yalnızca görünür olanlar sayılır).
  return Array.from(document.querySelectorAll('[aria-modal="true"]')).some(
    (el) => el.getClientRects().length > 0,
  );
}

/**
 * Slayt gezinmesi: alt nav (sekme şeridi) sırasına göre önceki / sonraki sekme.
 * Akış içinde (main sonunda) render edilir — fixed değil; tab bar ve yüzen
 * katmanlarla çakışmaz. Masaüstünde ← / → tuşları, dokunmatikte yatay kaydırma.
 */
export function CaseSlideNav({
  caseId,
  enabledTabs,
}: {
  caseId: string;
  enabledTabs: TabId[];
}) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const roomId = useCaseRoomId(caseId);

  const m = pathname.match(/^\/vaka\/[^/]+\/([^/]+)\/?$/);
  const slug = m?.[1] ?? "";
  const { prev, next } = adjacentTabs(enabledTabs, slug);
  const prevHref = prev ? caseTabHref(caseId, prev, roomId) : null;
  const nextHref = next ? caseTabHref(caseId, next, roomId) : null;

  useEffect(() => {
    if (!slug) return;

    function onKey(e: KeyboardEvent) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (isInteractiveTarget(e.target) || isInteractiveTarget(document.activeElement)) return;
      if (overlayOpen()) return;
      const href = e.key === "ArrowLeft" ? prevHref : nextHref;
      if (!href) return;
      e.preventDefault();
      router.push(href);
    }

    let start: { x: number; y: number; t: number } | null = null;
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1 || isInteractiveTarget(e.target) || inHorizontalScroller(e.target)) {
        start = null;
        return;
      }
      const t = e.touches[0];
      start = { x: t.clientX, y: t.clientY, t: Date.now() };
    }
    function onTouchEnd(e: TouchEvent) {
      const s = start;
      start = null;
      if (!s || e.changedTouches.length !== 1 || overlayOpen()) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;
      if (Date.now() - s.t > 700) return;
      if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.8) return;
      if (window.getSelection()?.toString()) return;
      const href = dx > 0 ? prevHref : nextHref;
      if (href) router.push(href);
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    function onTouchCancel() {
      start = null;
    }
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [slug, prevHref, nextHref, router]);

  useEffect(() => {
    if (prevHref) router.prefetch(prevHref);
    if (nextHref) router.prefetch(nextHref);
  }, [prevHref, nextHref, router]);

  if (!slug || (!prev && !next)) return null;

  return (
    <nav className="case-slide-nav" aria-label="Sekmeler arasında gezin">
      {prev && prevHref ? (
        <Link
          href={prevHref}
          className="case-slide-nav-link case-slide-nav-prev"
          aria-label={`Önceki sekme: ${label(prev)}`}
          rel="prev"
        >
          <span className="case-slide-nav-kicker" aria-hidden>
            ← Önceki
          </span>
          <span className="case-slide-nav-title">{label(prev)}</span>
        </Link>
      ) : (
        <span className="case-slide-nav-spacer" aria-hidden />
      )}
      {next && nextHref ? (
        <Link
          href={nextHref}
          className={`case-slide-nav-link case-slide-nav-next${next === "cozum" ? " is-final" : ""}`}
          aria-label={`Sonraki sekme: ${label(next)}`}
          rel="next"
        >
          <span className="case-slide-nav-kicker" aria-hidden>
            Sonraki →
          </span>
          <span className="case-slide-nav-title">{label(next)}</span>
        </Link>
      ) : (
        <span className="case-slide-nav-spacer" aria-hidden />
      )}
      <p className="case-slide-nav-hint" aria-hidden>
        <span className="case-slide-nav-hint-keys">← → tuşlarıyla da geçebilirsin</span>
        <span className="case-slide-nav-hint-touch">Sağa / sola kaydırarak da geçebilirsin</span>
      </p>
    </nav>
  );
}
