"use client";

import { SelectField } from "@/libs/ui/select";
import { EVENT_CATEGORY_OPTIONS } from "../configuration/event-category-labels";
import type { EventCategory } from "../domain/models";

const ALL_CATEGORIES_VALUE = "all" as const;
const ALL_CATEGORIES_OPTION = {
  value: ALL_CATEGORIES_VALUE,
  label: "Wszystkie kategorie",
};

export type CategorySelectProps = {
  value: EventCategory | "";
  onChange: (value: EventCategory | "") => void;
  includeAllOption?: boolean;
  hideLabel?: boolean;
  errorMessage?: string;
};

export const CategorySelect = ({
  value,
  onChange,
  includeAllOption = false,
  hideLabel = false,
  errorMessage,
}: CategorySelectProps) => {
  const options = includeAllOption
    ? [ALL_CATEGORIES_OPTION, ...EVENT_CATEGORY_OPTIONS]
    : EVENT_CATEGORY_OPTIONS;

  return (
    <div className="flex flex-col gap-1">
      <SelectField
        label="Kategoria"
        hideLabel={hideLabel}
        options={options}
        value={includeAllOption ? value || ALL_CATEGORIES_VALUE : value}
        onChange={(key) =>
          onChange(
            includeAllOption && key === ALL_CATEGORIES_VALUE ? "" : (key as EventCategory),
          )
        }
      />
      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
    </div>
  );
};
