"use client";

import { SelectField } from "@/libs/ui/select";
import { EVENT_CATEGORY_OPTIONS } from "./event-category-labels";
import type { EventCategory } from "../../domain/models";

export type CategoryFieldProps = {
  value: EventCategory | "";
  onChange: (value: EventCategory | "") => void;
  errorMessage?: string;
};

export const CategoryField = ({
  value,
  onChange,
  errorMessage,
}: CategoryFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <SelectField
        label="Kategoria"
        options={EVENT_CATEGORY_OPTIONS}
        value={value}
        onChange={onChange}
      />
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
};
