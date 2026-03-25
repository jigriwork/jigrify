import { cache } from "react";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

export type UserProfile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export const getCurrentViewer = cache(async () => {
  const supabase = createClient(await cookies());

  if (!supabase) {
    return { user: null, profile: null as UserProfile | null };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null as UserProfile | null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url, bio, created_at, updated_at")
    .eq("id", user.id)
    .maybeSingle<UserProfile>();

  return { user, profile: profile ?? null };
});