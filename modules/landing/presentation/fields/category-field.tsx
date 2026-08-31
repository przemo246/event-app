"use client";

import { SelectField } from "@/libs/ui/select";
import {
  ALL_CATEGORIES_OPTION,
  CATEGORY_OPTIONS,
} from "../../configuration/constraints";
import type { CategoryValue } from "../../domain/models";

type CategoryFieldProps = {
  value: CategoryValue | null;
  onChange: (value: CategoryValue | null) => void;
};

const OPTIONS = [ALL_CATEGORIES_OPTION, ...CATEGORY_OPTIONS];

export const CategoryField = ({ value, onChange }: CategoryFieldProps) => {
  return (
    <SelectField
      label="Kategoria"
      options={OPTIONS}
      hideLabel
      value={value ?? ALL_CATEGORIES_OPTION.value}
      onChange={(key) =>
        onChange(
          key === ALL_CATEGORIES_OPTION.value ? null : (key as CategoryValue),
        )
      }
    />
  );
};
