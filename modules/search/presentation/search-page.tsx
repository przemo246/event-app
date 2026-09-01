"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "./context";
import { buildSearchParams } from "../configuration/validation";
import { SearchBar } from "./components/search-bar";
import { FilterPanel } from "./components/filter-panel";
import { QuickDateShortcuts } from "./components/quick-date-shortcuts";
import { SortDropdown } from "./components/sort-dropdown";
import { EventList } from "./components/event-list";
import { LoadMoreButton } from "./components/load-more-button";

export const SearchPage = () => {
  const ctx = useContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const name = ctx.useName();
  const location = ctx.useLocation();
  const dateFrom = ctx.useDateFrom();
  const dateTo = ctx.useDateTo();
  const category = ctx.useCategory();
  const sortBy = ctx.useSortBy();
  const sortDir = ctx.useSortDir();

  useEffect(() => {
    ctx.syncFromUrl(new URLSearchParams(searchParamsString));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsString]);

  useEffect(() => {
    const nextQuery = buildSearchParams({
      name,
      location,
      dateFrom,
      dateTo,
      category,
      sortBy,
      sortDir,
    }).toString();

    if (nextQuery === searchParamsString) return;

    const timeout = setTimeout(() => {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, location, dateFrom, dateTo, category, sortBy, sortDir]);

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-card p-5 text-left shadow-lg sm:p-6">
        <QuickDateShortcuts />

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <SearchBar />
          <FilterPanel />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <SortDropdown />
      </div>

      <EventList />
      <LoadMoreButton />
    </div>
  );
};
