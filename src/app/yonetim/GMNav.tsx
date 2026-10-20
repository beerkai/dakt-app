"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface GMNavProps {
  username: string;
}

const navLinks = [
  { href: "/yonetim", label: "Operasyon" },
  { href: "/yonetim/odalar", label: "Aktif odalar" },
  { href: "/yonetim/analistler", label: "Analistler" },
  { href: "/yonetim/vakalar", label: "Vakalar" },
  { href: "/yonetim/sicil", label: "Sicil" },
  { href: "/yonetim/ayarlar", label: "Ayarlar" },
];

export default function GMNav({ username }: GMNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="gm-mobilebar">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Kapat" : "Menü"}
        </button>
        <strong>Genel Müdürlük</strong>
        <Link href="/">Site</Link>
      </div>
      {open ? (
        <button
          type="button"
          className="gm-side-backdrop"
          aria-label="Menüyü kapat"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside className={`gm-side${open ? " gm-side-open" : ""}`}>
        <p className="gm-side-brand">
          Genel Müdürlük
          <span>D.A.K.T.</span>
        </p>
        {navLinks.map((link) => {
          const isActive =
            link.href === "/yonetim"
              ? pathname === "/yonetim"
              : pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`gm-side-link${isActive ? " gm-side-link-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
        <div className="gm-side-foot">
          <span className="gm-side-user">{username}</span>
          <Link href="/" className="gm-side-back">
            Siteye dön
          </Link>
        </div>
      </aside>
    </>
  );
}
