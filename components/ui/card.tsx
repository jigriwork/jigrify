import { type HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass neon-border rounded-2xl p-5 shadow-[0_10px_35px_rgba(15,23,42,0.45)]",
        className,
      )}
      {...props}
    />
  );
}
