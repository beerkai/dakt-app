import type { ReactNode } from "react";
import { Suspense } from "react";
import "./vaka-case.css";
import { getCase } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import GuestSessionBanner from "@/components/GuestSessionBanner";
import SiteFooter from "@/components/SiteFooter";
import SessionTracker from "@/components/SessionTracker";
import { SystemBar } from "@/components/SystemBar";
import { createClient } from "@/lib/supabase/server";
import { VakaCaseInnerNav } from "./VakaCaseInnerNav";
import { VakaCaseSoloTease } from "./VakaCaseSoloTease";

function SystemBarFallback() {
  return (
    <div className="flex items-center justify-end border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.4)] px-4 py-2 md:px-7 md:py-2.5" />
  );
}

function InnerNavFallback() {
  return (
    <div
      className="border-b border-[rgba(255,255,255,0.08)] bg-[var(--ink)]"
      style={{ minHeight: 48 }}
      aria-hidden
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const c = getCase(caseId);
  if (!c) return { title: { absolute: "D.A.K.T." } };
  return {
    title: c.codename,
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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("username, is_tester")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  const isTester = profile?.is_tester === true;

  const { data: caseMeta } = await supabase
    .from("cases_metadata")
    .select("status")
    .eq("case_id", caseId)
    .maybeSingle();

  const caseMetaStatus = caseMeta?.status;
  if (!caseMetaStatus) notFound();
  if (caseMetaStatus === "draft" || caseMetaStatus === "archived") notFound();
  if (caseMetaStatus === "test" && !isTester) notFound();

  let username = "MİSAFİR";
  let serverMarksSolved = false;
  if (user) {
    const u = profile?.username?.trim();
    username = u && u.length > 0 ? u : "ANALİST";
    const { data: solvedRow } = await supabase
      .from("solved_cases")
      .select("case_id")
      .eq("user_id", user.id)
      .eq("case_id", caseId)
      .maybeSingle();
    serverMarksSolved = Boolean(solvedRow);
  }

  const caseNameUpper = caseData.codename.toLocaleUpperCase("tr-TR");

  return (
    <div className="relative z-[1] flex min-h-full flex-1 flex-col">
      <div className="vaka-case-sticky-cluster">
        <Suspense fallback={<SystemBarFallback />}>
          <SystemBar caseId={caseId} />
        </Suspense>
        <Suspense fallback={<InnerNavFallback />}>
          <VakaCaseInnerNav
            caseId={caseId}
            caseData={{
              codename: caseData.codename,
              enabledTabs: caseData.enabledTabs,
            }}
          />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <SessionTracker
          caseId={caseId}
          caseName={caseNameUpper}
          username={username}
          serverMarksSolved={serverMarksSolved}
        />
      </Suspense>
      <GuestSessionBanner />
      <main className="workspace min-w-0 flex-1">{children}</main>
      <SiteFooter variant="case" />
      <Suspense fallback={null}>
        <VakaCaseSoloTease
          caseId={caseData.id}
          codename={caseData.codename}
          fullTitle={caseData.fullTitle}
          victim={caseData.victim}
        />
      </Suspense>
    </div>
  );
}
