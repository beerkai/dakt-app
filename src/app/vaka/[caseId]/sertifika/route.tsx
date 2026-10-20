import { getCase } from "@/lib/case-helpers";
import { renderCertificate, safeFilenamePart } from "@/lib/certificate-image";
import { createClient } from "@/lib/supabase/server";

/** Yalnızca çözümü sunucuda kayıtlı kullanıcılar için PNG sertifika. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ caseId: string }> },
) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData) return new Response("Vaka bulunamadı", { status: 404 });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Giriş gerekli", { status: 401 });

  const [{ data: solved }, { data: profile }] = await Promise.all([
    supabase
      .from("solved_cases")
      .select("attempt_count, duration_seconds, solved_at")
      .eq("user_id", user.id)
      .eq("case_id", caseId)
      .maybeSingle(),
    supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle(),
  ]);
  if (!solved) {
    return new Response("Bu vaka için çözüm kaydı yok", { status: 403 });
  }

  const analystName = profile?.username?.trim() || "Analist";
  const download = new URL(request.url).searchParams.has("indir");

  return renderCertificate(
    {
      caseId: caseData.id,
      codename: caseData.codename,
      analystName,
      solvedAt: solved.solved_at,
      attempts: solved.attempt_count ?? 1,
      durationSeconds: solved.duration_seconds ?? 0,
    },
    {
      "Cache-Control": "private, no-store",
      ...(download
        ? {
            "Content-Disposition": `attachment; filename="dakt-sertifika-${caseData.id}-${safeFilenamePart(analystName)}.png"`,
          }
        : {}),
    },
  );
}
