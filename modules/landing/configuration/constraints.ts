import { EVENT_CATEGORY_OPTIONS } from "@/shared/event-category/configuration/event-category-labels";

export const FEATURE_NAME = "Landing";

export const ALL_CATEGORIES_VALUE = "all" as const;

export const ALL_CATEGORIES_OPTION = {
  value: ALL_CATEGORIES_VALUE,
  label: "Wszystkie kategorie",
};

export const CATEGORY_OPTIONS = EVENT_CATEGORY_OPTIONS;

export const SEARCH_RESULTS_PATH = "/search" as const;
