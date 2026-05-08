import { checkAdmin } from "@/lib/admin";
import { getCoopHostBypassEnabled } from "@/lib/app-settings";
import { redirect } from "next/navigation";

import { SettingsForm } from "./SettingsForm";

export default async function YonetimAyarlarPage() {
  const { isAdmin } = await checkAdmin();
  if (!isAdmin) redirect("/?error=unauthorized");

  const hostBypassEnabled = await getCoopHostBypassEnabled();

  return (
    <div className="px-6 pb-16 pt-12 max-w-3xl mx-auto">
      <h1
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: 40,
          color: "var(--paper)",
          marginBottom: 8,
        }}
      >
        Sistem Ayarları
      </h1>
      <p
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "var(--kraft-dark)",
          textTransform: "uppercase",
          marginBottom: 40,
        }}
      >
        Genel müdürlük yapılandırması
      </p>

      <SettingsForm initialHostBypass={hostBypassEnabled} />
    </div>
  );
}
