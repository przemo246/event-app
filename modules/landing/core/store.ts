import { atom, computed } from "@/libs/react-kit/supa-store";
import type { EventCategory } from "@/shared/event-category/domain/models";
import type { PromotedEvent } from "../domain/models";
import { isDateRangeValid, VALIDATION_ERROR_MAP } from "../configuration/validation";

export const createStore = () => {
  const $name = atom("");
  const $dateFrom = atom<string | null>(null);
  const $dateTo = atom<string | null>(null);
  const $location = atom("");
  const $category = atom<EventCategory | null>(null);

  const $promotedEvents = atom<PromotedEvent[]>([]);
  const $isPromotedEventsLoading = atom(true);

  return {
    $name,
    $dateFrom,
    $dateTo,
    $location,
    $category,
    $promotedEvents,
    $isPromotedEventsLoading,
    $dateRangeError: computed(
      [$dateFrom, $dateTo],
      (dateFrom, dateTo) =>
        isDateRangeValid(dateFrom, dateTo) ? null : VALIDATION_ERROR_MAP.dateRange,
    ),
  };
};

export type Store = ReturnType<typeof createStore>;
