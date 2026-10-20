import { createClient } from "@/lib/supabase/server";
import { getCase } from "@/lib/case-helpers";
import { notFound, redirect } from "next/navigation";

import { TerminatedClient } from "./TerminatedClient";

export default async function SonlandirildiPage({
  params,
}: {
  params: Promise<{ kod: string }>;
}) {
  const { kod } = await params;
  const code = kod.toUpperCase();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/giris");

  const { data: room } = await supabase
    .from("rooms")
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (!room) notFound();

  if (room.status === "playing" || room.status === "waiting") {
    redirect(`/oda/${code}`);
  }

  const caseData = getCase(room.case_id);
  if (!caseData) notFound();

  let durationSeconds = 0;
  if (room.started_at && room.finished_at) {
    durationSeconds = Math.floor(
      (new Date(room.finished_at).getTime() -
        new Date(room.started_at).getTime()) /
        1000,
    );
  }

  return (
    <TerminatedClient caseData={{ id: caseData.id, codename: caseData.codename }} durationSeconds={durationSeconds} />
  );
}
