import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Giriş · D.A.K.T.",
  description: "Misafir, kayıt ve giriş — analist erişimi.",
};

export default function GirisLayout({ children }: { children: ReactNode }) {
  return children;
}
