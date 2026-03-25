import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const statCards = [
  { label: "Followers", value: "42.8K" },
  { label: "Following", value: "389" },
  { label: "Reels", value: "127" },
];

export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <Card className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar fallback="ZK" className="h-16 w-16 text-base" />
            <div>
              <h2 className="text-xl font-bold text-white">Ziya Khan</h2>
              <p className="text-sm text-slate-300">@ziyaknights • Creator • Delhi</p>
            </div>
          </div>
          <p className="max-w-sm text-sm text-slate-200">
            Building daily reels around code, fashion, and chaotic campus life ✨
          </p>
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
        <p className="mt-2 text-sm text-slate-300">
          “Design loud. Ship fast. Stay kind.”
        </p>
      </Card>
    </section>
  );
}
