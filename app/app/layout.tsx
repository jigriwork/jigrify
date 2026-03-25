import { getCurrentViewer } from "@/lib/supabase/profile";

import { AppBottomNav, AppSidebar } from "@/components/layout/app-nav";
import { AppTopbar } from "@/components/layout/app-topbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, profileErrorMessage } = await getCurrentViewer();

  return (
    <div className="min-h-dvh lg:flex">
      <AppSidebar
        userDisplayName={profile?.full_name ?? user?.email ?? "Creator"}
        username={profile?.username}
        avatarUrl={profile?.avatar_url}
      />
      <div className="flex min-h-dvh flex-1 flex-col">
        <AppTopbar
          userDisplayName={profile?.full_name ?? user?.email ?? "Creator"}
          username={profile?.username}
          avatarUrl={profile?.avatar_url}
        />
        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6">
          {profileErrorMessage ? (
            <div className="mb-4 rounded-2xl border border-amber-300/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              {profileErrorMessage}
            </div>
          ) : null}
          {children}
        </main>
      </div>
      <AppBottomNav />
    </div>
  );
}
