import { createClient } from "@/lib/supabase/server";
import { getCase } from "@/lib/case-helpers";
import { notFound, redirect } from "next/navigation";

import { RejoinClient } from "./RejoinClient";

export default async function TekrarKatilPage({
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

  if (room.status === "archived" || room.status === "solved") {
    redirect("/davalar?error=archived");
  }

  const caseData = getCase(room.case_id);
  if (!caseData) notFound();

  return (
    <RejoinClient
      room={{
        id: room.id,
        case_id: room.case_id,
        code: room.code as string,
        status: room.status as string,
      }}
      caseData={{ id: caseData.id, codename: caseData.codename }}
    />
  );
}
