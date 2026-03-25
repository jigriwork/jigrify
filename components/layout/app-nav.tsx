"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { appNavItems } from "@/lib/navigation";
import { cn } from "@/utils/cn";

export function AppSidebar() {
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
