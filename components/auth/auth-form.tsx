"use client";

import Link from "next/link";
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

      <form className="mt-6 space-y-4" action={formAction}>
        {nextPath ? <input type="hidden" name="next" value={nextPath} /> : null}
        <div>
          <Input placeholder="Email" type="email" name="email" autoComplete="email" />
          {state.fieldErrors?.email?.[0] ? (
            <p className="mt-1 text-xs text-pink-300">{state.fieldErrors.email[0]}</p>
          ) : null}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
          {state.fieldErrors?.password?.[0] ? (
            <p className="mt-1 text-xs text-pink-300">{state.fieldErrors.password[0]}</p>
          ) : null}
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Please wait..." : mode === "login" ? "Login" : "Sign up"}
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

      {state.message ? <p className="mt-3 text-xs text-purple-200">{state.message}</p> : null}
    </Card>
  );
}
