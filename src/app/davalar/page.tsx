import type { Metadata } from "next";

import { DavalarCatalog } from "./DavalarCatalog";
import { getAllCases } from "@/lib/case-helpers";
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
        .single()
    : { data: null };

  const isTester = profile?.is_tester === true;

  const { data: caseMetadata } = await supabase
    .from("cases_metadata")
    .select("*");

  const metaById = new Map(
    caseMetadata?.map((c) => [c.case_id as string, c]) ?? [],
  );

  const allCases = getAllCases();
  const cases = allCases.filter((c) => {
    const meta = metaById.get(c.id);
    if (!meta) return true;
    if (meta.status === "published") return true;
    if (meta.status === "test" && isTester) return true;
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
    <div className="relative z-[1] mx-auto w-full max-w-[1440px] flex-1 px-5 py-10 md:px-7 md:py-14">
      <header className="mb-10 md:mb-12">
        <h1 className="mb-3 text-4xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
          <em className="text-[var(--kraft)]">Aktif</em> Dosyalar
        </h1>
        <p
          className="max-w-xl text-[13px] tracking-[0.06em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]"
        >
          Erişimine açık vakalar.
        </p>
      </header>

      <DavalarCatalog
        cases={cases}
        solvedCaseIds={solvedCaseIds}
        archivedRoomClosed={archivedRoomClosed}
        notInRoomNotice={notInRoomNotice}
      />
    </div>
  );
}
