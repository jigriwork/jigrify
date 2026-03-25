import Link from "next/link";
import { MessageCircle, Radio, Sparkles, Video } from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Posts",
    desc: "Stylish visual posts with reactions, collabs, and creator-first storytelling.",
    icon: Sparkles,
  },
  {
    title: "Reels",
    desc: "Short-form clips with punchy transitions and high-retention interactions.",
    icon: Video,
  },
  {
    title: "Chat",
    desc: "Lightning-fast DMs and group convos with immersive room presence.",
    icon: MessageCircle,
  },
  {
    title: "Rooms",
    desc: "Vibe-based communities for creators, friends, fandoms, and study squads.",
    icon: Radio,
  },
];

export default function Home() {
  return (
    <div className="pb-20">
      <SiteHeader />

      <section className="section-shell pt-16 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-purple-300">NEXT-GEN SOCIAL</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">
              Find your vibe.
              <br />
              <span className="gradient-text">Share your world.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
              JIGRIFY blends reels, posts, chats, and live rooms into one premium,
              vibrant experience crafted for Gen-Z speed and creativity.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/auth/signup">
                <Button size="lg">Start Free</Button>
              </Link>
              <Link href="/app/home">
                <Button variant="outline" size="lg">
                  Open Demo App
                </Button>
              </Link>
            </div>
          </div>

          <Card className="relative overflow-hidden p-6">
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-pink-500/35 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-blue-500/30 blur-3xl" />
            <div className="relative space-y-3">
              <div className="rounded-xl border border-white/15 bg-black/35 p-4">
                <p className="text-xs text-slate-400">Trending Reel</p>
                <p className="mt-1 text-sm font-semibold text-white">#MidnightCampus edits • 2.3M views</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/35 p-4">
                <p className="text-xs text-slate-400">Live Room</p>
                <p className="mt-1 text-sm font-semibold text-white">Design Roast Night • 187 online</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/35 p-4">
                <p className="text-xs text-slate-400">DM Buzz</p>
                <p className="mt-1 text-sm font-semibold text-white">12 unread • Creators Hub</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="features" className="section-shell mt-18 sm:mt-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Everything in one app</h2>
          <p className="text-sm text-slate-400">Built for speed, glow, and scale.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="space-y-3">
              <div className="inline-flex rounded-xl border border-white/15 bg-white/10 p-2">
                <feature.icon className="h-4 w-4 text-purple-200" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-slate-300">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
