"use client";

import { useContext } from "./context";
import { QUICK_DATE_RANGES } from "../configuration/quick-date-ranges";

export const QuickSearchShortcuts = () => {
  const facade = useContext();

  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_DATE_RANGES.map((range) => (
        <button
          key={range.label}
          type="button"
          onClick={() => {
            const { from, to } = range.getRange();
            facade.setDateFrom(from);
            facade.setDateTo(to);
          }}
          className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted"
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};
