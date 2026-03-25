"use client";

import { AtSign, Camera, Sparkles, UserRound } from "lucide-react";
import { useActionState } from "react";

import {
  completeOnboardingAction,
  type OnboardingState,
} from "@/app/app/onboarding/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type OnboardingFormProps = {
  defaultName?: string;
  defaultBio?: string;
};

const initialOnboardingState: OnboardingState = {
  message: null,
};

export function OnboardingForm({ defaultName = "", defaultBio = "" }: OnboardingFormProps) {
  const [state, formAction, pending] = useActionState(
    completeOnboardingAction,
    initialOnboardingState,
  );

  return (
    <Card className="relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-200">
          <Sparkles className="h-3.5 w-3.5" />
          Profile setup
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">Build your public identity</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-[15px]">
              Choose your handle and how people will recognize you across Jigrify.
            </p>
          </div>
          <div className="hidden rounded-xl border border-white/15 bg-white/8 px-3 py-2 text-right text-xs text-slate-300 sm:block">
            <p className="font-semibold text-white">Step 1 of 1</p>
            <p>Almost ready ✨</p>
          </div>
        </div>
      </div>

      <form action={formAction} className="relative mt-6 space-y-4" noValidate>
        <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
          <p className="text-xs font-medium text-slate-300">Profile photo (optional)</p>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-dashed border-white/25 bg-white/6 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <Camera className="h-4 w-4" />
            Add avatar
          </button>
        </div>

        <div>
          <label htmlFor="onboarding-username" className="mb-1.5 block text-xs font-medium text-slate-300">
            Username
          </label>
          <div className="relative">
            <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="onboarding-username"
            name="username"
            placeholder="yourhandle"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="pl-10"
          />
          </div>
          <p className="mt-1 text-xs text-slate-400">3–30 chars. Letters, numbers, underscores.</p>
          {state.fieldErrors?.username?.[0] ? (
            <p className="mt-1 text-xs text-pink-300">{state.fieldErrors.username[0]}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="onboarding-name" className="mb-1.5 block text-xs font-medium text-slate-300">
            Display name
          </label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="onboarding-name"
              name="fullName"
              placeholder="Your name"
              defaultValue={defaultName}
              className="pl-10"
            />
          </div>
          {state.fieldErrors?.fullName?.[0] ? (
            <p className="mt-1 text-xs text-pink-300">{state.fieldErrors.fullName[0]}</p>
          ) : null}
        </div>

        <div>
          <textarea
            name="bio"
            defaultValue={defaultBio}
            placeholder="Tell people what you're creating..."
            rows={4}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-400/25"
          />
          {state.fieldErrors?.bio?.[0] ? (
            <p className="mt-1 text-xs text-pink-300">{state.fieldErrors.bio[0]}</p>
          ) : null}
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Saving profile..." : "Enter Jigrify"}
        </Button>
      </form>

      {state.message ? (
        <p
          className={`mt-4 rounded-xl border px-3 py-2 text-xs ${
            state.tone === "error"
              ? "border-pink-400/40 bg-pink-500/10 text-pink-100"
              : "border-purple-300/30 bg-purple-500/10 text-purple-100"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </Card>
  );
}