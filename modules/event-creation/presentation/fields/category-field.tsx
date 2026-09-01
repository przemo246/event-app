"use client";

import { CategorySelect } from "@/shared/event-category/presentation/category-select";
import type { EventCategory } from "../../domain/models";

export type CategoryFieldProps = {
  value: EventCategory | "";
  onChange: (value: EventCategory | "") => void;
  errorMessage?: string;
};

export const CategoryField = (props: CategoryFieldProps) => {
  return <CategorySelect {...props} />;
};
