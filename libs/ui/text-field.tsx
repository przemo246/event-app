"use client";

import type { ReactNode } from "react";
import { Input, Label, TextField as AriaTextField } from "react-aria-components";

import { cn } from "@/libs/react-kit/cn";

export type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  endAdornment?: ReactNode;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  showLabel?: boolean;
  className?: string;
};

export const TextField = ({
  label,
  value,
  onChange,
  placeholder,
  icon,
  endAdornment,
  type = "text",
  autoComplete,
  showLabel = false,
  className,
}: TextFieldProps) => {
  return (
    <AriaTextField
      type={type}
      value={value}
      onChange={onChange}
      className={cn("flex flex-col gap-1", className)}
    >
      <Label className={showLabel ? "text-sm font-medium text-foreground" : "sr-only"}>
        {label}
      </Label>
      {icon || endAdornment ? (
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-ring">
          {icon}
          <Input
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="w-full text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {endAdornment}
        </div>
      ) : (
        <Input
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </AriaTextField>
  );
};
