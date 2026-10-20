import { createClient } from "@/lib/supabase/server";

import GMPageFooter from "../components/GMPageFooter";
import GMPageHeader from "../components/GMPageHeader";
import { CoopAyarlarForm } from "./CoopAyarlarForm";

export const metadata = {
  title: "Ayarlar · Genel Müdürlük",
};

export default async function YonetimAyarlarPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("coop_settings")
    .select("host_bypass_enabled")
    .limit(1)
    .maybeSingle();

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

      <CoopAyarlarForm
        initialHostBypass={Boolean(data?.host_bypass_enabled)}
        tableMissing={Boolean(error)}
      />

      <GMPageFooter section="CFG" page="99" />
    </>
  );
}
