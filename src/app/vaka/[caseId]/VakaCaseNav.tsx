"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CaseData } from "@/lib/case-types";
import {
  caseTabHref,
  orderedEnabledTabs,
  TAB_LABEL,
} from "@/lib/case-tab-routes";
import { sectionNumForTab } from "@/lib/case-section-utils";

export function VakaCaseNav({
  caseId,
  caseData,
}: {
  caseId: string;
  caseData: CaseData;
}) {
  const pathname = usePathname();
  const tabs = orderedEnabledTabs(caseData.enabledTabs);

  return (
    <nav className="nav" aria-label="Vaka sekmeleri">
      <div className="nav-inner">
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
    </nav>
  );
}
