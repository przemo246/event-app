import { Loader2 } from "lucide-react";

import { cn } from "@/libs/react-kit/cn";

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type SpinnerProps = {
  className?: string;
  label?: string;
};

/* =============================================================================
 * Spinner
 * ============================================================================= */

export const Spinner = ({ className, label = "Wczytywanie..." }: SpinnerProps) => {
  return (
    <div className="flex justify-center py-12">
      <Loader2
        className={cn("size-6 animate-spin text-muted-foreground", className)}
        aria-label={label}
      />
    </div>
  );
};
