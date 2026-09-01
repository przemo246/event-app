"use client";

import { CategorySelect } from "@/shared/event-category/presentation/category-select";
import { useContext } from "../context";

export const CategoryFilter = () => {
  const ctx = useContext();
  const category = ctx.useCategory();

  return (
    <CategorySelect
      value={category ?? ""}
      onChange={(next) => ctx.setCategory(next || null)}
      includeAllOption
      hideLabel
    />
  );
};
