import type { CategoryOption, CategoryValue } from "../domain/models";

export const FEATURE_NAME = "Landing";

export const ALL_CATEGORIES_OPTION: CategoryOption = {
  value: "all" as CategoryValue,
  label: "Wszystkie kategorie",
};

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: "music-entertainment" as CategoryValue, label: "Muzyka i rozrywka" },
  { value: "business-professional" as CategoryValue, label: "Biznes i praca" },
  { value: "food-drink" as CategoryValue, label: "Jedzenie i napoje" },
  { value: "sports-wellness" as CategoryValue, label: "Sport i zdrowie" },
  { value: "arts-culture" as CategoryValue, label: "Sztuka i kultura" },
  { value: "community-hobbies" as CategoryValue, label: "Społeczność i hobby" },
];

export const SEARCH_RESULTS_PATH = "/szukaj" as const;
