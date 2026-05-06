import type { ReactNode } from "react";
import "./vaka-case.css";
import { getCase } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { VakaCaseBar } from "./VakaCaseBar";
import { VakaCaseNav } from "./VakaCaseNav";
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
      <VakaCaseBar caseId={caseData.id} codename={caseData.codename} />
      <VakaCaseNav caseId={caseId} caseData={caseData} />
      <main className="workspace flex-1">{children}</main>
      <footer className="foot">
        D.A.K.T. ·{" "}
        <em>Division of Analytic Knowledge & Testimonies</em> · dakt.app ·
        @dakt.app · jointhedakt@gmail.com
      </footer>
      <VakaCaseSoloTease
        caseId={caseData.id}
        codename={caseData.codename}
        fullTitle={caseData.fullTitle}
      />
    </div>
  );
}
