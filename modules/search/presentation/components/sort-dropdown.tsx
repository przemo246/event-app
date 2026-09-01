"use client";

import { SelectField } from "@/libs/ui/select";
import type { SortBy, SortDir } from "../../domain/models";
import { useContext } from "../context";

type SortValue = `${SortBy}:${SortDir}`;

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "date:asc", label: "Data: najbliższe" },
  { value: "date:desc", label: "Data: najdalsze" },
  { value: "name:asc", label: "Nazwa: A-Z" },
  { value: "name:desc", label: "Nazwa: Z-A" },
];

export const SortDropdown = () => {
  const ctx = useContext();
  const sortBy = ctx.useSortBy();
  const sortDir = ctx.useSortDir();
  const value: SortValue = `${sortBy}:${sortDir}`;

  return (
    <SelectField
      label="Sortuj według"
      options={SORT_OPTIONS}
      value={value}
      onChange={(next) => {
        const [nextSortBy, nextSortDir] = next.split(":") as [SortBy, SortDir];
        ctx.setSort(nextSortBy, nextSortDir);
      }}
    />
  );
};
