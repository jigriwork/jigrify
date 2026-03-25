"use client";

import { Eye, EyeOff, KeyRound, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  type AuthActionState,
} from "@/app/auth/actions";

const initialAuthActionState: AuthActionState = {
  message: null,
};

type AuthFormProps = {
  mode: "login" | "signup";
  nextPath?: string;
  action: (
    state: AuthActionState,
    payload: FormData,
  ) => Promise<AuthActionState>;
};

export function AuthForm({ mode, action, nextPath }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialAuthActionState);
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";

  const messageToneClass = useMemo(() => {
    if (state.tone === "success") {
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-100";
    }

    if (state.tone === "error") {
      return "border-pink-400/40 bg-pink-500/10 text-pink-100";
    }

    return "border-purple-300/30 bg-purple-500/10 text-purple-100";
  }, [state.tone]);

  return (
    <Card className="w-full max-w-md p-6 sm:p-7">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-200">
        <Sparkles className="h-3.5 w-3.5" />
        {isLogin ? "Welcome Back" : "Join Jigrify"}
      </div>

      <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">
        {isLogin ? "Log in to your world" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm text-slate-300 sm:text-[15px]">
        {isLogin
          ? "Pick up where you left off and jump back into your feed."
          : "Start with your email, then we’ll set up your public profile in the next step."}
      </p>

      <form className="mt-6 space-y-4" action={formAction} noValidate>
        {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
        <div>
          <label htmlFor={`${mode}-email`} className="mb-1.5 block text-xs font-medium text-slate-300">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id={`${mode}-email`}
              placeholder="you@example.com"
              type="email"
              name="email"
              autoComplete="email"
              className="pl-10"
            />
          </div>
          {state.fieldErrors?.email?.[0] ? (
            <p className="mt-1 text-xs text-pink-300">{state.fieldErrors.email[0]}</p>
          ) : null}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor={`${mode}-password`} className="block text-xs font-medium text-slate-300">
              Password
            </label>
            {isLogin ? (
              <button
                type="button"
                className="text-xs font-medium text-blue-200 transition hover:text-blue-100"
              >
                Forgot password?
              </button>
            ) : null}
          </div>
          <div className="relative">
            <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id={`${mode}-password`}
              type={showPassword ? "text" : "password"}
              placeholder={isLogin ? "Enter your password" : "At least 6 characters"}
              name="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="px-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {state.fieldErrors?.password?.[0] ? (
            <p className="mt-1 text-xs text-pink-300">{state.fieldErrors.password[0]}</p>
          ) : null}
          {!isLogin ? (
            <p className="mt-1 text-xs text-slate-400">Use 6+ characters to keep your account secure.</p>
          ) : null}
        </div>

        <Button type="submit" className="mt-1 w-full" disabled={pending}>
          {pending ? "Please wait..." : isLogin ? "Log in" : "Create account"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-white/15" />
        <span>or continue with</span>
        <span className="h-px flex-1 bg-white/15" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full">
          Continue with Apple
        </Button>
      </div>

      <p className="text-xs text-slate-400">
        {isLogin ? "New here? " : "Already have an account? "}
        <Link
          href={isLogin ? "/auth/signup" : "/auth/login"}
          className="font-semibold text-blue-300"
        >
          {isLogin ? "Create account" : "Log in"}
        </Link>
      </p>

      {state.message ? (
        <p className={`mt-4 rounded-xl border px-3 py-2 text-xs ${messageToneClass}`}>{state.message}</p>
      ) : null}
    </Card>
  );
}
