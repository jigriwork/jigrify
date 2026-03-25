import { redirect } from "next/navigation";

import { OnboardingForm } from "@/components/auth/onboarding-form";
import { getCurrentViewer } from "@/lib/supabase/profile";

export default async function OnboardingPage() {
  const { user, profile } = await getCurrentViewer();

  if (!user) {
    redirect("/auth/login");
  }

  if (profile?.username) {
    redirect("/app/home");
  }

  return (
    <section className="mx-auto w-full max-w-2xl">
      <OnboardingForm
        defaultName={profile?.full_name ?? ""}
        defaultBio={profile?.bio ?? ""}
      />
    </section>
  );
}