import { UserCircle2 } from "lucide-react";

import { cn } from "@/utils/cn";

type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
};

export function Avatar({ src, alt, fallback, className }: AvatarProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt ?? "avatar"} className={cn("h-10 w-10 rounded-full object-cover", className)} />;
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xs font-bold text-white",
        className,
      )}
    >
      {fallback ? fallback.slice(0, 2).toUpperCase() : <UserCircle2 className="h-5 w-5" />}
    </div>
  );
}
