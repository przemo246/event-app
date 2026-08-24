"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input, Label, TextField as AriaTextField } from "react-aria-components";

import { cn } from "@/libs/react-kit/cn";

export type TagsFieldProps = {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  suggestions?: string[];
  onQueryChange?: (query: string) => void;
  placeholder?: string;
  showLabel?: boolean;
  className?: string;
};

export const TagsField = ({
  label,
  value,
  onChange,
  suggestions = [],
  onQueryChange,
  placeholder,
  showLabel = false,
  className,
}: TagsFieldProps) => {
  const [query, setQuery] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || value.includes(trimmed)) return;

    onChange([...value, trimmed]);
    setQuery("");
    onQueryChange?.("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((existing) => existing !== tag));
  };

  const handleQueryChange = (next: string) => {
    setQuery(next);
    onQueryChange?.(next);
  };

  const visibleSuggestions = suggestions.filter(
    (suggestion) => !value.includes(suggestion),
  );

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <AriaTextField value={query} onChange={handleQueryChange} className="flex flex-col gap-1">
        <Label className={showLabel ? "text-sm font-medium text-foreground" : "sr-only"}>
          {label}
        </Label>
        <Input
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              addTag(query);
            }
          }}
          className="rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
        />
      </AriaTextField>

      {value.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <li
              key={tag}
              className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Usuń tag ${tag}`}
                className="text-accent-foreground/70 hover:text-accent-foreground"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {visibleSuggestions.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {visibleSuggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => addTag(suggestion)}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                + {suggestion}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
