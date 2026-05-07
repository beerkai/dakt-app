import { createClient } from "@/lib/supabase/server";
import { getAllUserEmails } from "@/lib/admin";
import GMPageHeader from "../components/GMPageHeader";
import GMPageFooter from "../components/GMPageFooter";
import AnalistlerSearch from "./AnalistlerSearch";

interface Profile {
  id: string;
  username: string;
  color: string;
  role: string;
  is_tester: boolean;
  last_seen_at: string | null;
  suspended_at: string | null;
  created_at: string;
}

interface ProfileWithMeta extends Profile {
  email: string | null;
  solvedCount: number;
}

export default async function AnalistlerPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select(
      "id, username, color, role, is_tester, last_seen_at, suspended_at, created_at",
    )
    .order("created_at", { ascending: false });

  const { data: solvedCounts } = await supabase
    .from("solved_cases")
    .select("user_id");

  const solvedMap = new Map<string, number>();
  solvedCounts?.forEach((s) => {
    solvedMap.set(s.user_id, (solvedMap.get(s.user_id) ?? 0) + 1);
  });

  const emailMap = await getAllUserEmails();

  // Profilleri zenginleştir
  const enriched: ProfileWithMeta[] = (profiles ?? []).map((p) => ({
    ...p,
    email: emailMap.get(p.id) ?? null,
    solvedCount: solvedMap.get(p.id) ?? 0,
  }));

  // Üç gruba ayır (öncelik: admin > tester > analist)
  const yoneticiler = enriched.filter((p) => p.role === "admin");
  const testerlar = enriched.filter((p) => p.role !== "admin" && p.is_tester);
  const analistler = enriched.filter((p) => p.role !== "admin" && !p.is_tester);

  return (
    <>
      <GMPageHeader
        section="B — KAYIT"
        subject="ANALİST SİCİLİ"
        reference="02-RANK"
      />

      <AnalistlerSearch
        yoneticiler={yoneticiler}
        testerlar={testerlar}
        analistler={analistler}
      />

      <GMPageFooter section="RANK" page="02" />
    </>
  );
}

export const metadata = {
  title: "Analistler · Genel Müdürlük",
};
