import Image from "next/image";

import { Card } from "@/components/ui/card";
import { exploreTiles } from "@/lib/mock-data";

export default function ExplorePage() {
  return (
    <section className="space-y-5">
      <Card className="p-4">
        <h2 className="text-xl font-bold text-white">Trending Discoveries</h2>
        <p className="mt-1 text-sm text-slate-300">
          Swipe-worthy creators, viral cuts, and room invites curated for your taste.
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {exploreTiles.map((image, index) => (
          <div
            key={image}
            className="glass group relative overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={image}
              alt={`Explore tile ${index + 1}`}
              width={650}
              height={650}
              className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
