"use client";

import { usePathname } from "next/navigation";

import { SiteNav } from "@/components/SiteNav";

export function ConditionalSiteNav() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/yasal") ||
    pathname?.startsWith("/yonetim") ||
    pathname?.startsWith("/gm")
  ) {
    return null;
  }
  return <SiteNav />;
}
