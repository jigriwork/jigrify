"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const titles: Record<string, string> = {
  "/app/home": "For You",
  "/app/explore": "Explore",
  "/app/create": "Create",
  "/app/inbox": "Inbox",
  "/app/profile": "Profile",
};

type AppTopbarProps = {
  userDisplayName: string;
  username?: string | null;
  avatarUrl?: string | null;
};

export function AppTopbar({ userDisplayName, username, avatarUrl }: AppTopbarProps) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "JIGRIFY";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-lg font-bold text-white sm:text-xl">{title}</h1>
        <div className="hidden w-full max-w-sm items-center gap-2 md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <Input placeholder="Search creators, reels, rooms..." className="h-10" />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-200 hover:bg-white/10"
          >
            <Bell className="h-4 w-4" />
          </button>
          <div className="hidden items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-2 py-1.5 sm:flex">
            <Avatar src={avatarUrl ?? undefined} fallback={userDisplayName} className="h-8 w-8" />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">{userDisplayName}</p>
              <p className="truncate text-[11px] text-slate-400">
                {username ? `@${username}` : "Complete profile"}
              </p>
            </div>
          </div>
          <form action="/auth/logout" method="post">
            <button
              type="submit"
              className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-200 hover:bg-white/10"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
