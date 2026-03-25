import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-400/25",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
