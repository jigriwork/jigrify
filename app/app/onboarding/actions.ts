"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  getFriendlyProfileError,
  isProfilesTableSchemaCacheError,
} from "@/lib/supabase/error-messages";
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
  tone?: "error" | "success" | "info";
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
      message: "Almost there — please fix the highlighted details.",
      tone: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient(await cookies());
  if (!supabase) {
    return {
      message: "Profile setup is temporarily unavailable. Please try again in a moment.",
      tone: "error",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: "Your session expired. Please log in again.", tone: "error" };
  }

  const normalizedUsername = parsed.data.username.toLowerCase();

  const { data: existing, error: lookupError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", normalizedUsername)
    .neq("id", user.id)
    .maybeSingle<{ id: string }>();

  if (lookupError) {
    return { message: getFriendlyProfileError(lookupError), tone: "error" };
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
    return {
      message: isProfilesTableSchemaCacheError(updateError.message)
        ? "We’re preparing your account in the background. Please wait a few seconds and try again."
        : getFriendlyProfileError(updateError),
      tone: "error",
    };
  }

  redirect("/app/home");
}