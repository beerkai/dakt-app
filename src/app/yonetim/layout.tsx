import { redirect } from "next/navigation";

import SiteFooter from "@/components/SiteFooter";
import { checkAdmin } from "@/lib/admin";

import GMNav from "./GMNav";

export const metadata = {
  title: "Genel Müdürlük",
  description: "D.A.K.T. Yönetim",
  robots: { index: false, follow: false },
};

export default async function YonetimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, profile } = await checkAdmin();

  if (!isAdmin) {
    redirect("/?error=unauthorized");
  }

  return (
    <div className="gm-theme flex min-h-full flex-1 flex-col">
      <div
        className="gm-perforation gm-perforation-left"
        aria-hidden="true"
      />
      <div
        className="gm-perforation gm-perforation-right"
        aria-hidden="true"
      />

      <GMNav username={profile?.username ?? "DİREKTÖR"} />

      <div className="gm-container flex-1">{children}</div>
      <SiteFooter variant="marketing" />
    </div>
  );
}
