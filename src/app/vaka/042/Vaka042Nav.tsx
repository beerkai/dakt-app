"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/vaka/042/brief", num: "01", label: "Brief" },
  { href: "/vaka/042/supheliler", num: "02", label: "Şüpheliler" },
  { href: "/vaka/042/ifadeler", num: "03", label: "İfadeler" },
  { href: "/vaka/042/adli-tip", num: "04", label: "Adli Tıp" },
  { href: "/vaka/042/deliller", num: "05", label: "Deliller" },
  { href: "/vaka/042/teknik", num: "06", label: "Teknik" },
  { href: "/vaka/042/zaman-cizelgesi", num: "07", label: "Zaman Çizelgesi" },
  { href: "/vaka/042/deduction", num: "08", label: "Deduction" },
  { href: "/vaka/042/cozum", num: "09", label: "Çözüm" },
] as const;

export function Vaka042Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label="Vaka sekmeleri">
      <div className="nav-inner">
        {TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`nav-item${pathname === tab.href ? " active" : ""}`}
          >
            <span className="num">{tab.num}</span>
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
