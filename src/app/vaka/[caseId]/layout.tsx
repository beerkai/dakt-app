import type { ReactNode } from "react";
import "./vaka-case.css";
import { getCase } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { SystemBar } from "@/components/SystemBar";
import { VakaCaseInnerNav } from "./VakaCaseInnerNav";
import { VakaCaseSoloTease } from "./VakaCaseSoloTease";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const c = getCase(caseId);
  if (!c) return { title: "D.A.K.T." };
  return {
    title: `D.A.K.T. · Vaka ${c.id}`,
    description: c.shortSummary,
  };
}

export default async function CaseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData) notFound();

  return (
    <div className="relative z-[1] flex min-h-full flex-1 flex-col">
      <div className="vaka-case-sticky-cluster">
        <SystemBar />
        <VakaCaseInnerNav caseId={caseId} caseData={caseData} />
      </div>
      <main className="workspace flex-1">{children}</main>
      <footer className="foot">
        D.A.K.T. ·{" "}
        <em lang="en">DIVISION OF ANALYTIC KNOWLEDGE &amp; TESTIMONIES</em> ·
        dakt.app ·{" "}
        <a
          href="https://instagram.com/dakt.app"
          target="_blank"
          rel="noopener noreferrer"
          className="foot-instagram"
        >
          @dakt.app
        </a>{" "}
        · jointhedakt@gmail.com
      </footer>
      <VakaCaseSoloTease
        caseId={caseData.id}
        codename={caseData.codename}
        fullTitle={caseData.fullTitle}
        victim={caseData.victim}
      />
    </div>
  );
}
