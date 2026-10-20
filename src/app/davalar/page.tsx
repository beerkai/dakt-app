import type { Metadata } from "next";

import SiteFooter from "@/components/SiteFooter";

import { DavalarCatalog } from "./DavalarCatalog";
import { getAllCases, toCatalogItem } from "@/lib/case-helpers";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Aktif Dosyalar · D.A.K.T.",
  description: "Erişimine açık sınıflandırılmış vaka dosyaları.",
};

export default async function DavalarPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const archivedRoomClosed = sp.error === "archived";
  const notInRoomNotice = sp.error === "not-in-room";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("is_tester")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  const isTester = profile?.is_tester === true;

  const { data: caseMetadata } = await supabase
    .from("cases_metadata")
    .select("case_id, status");

  const metaMap = new Map<string, string>();
  caseMetadata?.forEach((m) => {
    metaMap.set(m.case_id, m.status);
  });

  const allCases = getAllCases();

  const visibleCases = allCases.filter((c) => {
    const status = metaMap.get(c.id);

    if (!status) return false;
    if (status === "published") return true;
    if (status === "test") return isTester;

    return false;
  });

  let solvedCaseIds: string[] = [];
  if (user) {
    const { data: solved } = await supabase
      .from("solved_cases")
      .select("case_id")
      .eq("user_id", user.id);
    solvedCaseIds = solved?.map((s) => s.case_id) ?? [];
  }

  return (
    <div className="relative z-[1] flex min-h-full flex-1 flex-col">
      <div className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-10 md:px-7 md:py-14">
        <header className="mb-10 md:mb-12">
          <h1 className="mb-3 text-4xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
            <em className="text-[var(--kraft)]">Aktif</em> Dosyalar
          </h1>
          <p
            className="max-w-xl text-[16px] text-[var(--subtitle-text)] [font-family:var(--font-newsreader),serif]"
          >
            Erişimine açık vakalar.
          </p>
        </header>

        <DavalarCatalog
          cases={visibleCases.map(toCatalogItem)}
          solvedCaseIds={solvedCaseIds}
          archivedRoomClosed={archivedRoomClosed}
          notInRoomNotice={notInRoomNotice}
        />
      </div>
      <SiteFooter variant="marketing" />
    </div>
  );
}
