import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProfilClient } from "./ProfilClient";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Profil · D.A.K.T.",
  description: "Hesap bilgileri ve analist ayarları.",
};

export default async function ProfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/giris");

  const { data: profileRow, error: profileErr } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileErr || !profileRow) redirect("/giris");

  const profile = profileRow as Profile;

  const { data: solved } = await supabase
    .from("solved_cases")
    .select("attempt_count, duration_seconds")
    .eq("user_id", user.id);

  const totalSolved = solved?.length ?? 0;
  const firstTryRate =
    solved && totalSolved > 0
      ? Math.round(
          (solved.filter((row) => row.attempt_count === 1).length /
            totalSolved) *
            100,
        )
      : 0;
  const fastestSolveSec =
    solved && solved.length > 0
      ? Math.min(...solved.map((s) => s.duration_seconds))
      : 0;
  const totalDurationSec =
    solved?.reduce((sum, row) => sum + row.duration_seconds, 0) ?? 0;

  const memberSinceLabel = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(profile.created_at));

  return (
    <ProfilClient
      profile={profile}
      email={user.email ?? ""}
      memberSinceLabel={memberSinceLabel}
      stats={{
        totalSolved,
        firstTryRate,
        fastestSolveSec,
        totalDurationSec,
      }}
    />
  );
}
