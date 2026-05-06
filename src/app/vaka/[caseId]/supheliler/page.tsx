import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { SuspectGridClient } from "../SuspectGridClient";

export default async function SuphelilerPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "supheliler")) notFound();

  const num = sectionNumForTab(caseData, "supheliler");
  const sub = caseData.tabSectionSub.supheliler ?? "";

  return (
    <section id="suspects">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Şüpheliler Listesi</h2>
        <span className="section-sub">{sub}</span>
      </div>

      <SuspectGridClient suspects={caseData.suspects} />

      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: "#6a665b",
          textTransform: "uppercase",
          textAlign: "center",
          padding: 24,
        }}
      >
        ▸ Bir şüpheliyi işaretle ve ifadelerle çapraz okuma yap.
      </p>
    </section>
  );
}
