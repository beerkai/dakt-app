import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Special_Elite,
} from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import { SiteNav } from "@/components/SiteNav";
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
  title: "D.A.K.T. — Division of Analytic Knowledge & Testimonies",
  description:
    "Analist olarak sınıflandırılmış dosyaları aç: ifadeler, deliller, co-op çözüm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${cormorantGaramond.variable} ${specialElite.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <SiteNav />
          <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
