"use client";

import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";

const titles: Record<string, string> = {
  "/app/home": "For You",
  "/app/explore": "Explore",
  "/app/create": "Create",
  "/app/inbox": "Inbox",
  "/app/profile": "Profile",
};

export function AppTopbar() {
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
        <button
          type="button"
          className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-200 hover:bg-white/10"
        >
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
