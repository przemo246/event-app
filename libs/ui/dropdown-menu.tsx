"use client";

import type { ComponentProps } from "react";
import { Menu, MenuItem, MenuTrigger, Popover } from "react-aria-components";

import { cn } from "@/libs/react-kit/cn";

import { Button } from "./button";

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type DropdownMenuRootProps = ComponentProps<typeof MenuTrigger>;
export type DropdownMenuTriggerProps = ComponentProps<typeof Button>;

export type DropdownMenuContentProps = ComponentProps<typeof Menu> & {
  className?: string;
};

export type DropdownMenuItemProps = ComponentProps<typeof MenuItem> & {
  className?: string;
};

/* =============================================================================
 * Root
 * ============================================================================= */

export const DropdownMenuRoot = MenuTrigger;

/* =============================================================================
 * Trigger
 * ============================================================================= */

export const DropdownMenuTrigger = Button;

/* =============================================================================
 * Content
 * ============================================================================= */

export const DropdownMenuContent = ({
  className,
  ...props
}: DropdownMenuContentProps) => {
  return (
    <Popover
      className={cn(
        "min-w-44 rounded-md border border-border bg-card shadow-md",
        className,
      )}
    >
      <Menu className="p-1 outline-none" {...props} />
    </Popover>
  );
};

/* =============================================================================
 * Item
 * ============================================================================= */

export const DropdownMenuItem = ({
  className,
  ...props
}: DropdownMenuItemProps) => {
  return (
    <MenuItem
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm font-normal text-card-foreground data-focused:bg-accent data-focused:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
};

/* =============================================================================
 * Compound Export
 * ============================================================================= */

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
