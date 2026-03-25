import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { inboxThreads } from "@/lib/mock-data";

export default function InboxPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-4">
      {inboxThreads.length === 0 ? (
        <EmptyState
          title="No messages yet"
          description="Start a chat, invite your friends, and light up your inbox."
        />
      ) : (
        inboxThreads.map((thread) => (
          <Card key={thread.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Avatar fallback={thread.name} />
              <div>
                <p className="text-sm font-semibold text-white">{thread.name}</p>
                <p className="text-xs text-slate-300">{thread.preview}</p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex h-2 w-2 rounded-full ${thread.status === "online" ? "bg-emerald-400" : "bg-amber-400"}`}
              />
              {thread.unread > 0 ? (
                <p className="mt-1 text-xs font-semibold text-pink-300">{thread.unread} new</p>
              ) : (
                <p className="mt-1 text-xs text-slate-400">All read</p>
              )}
            </div>
          </Card>
        ))
      )}
    </section>
  );
}
