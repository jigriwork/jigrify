import Link from "next/link";

import { Card } from "@/components/ui/card";

const quickRoutes = [
  { href: "/app/home", label: "Home feed" },
  { href: "/app/explore", label: "Explore grid" },
  { href: "/app/create", label: "Create studio" },
  { href: "/app/inbox", label: "Inbox" },
  { href: "/app/profile", label: "Profile" },
];

export default function AppRootPage() {
  return (
    <section className="space-y-5">
      <Card>
        <p className="text-xs uppercase tracking-[0.2em] text-purple-300">Your space</p>
        <h2 className="mt-2 text-3xl font-black text-white">Welcome back to JIGRIFY</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          Jump between your key spaces and pick up where you left off.
        </p>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {quickRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="glass rounded-2xl border border-white/15 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/12"
          >
            {route.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
