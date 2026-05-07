"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface GMNavProps {
  username: string;
}

const navLinks = [
  { href: "/yonetim", label: "Operasyon" },
  { href: "/yonetim/analistler", label: "Analistler" },
  { href: "/yonetim/vakalar", label: "Vaka Dosyaları" },
  { href: "/yonetim/sicil", label: "Sicil" },
];

export default function GMNav({ username }: GMNavProps) {
  const pathname = usePathname();

  return (
    <nav className="gm-topnav">
      <span className="gm-topnav-brand">Genel Müdürlük</span>

      {navLinks.map((link) => {
        const isActive =
          link.href === "/yonetim"
            ? pathname === "/yonetim"
            : pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`gm-topnav-link ${isActive ? "gm-topnav-link-active" : ""}`}
          >
            {link.label}
          </Link>
        );
      })}

      <span
        className="gm-topnav-link"
        style={{ pointerEvents: "none", color: "var(--gm-meta)" }}
      >
        ◉ {username.toUpperCase()}
      </span>

      <Link href="/" className="gm-topnav-back">
        ◂ Siteye Dön
      </Link>
    </nav>
  );
}
