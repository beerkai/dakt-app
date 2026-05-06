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

export function VakaCaseInnerNav({
  caseId,
  caseData,
}: {
  caseId: string;
  caseData: CaseData;
}) {
  const pathname = usePathname();
  const tabs = orderedEnabledTabs(caseData.enabledTabs);
  const codenameUpper = caseData.codename.toLocaleUpperCase("tr-TR");

  return (
    <nav className="vaka-case-strip" aria-label="Vaka gezinmesi ve sekmeler">
      <div className="vaka-case-strip-inner">
        <div className="vaka-case-strip-head">
          <Link href="/davalar" className="vaka-case-strip-back">
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
  );
}
