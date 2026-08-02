"use client";

import type { ComponentProps, ReactNode } from "react";
import {
  Focusable,
  OverlayArrow,
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
} from "react-aria-components";

import { cn } from "@/libs/react-kit/cn";

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type TooltipRootProps = ComponentProps<typeof AriaTooltipTrigger>;

export type TooltipTriggerProps = ComponentProps<typeof Focusable>;

export type TooltipContentProps = Omit<
  ComponentProps<typeof AriaTooltip>,
  "className" | "children"
> & {
  className?: string;
  children: ReactNode;
};

/* =============================================================================
 * Root
 * ============================================================================= */

export const TooltipRoot = AriaTooltipTrigger;

/* =============================================================================
 * Trigger
 * ============================================================================= */

export const TooltipTrigger = Focusable;

/* =============================================================================
 * Content
 * ============================================================================= */

export const TooltipContent = ({
  className,
  children,
  offset = 8,
  ...props
}: TooltipContentProps) => {
  return (
    <AriaTooltip
      offset={offset}
      className={cn(
        "rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-md",
        className,
      )}
      {...props}
    >
      {children}
      <OverlayArrow className="data-[placement=bottom]:rotate-180 data-[placement=left]:-rotate-90 data-[placement=right]:rotate-90">
        <svg width={8} height={4} viewBox="0 0 8 4" className="fill-foreground">
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
    </AriaTooltip>
  );
};

/* =============================================================================
 * Compound Export
 * ============================================================================= */

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};
