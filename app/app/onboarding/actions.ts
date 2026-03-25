"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

const onboardingSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username can be up to 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Use letters, numbers, or underscores only"),
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  bio: z.string().trim().max(240, "Bio can be up to 240 characters").optional(),
});

export type OnboardingState = {
  message: string | null;
  fieldErrors?: {
    username?: string[];
    fullName?: string[];
    bio?: string[];
  };
};

export async function completeOnboardingAction(
  _prevState: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const parsed = onboardingSchema.safeParse({
    username: formData.get("username"),
    fullName: formData.get("fullName"),
    bio: formData.get("bio") || "",
  });

  if (!parsed.success) {
    return {
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient(await cookies());
  if (!supabase) {
    return { message: "Supabase is not configured. Add environment keys first." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "Session expired. Please log in again." };
  }

  const normalizedUsername = parsed.data.username.toLowerCase();

  const { data: existing, error: lookupError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", normalizedUsername)
    .neq("id", user.id)
    .maybeSingle<{ id: string }>();

  if (lookupError) {
    return { message: lookupError.message };
  }

  if (existing) {
    return {
      message: "That username is already taken.",
      fieldErrors: { username: ["Choose a unique username"] },
    };
  }

  const { error: updateError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      username: normalizedUsername,
      full_name: parsed.data.fullName,
      bio: parsed.data.bio || null,
    },
    { onConflict: "id" },
  );

  if (updateError) {
    return { message: updateError.message };
  }

  redirect("/app/home");
}