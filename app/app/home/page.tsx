import Image from "next/image";
import { Heart, MessageCircle, Send } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { feedPosts } from "@/lib/mock-data";

export default function AppHomePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {feedPosts.map((post) => (
        <Card key={post.id} className="space-y-4 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <Avatar fallback={post.avatar} />
            <div>
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <p className="text-xs text-slate-400">
                {post.handle} • {post.time}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-100">{post.caption}</p>

          <div className="relative overflow-hidden rounded-2xl border border-white/15">
            <Image
              src={post.image}
              alt={post.author}
              width={1200}
              height={760}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-300">
            <button type="button" className="inline-flex items-center gap-1.5 hover:text-white">
              <Heart className="h-4 w-4" /> {post.likes}
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 hover:text-white">
              <MessageCircle className="h-4 w-4" /> {post.comments}
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 hover:text-white">
              <Send className="h-4 w-4" /> Share
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
