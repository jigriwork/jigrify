import { getCurrentViewer } from "@/lib/supabase/profile";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const statCards = [
  { label: "Followers", value: "42.8K" },
  { label: "Following", value: "389" },
  { label: "Reels", value: "127" },
];

export default async function ProfilePage() {
  const { user, profile, profileErrorMessage } = await getCurrentViewer();

  const displayName = profile?.full_name ?? user?.email ?? "Creator";
  const handle = profile?.username ? `@${profile.username}` : "@newcreator";
  const bio = profile?.bio ?? "Tell your story and let people know what you’re building.";

  return (
    <section className="mx-auto max-w-3xl space-y-5">
      {profileErrorMessage ? (
        <div className="rounded-2xl border border-amber-300/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {profileErrorMessage}
        </div>
      ) : null}
      <Card className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              src={profile?.avatar_url ?? undefined}
              fallback={displayName}
              className="h-16 w-16 text-base"
            />
            <div>
              <h2 className="text-xl font-bold text-white">{displayName}</h2>
              <p className="text-sm text-slate-300">{handle} • Creator</p>
            </div>
          </div>
          <p className="max-w-sm text-sm text-slate-200">{bio}</p>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-4 text-center">
            <p className="text-xl font-black text-white">{stat.value}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <h3 className="text-lg font-semibold text-white">Bio vibes</h3>
        <p className="mt-2 text-sm text-slate-300">{bio}</p>
      </Card>
    </section>
  );
}
