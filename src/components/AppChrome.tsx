"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, type ReactNode } from "react";
import { ViewTransition } from "react";

import { AppTabBar } from "@/components/AppTabBar";
import { InstallPrompt } from "@/components/InstallPrompt";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const hideBar = pathname.startsWith("/yonetim") || pathname.startsWith("/gm");

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  return (
    <>
      <div className={hideBar ? "flex min-h-0 flex-1 flex-col" : "app-chrome-pad flex min-h-0 flex-1 flex-col"}>
        <ViewTransition enter="page-fade" exit="page-fade" default="none">
          {children}
        </ViewTransition>
      </div>
      {hideBar ? null : (
        <>
          <InstallPrompt />
          <Suspense fallback={null}>
            <AppTabBar />
          </Suspense>
        </>
      )}
    </>
  );
}
