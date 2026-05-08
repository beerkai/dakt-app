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
      // eslint-disable-next-line no-console
      console.error("[signOutAndRedirect] error:", err);
    }

    router.push("/");
    router.refresh();
  }, [router, signingOut]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setUser(null);
        setProfile(null);
        return;
      }

      setUser(session.user);
      if (session.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();
        setProfile(profileData ?? null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Layout client’ta yeniden mount olmaz; client navigasyon + auth cookie sonrası tekrar oku
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user: u },
      } = await supabase.auth.getUser();
      if (cancelled) return;
      setUser(u ?? null);

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

      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, supabase]);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    async function ping() {
      const { error: rpcErr } = await supabase.rpc("update_last_seen");
      if (rpcErr) {
        await supabase
          .from("profiles")
          .update({ last_seen_at: new Date().toISOString() })
          .eq("id", userId);
      }
    }

    void ping();
    const interval = setInterval(() => void ping(), 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user, supabase]);

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
