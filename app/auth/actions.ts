"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

const authSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  next: z.string().optional(),
});

export type AuthActionState = {
  message: string | null;
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
      message: "Fix the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient(await cookies());
  if (!supabase) {
    return {
      message: "Supabase is not configured. Add environment keys to enable auth.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      message: error.message,
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
      message: "Fix the highlighted fields and continue.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient(await cookies());
  if (!supabase) {
    return {
      message: "Supabase is not configured. Add environment keys to enable auth.",
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
      message: error.message,
    };
  }

  if (!data.session) {
    return {
      message: "Account created. Check your email and then log in.",
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