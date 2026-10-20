"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useCaseRoomId } from "@/hooks/useCaseRoomId";
import { caseTabHref, TAB_LABEL } from "@/lib/case-tab-routes";
import type { TabId } from "@/lib/case-types";
import { writeLastPlace } from "@/lib/last-place";

function isTab(slug: string): slug is TabId {
  return slug in TAB_LABEL;
}

export function RememberLastPlace({
  caseId,
  codename,
}: {
  caseId: string;
  codename: string;
}) {
  const pathname = usePathname() ?? "";
  const roomId = useCaseRoomId(caseId);

  useEffect(() => {
    const slug = pathname.match(/^\/vaka\/[^/]+\/([^/]+)/)?.[1];
    if (!slug || !isTab(slug)) return;
    writeLastPlace({
      caseId,
      codename,
      tab: slug,
      tabLabel: TAB_LABEL[slug],
      href: caseTabHref(caseId, slug, roomId),
      updatedAt: Date.now(),
    });
  }, [pathname, caseId, codename, roomId]);

  return null;
}
