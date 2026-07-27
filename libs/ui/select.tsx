"use client";

import type { Key } from "react-aria-components";
import { ChevronDown } from "lucide-react";
import {
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from "react-aria-components";

import { cn } from "@/libs/react-kit/cn";
import { Button } from "@/libs/ui/button";

export type SelectFieldOption<T extends Key> = {
  value: T;
  label: string;
};

export type SelectFieldProps<T extends Key> = {
  label: string;
  options: SelectFieldOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export const SelectField = <T extends Key>({
  label,
  options,
  value,
  onChange,
  className,
}: SelectFieldProps<T>) => {
  return (
    <AriaSelect
      value={value}
      onChange={(key) => onChange(key as T)}
      className={cn("flex flex-col gap-1", className)}
    >
      <Label className="sr-only">{label}</Label>
      <Button className="justify-between gap-2 border-border bg-background px-4 py-3 text-left text-sm font-normal text-foreground hover:opacity-100">
        <SelectValue />
        <ChevronDown className="size-4 text-muted-foreground" />
      </Button>
      <Popover className="w-(--trigger-width) rounded-md border border-border bg-card shadow-md">
        <ListBox items={options}>
          {(option) => (
            <ListBoxItem
              id={option.value}
              className="cursor-pointer px-3 py-2 text-sm font-normal text-card-foreground data-focused:bg-accent data-focused:text-accent-foreground"
            >
              {option.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
};
