import { atom, computed } from "@/libs/react-kit/supa-store";
import type { EventCategory } from "@/shared/event-category/domain/models";
import type { SearchEvent, SearchFilters, SortBy, SortDir } from "../domain/models";

export const createStore = () => {
  const $name = atom("");
  const $location = atom("");
  const $dateFrom = atom<string | null>(null);
  const $dateTo = atom<string | null>(null);
  const $category = atom<EventCategory | null>(null);
  const $sortBy = atom<SortBy>("date");
  const $sortDir = atom<SortDir>("asc");

  const $results = atom<SearchEvent[]>([]);
  const $nextCursor = atom<string | null>(null);
  const $status = atom<"idle" | "loading" | "loading-more" | "error" | "ready">(
    "idle",
  );
  const $error = atom<string | null>(null);

  return {
    $name,
    $location,
    $dateFrom,
    $dateTo,
    $category,
    $sortBy,
    $sortDir,
    $results,
    $nextCursor,
    $status,
    $error,
    $hasMore: computed($nextCursor, (cursor) => cursor !== null),
  };
};

export type Store = ReturnType<typeof createStore>;

export const readFilters = (store: Store): SearchFilters => ({
  name: store.$name.get(),
  location: store.$location.get(),
  dateFrom: store.$dateFrom.get(),
  dateTo: store.$dateTo.get(),
  category: store.$category.get(),
  sortBy: store.$sortBy.get(),
  sortDir: store.$sortDir.get(),
});
