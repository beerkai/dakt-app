import { getCoopHostBypassEnabled } from "@/lib/app-settings";
import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { createClient } from "@/lib/supabase/server";

import { CozumClient, type CozumCoopMeta } from "./CozumClient";

export default async function CozumPage({
  params,
  searchParams,
}: {
  params: Promise<{ caseId: string }>;
  searchParams?: Promise<{ room?: string }>;
}) {
  const { caseId } = await params;
  const sp = (await searchParams) ?? {};
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "cozum")) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let serverHasSolvedRecord = false;
  if (user) {
    const { data: solvedRow } = await supabase
      .from("solved_cases")
      .select("case_id")
      .eq("user_id", user.id)
      .eq("case_id", caseId)
      .maybeSingle();
    serverHasSolvedRecord = Boolean(solvedRow);
  }

  const hostBypassEnabled = await getCoopHostBypassEnabled();

  let coopMeta: CozumCoopMeta | null = null;
  const roomParam =
    typeof sp.room === "string" && sp.room.length > 0 ? sp.room : undefined;

  if (user && roomParam) {
    const { data: membership } = await supabase
      .from("room_players")
      .select("room_id")
      .eq("room_id", roomParam)
      .eq("user_id", user.id)
      .is("left_at", null)
      .maybeSingle();

    if (membership) {
      const { data: room } = await supabase
        .from("rooms")
        .select("host_user_id, case_id")
        .eq("id", roomParam)
        .maybeSingle();

      if (room?.case_id === caseId) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, color")
          .eq("id", user.id)
          .maybeSingle();

        const u = profile?.username?.trim();
        coopMeta = {
          roomId: roomParam,
          myUserId: user.id,
          myUsername: u && u.length > 0 ? u : "Analist",
          myColor: profile?.color ?? null,
          isHost: room.host_user_id === user.id,
          hostBypassEnabled,
        };
      }
    }
  }

  const num = sectionNumForTab(caseData, "cozum");
  const sub = caseData.tabSectionSub.cozum ?? "";

  return (
    <section id="solution">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Çözüm Zarfı</h2>
        <span className="section-sub">{sub}</span>
      </div>
      <CozumClient
        caseId={caseData.id}
        codename={caseData.codename}
        suspects={caseData.suspects}
        verdict={caseData.verdict}
        serverHasSolvedRecord={serverHasSolvedRecord}
        coopMeta={coopMeta}
      />
    </section>
  );
}
