import React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brass-500 text-stage-950 hover:bg-brass-400 shadow-glow active:scale-[0.98]",
  secondary:
    "bg-stage-800 text-ivory-100 hover:bg-stage-700 dark:bg-white/10 dark:hover:bg-white/[0.15]",
  ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-current",
  outline:
    "bg-transparent border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 text-current",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-sm rounded-lg",
  md: "h-10 px-4 text-sm rounded-xl",
  lg: "h-12 px-6 text-base rounded-xl",
  icon: "h-10 w-10 rounded-xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
