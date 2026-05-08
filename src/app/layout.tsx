import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Special_Elite,
} from "next/font/google";
import { Suspense } from "react";

import ActiveSessionChip from "@/components/ActiveSessionChip";
import { AuthProvider } from "@/components/AuthProvider";
import { SiteNav } from "@/components/SiteNav";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  weight: "400",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dakt.app"),
  title: {
    default: "D.A.K.T. — Division of Analytic Knowledge & Testimonies",
    template: "%s · D.A.K.T.",
  },
  description: "Co-op suç çözme oyunu. Belgeler, ifadeler, çözüm.",
  applicationName: "D.A.K.T.",
  authors: [{ name: "Berkay Aytekin" }],
  keywords: ["dakt", "suç çözme", "co-op oyun", "detective", "türkçe"],

  // Favicon ve icon yapılandırması
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // PWA manifest
  manifest: "/site.webmanifest",

  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "D.A.K.T.",
  },

  // Format detection (telefon numarası vs. otomatik linklemeyi kapat)
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // Open Graph (sosyal medya paylaşımları için)
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://dakt.app",
    title: "D.A.K.T. — Division of Analytic Knowledge & Testimonies",
    description: "Co-op suç çözme oyunu. Belgeler, ifadeler, çözüm.",
    siteName: "D.A.K.T.",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "D.A.K.T.",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary",
    title: "D.A.K.T.",
    description: "Co-op suç çözme oyunu.",
    images: ["/web-app-manifest-512x512.png"],
  },
};

// Viewport ayrı export — Next.js 14+ best practice
export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user: initialUser },
  } = await supabase.auth.getUser();

  let initialProfile: Profile | null = null;
  if (initialUser) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", initialUser.id)
      .maybeSingle();
    initialProfile = (data as Profile | null) ?? null;
  }

  return (
    <html
      lang="tr"
      className={`${cormorantGaramond.variable} ${specialElite.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider
          initialAuthLoaded
          initialUser={initialUser}
          initialProfile={initialProfile}
        >
          <SiteNav />
          <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
            {children}
          </div>
          <Suspense fallback={null}>
            <ActiveSessionChip />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
