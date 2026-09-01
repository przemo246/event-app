"use client";

import { useContext } from "../context";
import { CategoryFilter } from "../fields/category-filter";
import { DateRangeFilter } from "../fields/date-range-filter";
import { LocationFilter } from "../fields/location-filter";

export const FilterPanel = () => {
  const ctx = useContext();

  return (
    <>
      <LocationFilter />
      <CategoryFilter />
      <div className="sm:col-span-3">
        <DateRangeFilter />
      </div>
      <button
        type="button"
        onClick={ctx.resetFilters}
        className="w-fit text-sm font-medium text-muted-foreground hover:text-foreground sm:col-span-3"
      >
        Wyczyść filtry
      </button>
    </>
  );
};
