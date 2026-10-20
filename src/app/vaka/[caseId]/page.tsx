import { redirect } from "next/navigation";

import { caseTabHref } from "@/lib/case-tab-routes";

export default async function CaseIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ caseId: string }>;
  searchParams: Promise<{ room?: string | string[] }>;
}) {
  const { caseId } = await params;
  const { room } = await searchParams;
  redirect(caseTabHref(caseId, "brief", typeof room === "string" ? room : null));
}
