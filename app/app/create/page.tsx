"use client";

import { useState } from "react";
import { ImagePlus, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Sheet } from "@/components/ui/sheet";

export default function CreatePage() {
  const [openModal, setOpenModal] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Card className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Create something scroll-stopping</h2>
        <p className="text-sm text-slate-300">
          Draft a post, attach media, and choose whether it goes public, friends-only,
          or to a specific room.
        </p>

        <Input placeholder="Write your caption..." />
        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" className="justify-start">
            <ImagePlus className="h-4 w-4" /> Upload media
          </Button>
          <Button variant="outline" className="justify-start">
            <WandSparkles className="h-4 w-4" /> AI caption ideas
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setOpenModal(true)}>Preview post</Button>
          <Button variant="ghost" onClick={() => setOpenSheet(true)}>
            Audience settings
          </Button>
        </div>
      </Card>

      <Modal open={openModal} onClose={() => setOpenModal(false)} title="Post Preview">
        <p className="text-sm text-slate-200">
          Preview how your post feels before sharing. Publishing tools will be available soon.
        </p>
      </Modal>

      <Sheet open={openSheet} onClose={() => setOpenSheet(false)} title="Audience">
        <div className="space-y-3 text-sm text-slate-200">
          <p className="rounded-xl border border-white/10 bg-white/5 p-3">🌍 Public</p>
          <p className="rounded-xl border border-white/10 bg-white/5 p-3">👥 Followers only</p>
          <p className="rounded-xl border border-white/10 bg-white/5 p-3">🏠 Specific room</p>
        </div>
      </Sheet>
    </div>
  );
}
