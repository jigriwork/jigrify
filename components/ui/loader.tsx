import { cn } from "@/utils/cn";

export function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-8 w-8 animate-spin rounded-full border-2 border-purple-300/40 border-t-pink-400",
        className,
      )}
    />
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-white/5 via-white/10 to-white/5",
        className,
      )}
    />
  );
}
