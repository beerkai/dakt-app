import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const protectedPaths = ["/yonetim", "/vaka", "/oda", "/profil", "/davalar"];
  const isProtected =
    path === "/" ||
    protectedPaths.some((p) => path === p || path.startsWith(`${p}/`));

  if (user && isProtected) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("suspended_at")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.suspended_at) {
      await supabase.auth.signOut();

      const url = request.nextUrl.clone();
      url.pathname = "/giris";
      url.searchParams.set("error", "suspended");

      const redirectResponse = NextResponse.redirect(url);
      for (const c of supabaseResponse.cookies.getAll()) {
        redirectResponse.cookies.set(c.name, c.value);
      }
      return redirectResponse;
    }
  }

  return supabaseResponse;
}
