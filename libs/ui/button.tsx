"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";

import { cn } from "@/libs/react-kit/cn";

/* =============================================================================
 * Public Props
 * ============================================================================= */

export type ButtonVariant = "solid" | "ghost" | "outline";
export type ButtonLinkVariant = ButtonVariant | "underline";

export type ButtonProps = Omit<AriaButtonProps, "className"> & {
  variant?: ButtonVariant;
  className?: string;
};

export type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonLinkVariant;
};

/* =============================================================================
 * Variants
 * ============================================================================= */

export const buttonVariants = (
  variant: ButtonVariant = "solid",
  className?: string,
) => {
  return cn(
    "inline-flex items-center justify-center gap-1.5",
    "min-h-10 rounded-md px-5.5 py-2.5",
    "text-[15px] font-semibold",
    "transition-colors duration-150",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:opacity-50",
    variant === "outline"
      ? "border-2 border-accent bg-transparent text-accent hover:bg-accent/10"
      : variant === "ghost"
        ? "border-0 bg-transparent text-foreground hover:bg-foreground/10"
        : "border border-transparent bg-accent text-accent-foreground hover:opacity-90",
    className,
  );
};

export const buttonLinkVariants = (
  variant: ButtonLinkVariant = "underline",
  className?: string,
) => {
  if (variant === "underline") {
    return cn(
      "text-sm font-medium text-foreground no-underline hover:underline",
      className,
    );
  }

  return buttonVariants(variant, className);
};

/* =============================================================================
 * Button
 * ============================================================================= */

export const Button = ({
  variant = "solid",
  className,
  ...props
}: ButtonProps) => {
  return (
    <AriaButton className={buttonVariants(variant, className)} {...props} />
  );
};

/* =============================================================================
 * ButtonLink
 * ============================================================================= */

export const ButtonLink = ({
  variant = "underline",
  className,
  ...props
}: ButtonLinkProps) => {
  return <Link className={buttonLinkVariants(variant, className)} {...props} />;
};
