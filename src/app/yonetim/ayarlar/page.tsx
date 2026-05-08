import { createClient } from "@/lib/supabase/server";
import type { CoopSolutionModeSetting } from "@/app/yonetim/actions";

import GMPageFooter from "../components/GMPageFooter";
import GMPageHeader from "../components/GMPageHeader";
import { CoopAyarlarForm } from "./CoopAyarlarForm";

export const metadata = {
  title: "Ayarlar · Genel Müdürlük",
};

export default async function YonetimAyarlarPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", "coop_solution_mode")
    .maybeSingle();

  const rawMode = (data?.value as { mode?: string } | null)?.mode;
  const initialMode: CoopSolutionModeSetting =
    rawMode === "unanimous_with_host_bypass"
      ? "unanimous_with_host_bypass"
      : "unanimous";

  return (
    <>
      <GMPageHeader
        section="Z — SİSTEM"
        subject="GENEL AYARLAR"
        reference="99-CFG"
      />

      <div className="gm-section-heading">
        <span className="gm-section-bar" />
        <h1 className="gm-section-title">Co-op Davranışı</h1>
      </div>

      <CoopAyarlarForm initialMode={initialMode} />

      <GMPageFooter section="CFG" page="99" />
    </>
  );
}
