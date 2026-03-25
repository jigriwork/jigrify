"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createClient as createSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/utils/supabase/client";

const authSchema = z.object({
  identifier: z.string().min(3, "Enter email or phone"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthValues = z.infer<typeof authSchema>;

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (values: AuthValues) => {
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage(
        "Supabase keys missing. Add env variables to enable live authentication.",
      );
      setLoading(false);
      return;
    }

    const email = values.identifier.includes("@")
      ? values.identifier
      : `${values.identifier.replace(/\D/g, "")}@jigrify.app`;

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: values.password,
      });
      setMessage(error ? error.message : "Logged in. Redirect wiring comes in next phase.");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password: values.password,
      });
      setMessage(error ? error.message : "Account created. Verify email to continue.");
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md p-7">
      <p className="text-xs uppercase tracking-[0.22em] text-purple-300">JIGRIFY AUTH</p>
      <h1 className="mt-2 text-3xl font-black text-white">
        {mode === "login" ? "Welcome back" : "Create your vibe"}
      </h1>
      <p className="mt-2 text-sm text-slate-300">
        {mode === "login"
          ? "Jump back into reels, rooms, and real-time chat."
          : "Join a vibrant social space built for creators and communities."}
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Email or phone" {...register("identifier")} />
          {errors.identifier ? (
            <p className="mt-1 text-xs text-pink-300">{errors.identifier.message}</p>
          ) : null}
        </div>

        <div>
          <Input type="password" placeholder="Password" {...register("password")} />
          {errors.password ? (
            <p className="mt-1 text-xs text-pink-300">{errors.password.message}</p>
          ) : null}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign up"}
        </Button>
      </form>

      <div className="my-5 grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full">
          Continue with Apple
        </Button>
      </div>

      <p className="text-xs text-slate-400">
        {mode === "login" ? "New here? " : "Already have an account? "}
        <Link
          href={mode === "login" ? "/auth/signup" : "/auth/login"}
          className="font-semibold text-blue-300"
        >
          {mode === "login" ? "Create account" : "Login"}
        </Link>
      </p>

      <p className="mt-2 text-xs text-slate-400">
        Supabase status: {isSupabaseConfigured ? "Configured" : "Not configured"}
      </p>
      {message ? <p className="mt-3 text-xs text-purple-200">{message}</p> : null}
    </Card>
  );
}
