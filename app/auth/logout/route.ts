import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient(await cookies());

  if (supabase) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/auth/login", request.url), 303);
}