import type { ComponentProps } from "react";

import { cn } from "@/libs/react-kit/cn";

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "solid" | "ghost";
};

/* =============================================================================
 * Button
 * ============================================================================= */

export const Button = ({ variant = "solid", className, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-1.5",
        "rounded-md border border-transparent px-6 py-3",
        "text-[15px] font-bold",
        "transition-colors duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:opacity-50",
        variant === "ghost"
          ? "border-accent bg-transparent text-accent hover:bg-accent/10"
          : "bg-accent text-accent-foreground hover:opacity-90",
        className,
      )}
      {...props}
    />
  );
};
