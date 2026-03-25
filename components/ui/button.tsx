import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-3 text-white shadow-[0_8px_30px_rgba(139,92,246,0.45)] hover:brightness-110",
        ghost: "px-4 py-2 text-slate-200 hover:bg-white/10",
        outline:
          "border border-white/20 bg-white/5 px-4 py-2 text-slate-100 hover:bg-white/10",
      },
      size: {
        sm: "h-9",
        md: "h-11",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
