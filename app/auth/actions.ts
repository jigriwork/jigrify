"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getFriendlyAuthError } from "@/lib/supabase/error-messages";
import { createClient } from "@/utils/supabase/server";

const authSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  next: z.string().optional(),
});

export type AuthActionState = {
  message: string | null;
  tone?: "error" | "success" | "info";
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next"),
  });

  if (!parsed.success) {
    return {
      message: "Please check your email and password and try again.",
      tone: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient(await cookies());
  if (!supabase) {
    return {
      message: "Sign in is temporarily unavailable. Please try again soon.",
      tone: "error",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      message: getFriendlyAuthError(error),
      tone: "error",
    };
  }

  const nextPath = parsed.data.next;
  const safeNext =
    nextPath && nextPath.startsWith("/app") && !nextPath.startsWith("//")
      ? nextPath
      : "/app/home";

  redirect(safeNext);
}

export async function signupAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next"),
  });

  if (!parsed.success) {
    return {
      message: "Please fix the highlighted fields and continue.",
      tone: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient(await cookies());
  if (!supabase) {
    return {
      message: "Sign up is temporarily unavailable. Please try again soon.",
      tone: "error",
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: "",
      },
    },
  });

  if (error) {
    return {
      message: getFriendlyAuthError(error),
      tone: "error",
    };
  }

  if (!data.session) {
    return {
      message: "Check your email to verify your account.",
      tone: "success",
    };
  }

  redirect("/app/onboarding");
}

export async function logoutAction() {
  const supabase = createClient(await cookies());
  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/auth/login");
}