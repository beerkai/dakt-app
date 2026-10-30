"use client";

import type { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signingOut: boolean;
  signOutAndRedirect: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signingOut: false,
  signOutAndRedirect: async () => {},
});

export function AuthProvider({
  children,
  initialUser = null,
  initialProfile = null,
  initialAuthLoaded = false,
}: {
  children: ReactNode;
  initialUser?: User | null;
  initialProfile?: Profile | null;
  /** Sunucuda auth okunduysa true; ilk frame’de loading=false (SSR ile nav çubuğu flicker’sız) */
  initialAuthLoaded?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(initialUser);
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [loading, setLoading] = useState(!initialAuthLoaded);
  const [signingOut, setSigningOut] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  const signOutAndRedirect = useCallback(async () => {
    if (signingOut) return;
    setSigningOut(true);

    setUser(null);
    setProfile(null);

    try {
      const { signOut: serverSignOut } = await import("@/app/auth/actions");
      await serverSignOut();
    } catch (err) {
       
      console.error("[signOutAndRedirect] error:", err);
    }

    router.push("/");
    router.refresh();
  }, [router, signingOut]);

  // Aynı kullanıcı için yeni bir User nesnesi gelse bile (INITIAL_SESSION,
  // TOKEN_REFRESHED, getUser) referansı koru; `user`a bağlı efektler
  // gereksiz yere yeniden çalışmasın.
  const applyUser = useCallback((next: User | null) => {
    setUser((prev) => {
      if (!next) return null;
      if (
        prev &&
        prev.id === next.id &&
        prev.updated_at === next.updated_at &&
        prev.email === next.email
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    let active = true;
    let profileTimer: ReturnType<typeof setTimeout> | null = null;

    // ÖNEMLİ: Bu callback supabase-js auth kilidi (navigator.locks) tutulurken
    // çağrılır ve await edilir. İçeride başka bir Supabase çağrısını await
    // etmek (ör. profiles sorgusu → getSession) kilidi asla bırakmaz ve
    // sonraki tüm Supabase isteklerini kilitler. Bu yüzden callback senkron
    // kalır; Supabase işi setTimeout ile kilit bırakıldıktan sonra yapılır.
    // https://supabase.com/docs/reference/javascript/auth-onauthstatechange
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (profileTimer) {
        clearTimeout(profileTimer);
        profileTimer = null;
      }

      if (event === "SIGNED_OUT" || !session) {
        applyUser(null);
        setProfile(null);
        return;
      }

      const sessionUser = session.user;
      applyUser(sessionUser);
      if (!sessionUser) return;

      profileTimer = setTimeout(() => {
        profileTimer = null;
        void supabase
          .from("profiles")
          .select("*")
          .eq("id", sessionUser.id)
          .maybeSingle()
          .then(
            ({ data: profileData }) => {
              if (active) setProfile((profileData as Profile | null) ?? null);
            },
            (err: unknown) => {
              console.warn("[AuthProvider] profile load failed:", err);
            },
          );
      }, 0);
    });

    return () => {
      active = false;
      if (profileTimer) clearTimeout(profileTimer);
      subscription.unsubscribe();
    };
  }, [supabase, applyUser]);

  // Layout client’ta yeniden mount olmaz; client navigasyon + auth cookie sonrası tekrar oku
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const {
          data: { user: u },
        } = await supabase.auth.getUser();
        if (cancelled) return;
        applyUser(u ?? null);

        if (u) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", u.id)
            .maybeSingle();
          if (!cancelled) setProfile((profileData as Profile | null) ?? null);
        } else if (!cancelled) {
          setProfile(null);
        }
      } catch (err) {
        // Ağ hatası / sayfa geçişinde iptal edilen fetch (WebKit: "Load failed")
        if (!cancelled) console.warn("[AuthProvider] auth refresh failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, supabase, applyUser]);

  const userId = user?.id ?? null;

  useEffect(() => {
    if (!userId) return;

    async function ping() {
      try {
        const { error: rpcErr } = await supabase.rpc("update_last_seen");
        if (rpcErr) {
          await supabase
            .from("profiles")
            .update({ last_seen_at: new Date().toISOString() })
            .eq("id", userId);
        }
      } catch {
        // Çevrimdışı / iptal edilen istek: bir sonraki ping'de tekrar denenir.
      }
    }

    void ping();
    const interval = setInterval(() => void ping(), 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [userId, supabase]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signingOut,
        signOutAndRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
