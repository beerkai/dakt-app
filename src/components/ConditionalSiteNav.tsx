"use client";

import { usePathname } from "next/navigation";

import { SiteNav } from "@/components/SiteNav";

export function ConditionalSiteNav() {
  const pathname = usePathname();
  if (pathname?.startsWith("/yasal")) return null;
  return <SiteNav />;
}
