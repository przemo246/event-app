"use client";

import { useContext } from "./context";
import { CategoryField } from "./fields/category-field";
import { DateTimeField } from "./fields/date-time-field";
import { LocationField } from "./fields/location-field";
import { NameField } from "./fields/name-field";
import { SearchSubmitButton } from "./fields/search-submit-button";
import { QuickSearchShortcuts } from "./quick-search-shortcuts";

export const HeroSearchForm = () => {
  const facade = useContext();

  const name = facade.useName();
  const dateFrom = facade.useDateFrom();
  const dateTo = facade.useDateTo();
  const location = facade.useLocation();
  const category = facade.useCategory();
  const dateRangeError = facade.useDateRangeError();

  return (
    <div className="rounded-xl border border-border bg-card p-5 text-left shadow-lg sm:p-6">
      <QuickSearchShortcuts />

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <NameField value={name} onChange={facade.setName} />
        <LocationField value={location} onChange={facade.setLocation} />
        <CategoryField value={category} onChange={facade.setCategory} />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Data i godzina
          </span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DateTimeField
              label="Data i godzina od"
              prefix="od"
              value={dateFrom}
              onChange={facade.setDateFrom}
              errorMessage={dateRangeError}
            />
            <DateTimeField
              label="Data i godzina do"
              prefix="do"
              value={dateTo}
              onChange={facade.setDateTo}
              errorMessage={dateRangeError}
            />
          </div>
        </div>
        <SearchSubmitButton
          onPress={facade.submit}
          isDisabled={Boolean(dateRangeError)}
        />
      </div>
    </div>
  );
};
