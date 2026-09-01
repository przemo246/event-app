import { EVENT_CATEGORY_OPTIONS } from "@/shared/event-category/configuration/event-category-labels";
import type { EventCategory } from "@/shared/event-category/domain/models";
import type { SearchFilters, SortBy, SortDir } from "../domain/models";

export const VALIDATION_ERROR_MAP = {
  searchFailed: "Nie udało się wyszukać wydarzeń. Spróbuj ponownie.",
} as const;

const VALID_CATEGORIES = new Set<string>(
  EVENT_CATEGORY_OPTIONS.map((option) => option.value),
);
const VALID_SORT_BY: SortBy[] = ["date", "name"];
const VALID_SORT_DIR: SortDir[] = ["asc", "desc"];

const asCategory = (value: string | null): EventCategory | null =>
  value && VALID_CATEGORIES.has(value) ? (value as EventCategory) : null;

const asSortBy = (value: string | null): SortBy =>
  VALID_SORT_BY.includes(value as SortBy) ? (value as SortBy) : "date";

const asSortDir = (value: string | null): SortDir =>
  VALID_SORT_DIR.includes(value as SortDir) ? (value as SortDir) : "asc";

export const parseFiltersFromUrl = (params: URLSearchParams): SearchFilters => ({
  name: params.get("name") ?? "",
  location: params.get("location") ?? "",
  dateFrom: params.get("dateFrom"),
  dateTo: params.get("dateTo"),
  category: asCategory(params.get("category")),
  sortBy: asSortBy(params.get("sortBy")),
  sortDir: asSortDir(params.get("sortDir")),
});

export const buildSearchParams = (filters: SearchFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.name) params.set("name", filters.name);
  if (filters.location) params.set("location", filters.location);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  if (filters.category) params.set("category", filters.category);
  if (filters.sortBy !== "date") params.set("sortBy", filters.sortBy);
  if (filters.sortDir !== "asc") params.set("sortDir", filters.sortDir);

  return params;
};
