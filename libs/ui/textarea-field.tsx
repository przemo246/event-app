"use client";

import { Label, TextArea, TextField as AriaTextField } from "react-aria-components";

import { cn } from "@/libs/react-kit/cn";

export type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showLabel?: boolean;
  rows?: number;
  className?: string;
};

export const TextareaField = ({
  label,
  value,
  onChange,
  placeholder,
  showLabel = false,
  rows = 4,
  className,
}: TextareaFieldProps) => {
  return (
    <AriaTextField
      value={value}
      onChange={onChange}
      className={cn("flex flex-col gap-1", className)}
    >
      <Label className={showLabel ? "text-sm font-medium text-foreground" : "sr-only"}>
        {label}
      </Label>
      <TextArea
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
      />
    </AriaTextField>
  );
};
