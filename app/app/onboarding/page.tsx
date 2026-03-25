import { redirect } from "next/navigation";

import { OnboardingForm } from "@/components/auth/onboarding-form";
import { getCurrentViewer } from "@/lib/supabase/profile";

export default async function OnboardingPage() {
  const { user, profile, profileErrorMessage } = await getCurrentViewer();

  if (!user) {
    redirect("/auth/login");
  }

  if (profile?.username) {
    redirect("/app/home");
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-4">
      {profileErrorMessage ? (
        <div className="rounded-2xl border border-amber-300/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {profileErrorMessage}
        </div>
      ) : null}
      <OnboardingForm
        defaultName={profile?.full_name ?? ""}
        defaultBio={profile?.bio ?? ""}
      />
    </section>
  );
}