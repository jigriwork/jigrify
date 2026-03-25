"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { appNavItems } from "@/lib/navigation";
import { cn } from "@/utils/cn";

type AppSidebarProps = {
  userDisplayName: string;
  username?: string | null;
  avatarUrl?: string | null;
};

export function AppSidebar({ userDisplayName, username, avatarUrl }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="glass hidden w-72 shrink-0 border-r border-white/10 p-5 lg:block">
      <Link href="/app/home" className="mb-8 inline-flex text-2xl font-black tracking-wide">
        <span className="gradient-text">JIGRIFY</span>
      </Link>

      <nav className="space-y-2">
        {appNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white",
                isActive &&
                  "bg-gradient-to-r from-blue-500/25 via-purple-500/25 to-pink-500/25 text-white",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-3">
        <div className="flex items-center gap-3">
          <Avatar src={avatarUrl ?? undefined} fallback={userDisplayName} className="h-10 w-10" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{userDisplayName}</p>
            <p className="truncate text-xs text-slate-400">
              {username ? `@${username}` : "Finish setup"}
            </p>
          </div>
        </div>
        <form action="/auth/logout" method="post" className="mt-3">
          <Button variant="outline" className="w-full">
            Sign out
          </Button>
        </form>
      </div>
    </aside>
  );
}

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="glass fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-white/15 p-2 lg:hidden">
      <ul className="grid grid-cols-5">
        {appNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] text-slate-300",
                  isActive && "bg-white/10 text-white",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
