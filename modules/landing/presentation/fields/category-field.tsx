"use client";

import { CategorySelect } from "@/shared/event-category/presentation/category-select";
import type { EventCategory } from "@/shared/event-category/domain/models";

type CategoryFieldProps = {
  value: EventCategory | null;
  onChange: (value: EventCategory | null) => void;
};

export const CategoryField = ({ value, onChange }: CategoryFieldProps) => {
  return (
    <CategorySelect
      value={value ?? ""}
      onChange={(next) => onChange(next || null)}
      includeAllOption
      hideLabel
    />
  );
};
