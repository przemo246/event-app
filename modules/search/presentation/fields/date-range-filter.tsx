"use client";

import { DatePickerField } from "@/libs/ui/date-picker";
import { useContext } from "../context";

export const DateRangeFilter = () => {
  const ctx = useContext();
  const dateFrom = ctx.useDateFrom();
  const dateTo = ctx.useDateTo();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <DatePickerField
        label="Data i godzina od"
        prefix="od"
        value={dateFrom}
        onChange={ctx.setDateFrom}
      />
      <DatePickerField
        label="Data i godzina do"
        prefix="do"
        value={dateTo}
        onChange={ctx.setDateTo}
      />
    </div>
  );
};
