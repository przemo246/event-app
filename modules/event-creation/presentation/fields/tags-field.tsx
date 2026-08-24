"use client";

import { TagsField as TagsFieldPrimitive } from "@/libs/ui/tags-field";

export type TagsFieldProps = {
  value: string[];
  onChange: (value: string[]) => void;
  suggestions: string[];
  onQueryChange: (query: string) => void;
};

export const TagsField = ({
  value,
  onChange,
  suggestions,
  onQueryChange,
}: TagsFieldProps) => {
  return (
    <TagsFieldPrimitive
      label="Tagi"
      showLabel
      value={value}
      onChange={onChange}
      suggestions={suggestions}
      onQueryChange={onQueryChange}
      placeholder="Wpisz tag i naciśnij Enter"
    />
  );
};
