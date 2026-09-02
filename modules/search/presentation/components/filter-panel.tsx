"use client";

import { useContext } from "../context";
import { CategoryFilter } from "../fields/category-filter";
import { DateRangeFilter } from "../fields/date-range-filter";
import { LocationFilter } from "../fields/location-filter";
import { Button } from "@/libs/ui/button";

export const FilterPanel = () => {
  const ctx = useContext();

  return (
    <>
      <LocationFilter />
      <CategoryFilter />
      <div className="sm:col-span-3">
        <DateRangeFilter />
      </div>
      <Button
        variant="ghost"
        className="w-fit text-sm"
        onClick={ctx.resetFilters}
      >
        Wyczyść filtry
      </Button>
    </>
  );
};
