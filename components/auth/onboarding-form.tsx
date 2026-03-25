"use client";

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
    <Card className="p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.22em] text-purple-300">PHASE 2A ONBOARDING</p>
      <h1 className="mt-2 text-3xl font-black text-white">Set up your JIGRIFY profile</h1>
      <p className="mt-2 text-sm text-slate-300">
        Pick your public handle and personalize how people discover you.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <Input
            name="username"
            placeholder="username"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <p className="mt-1 text-xs text-slate-400">3–30 chars. Letters, numbers, underscores.</p>
          {state.fieldErrors?.username?.[0] ? (
            <p className="mt-1 text-xs text-pink-300">{state.fieldErrors.username[0]}</p>
          ) : null}
        </div>

        <div>
          <Input name="fullName" placeholder="Display name" defaultValue={defaultName} />
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
          {pending ? "Saving profile..." : "Complete profile"}
        </Button>
      </form>

      {state.message ? <p className="mt-3 text-xs text-purple-200">{state.message}</p> : null}
    </Card>
  );
}