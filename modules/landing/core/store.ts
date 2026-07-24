import { atom, computed } from "@/libs/react-kit/supa-store";
import type { CategoryValue } from "../domain/models";
import { isDateRangeValid, VALIDATION_ERROR_MAP } from "../configuration/validation";

export const createStore = () => {
  const $name = atom("");
  const $dateFrom = atom<string | null>(null);
  const $dateTo = atom<string | null>(null);
  const $location = atom("");
  const $category = atom<CategoryValue | null>(null);

  return {
    $name,
    $dateFrom,
    $dateTo,
    $location,
    $category,
    $dateRangeError: computed(
      [$dateFrom, $dateTo],
      (dateFrom, dateTo) =>
        isDateRangeValid(dateFrom, dateTo) ? null : VALIDATION_ERROR_MAP.dateRange,
    ),
  };
};

export type Store = ReturnType<typeof createStore>;
