"use client";

import { useEffect } from "react";

import { publishCaseTabs } from "@/lib/case-tab-store";
import type { TabId } from "@/lib/case-types";

export function PublishCaseTabs({
  caseId,
  tabs,
}: {
  caseId: string;
  tabs: TabId[];
}) {
  const key = tabs.join(",");

  useEffect(() => {
    publishCaseTabs({ caseId, tabs: key ? (key.split(",") as TabId[]) : [] });
    return () => publishCaseTabs(null);
  }, [caseId, key]);

  return null;
}
