"use client";

import type { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import {
  createContext,
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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);

      if (u) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", u.id)
          .single();
        setProfile(profileData as Profile | null);
      } else {
        setProfile(null);
      }

      setLoading(false);
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
          .single();
        if (!cancelled) setProfile(profileData as Profile | null);
      } else if (!cancelled) {
        setProfile(null);
      }

      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, supabase]);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
