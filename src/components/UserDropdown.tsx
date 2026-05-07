"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

import { signOut } from "@/app/auth/actions";
import { ANALYST_COLOR_HEX, ANALYST_COLOR_LABEL_TR } from "@/lib/colors";
import type { Profile } from "@/lib/supabase/types";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

export function UserDropdown({
  profile,
  email,
  onClose,
  onBeforeProfileNav,
}: {
  profile: Profile;
  email: string | undefined;
  onClose: () => void;
  /** Varsa: href ile dışarı çıkmadan önce (vaka/lobi çıkış onayı) */
  onBeforeProfileNav?: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const hex = ANALYST_COLOR_HEX[profile.color];
  const label = ANALYST_COLOR_LABEL_TR[profile.color];

  async function handleSignOut() {
    onClose();
    await signOut();
  }

  return (
    <div
      className={`absolute right-0 top-full z-[260] mt-2 min-w-[240px] border border-[var(--rule)] bg-[var(--anthracite)] py-0 shadow-[0_8px_24px_rgba(0,0,0,0.6)] ${mono}`}
      role="menu"
      aria-label="Hesap menüsü"
    >
      <div className="border-b border-[var(--rule)] px-4 py-4">
        <p className="m-0 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--kraft)]">
          <span
            className="size-2.5 shrink-0 rounded-full border border-[var(--rule)]"
            style={{ backgroundColor: hex }}
            aria-hidden
          />
          {profile.username}
        </p>
        <p className="m-0 mt-2 flex items-center gap-2 text-[10px] tracking-[0.2em] text-[var(--kraft-dark)]">
          <span
            className="size-2.5 shrink-0 rounded-full border border-[var(--rule)]"
            style={{ backgroundColor: hex }}
            title={label}
            aria-hidden
          />
          <span className="text-[var(--kraft-light)]">{label}</span>
        </p>
        {email ? (
          <p className="m-0 mt-2 break-all text-[10px] normal-case leading-snug text-[var(--kraft-dark)]">
            {email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col">
        <Link
          href="/profil"
          role="menuitem"
          className="block border-b border-[var(--rule)] px-4 py-3 text-[11px] uppercase tracking-[0.32em] text-[var(--kraft)] transition-colors hover:bg-[var(--bordeaux)] hover:text-[var(--kraft-light)]"
          onClick={(e) => {
            onBeforeProfileNav?.(e, "/profil");
            if (e.defaultPrevented) return;
            onClose();
          }}
        >
          ▸ Profilim
        </Link>
        <Link
          href="/profil/basarilar"
          role="menuitem"
          className="block border-b border-[var(--rule)] px-4 py-3 text-[11px] uppercase tracking-[0.32em] text-[var(--kraft)] transition-colors hover:bg-[var(--bordeaux)] hover:text-[var(--kraft-light)]"
          onClick={(e) => {
            onBeforeProfileNav?.(e, "/profil/basarilar");
            if (e.defaultPrevented) return;
            onClose();
          }}
        >
          ▸ Başarılarım
        </Link>
        <Link
          href="/profil/gecmis"
          role="menuitem"
          className="block border-b border-[var(--rule)] px-4 py-3 text-[11px] uppercase tracking-[0.32em] text-[var(--kraft)] transition-colors hover:bg-[var(--bordeaux)] hover:text-[var(--kraft-light)]"
          onClick={(e) => {
            onBeforeProfileNav?.(e, "/profil/gecmis");
            if (e.defaultPrevented) return;
            onClose();
          }}
        >
          ▸ Geçmiş
        </Link>
      </div>

      <div className="border-t border-[var(--rule)]">
        <button
          type="button"
          role="menuitem"
          className="w-full cursor-pointer border-0 bg-transparent px-4 py-3 text-left text-[11px] uppercase tracking-[0.28em] text-[var(--bordeaux-bright)] transition-colors hover:bg-[var(--bordeaux)] hover:text-[var(--paper)]"
          onClick={() => void handleSignOut()}
        >
          ◂ Çıkış Yap
        </button>
      </div>
    </div>
  );
}
