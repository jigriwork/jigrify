import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { response, user, supabase } = await createClient(request);
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");
  const isProtectedAppRoute = pathname.startsWith("/app");

  if (!user && isProtectedAppRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/app/home", request.url));
  }

  if (user && supabase && isProtectedAppRoute && !pathname.startsWith("/app/onboarding")) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle<{ username: string | null }>();

    if (error) {
      return response;
    }

    if (!profile?.username) {
      return NextResponse.redirect(new URL("/app/onboarding", request.url));
    }
  }

  if (user && pathname.startsWith("/app/onboarding")) {
    if (supabase) {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle<{ username: string | null }>();

      if (error) {
        return response;
      }

      if (profile?.username) {
        return NextResponse.redirect(new URL("/app/home", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};