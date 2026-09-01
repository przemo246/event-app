import type { EventCategory } from "@/shared/event-category/domain/models";
import type { SortBy, SortDir } from "../domain/models";
import type { Registry } from "./registry";
import type { Store } from "./store";

export const createFacade = (store: Store, trigger: Registry["trigger"]) => {
  return {
    syncFromUrl: (params: URLSearchParams) =>
      trigger("[TRIGGER]_SYNC_FROM_URL", params),
    setName: (name: string) => trigger("[TRIGGER]_SET_NAME", name),
    setLocation: (location: string) => trigger("[TRIGGER]_SET_LOCATION", location),
    setDateFrom: (dateFrom: string | null) =>
      trigger("[TRIGGER]_SET_DATE_FROM", dateFrom),
    setDateTo: (dateTo: string | null) => trigger("[TRIGGER]_SET_DATE_TO", dateTo),
    setCategory: (category: EventCategory | null) =>
      trigger("[TRIGGER]_SET_CATEGORY", category),
    setSort: (sortBy: SortBy, sortDir: SortDir) =>
      trigger("[TRIGGER]_SET_SORT", { sortBy, sortDir }),
    resetFilters: () => trigger("[TRIGGER]_RESET_FILTERS"),
    loadMore: () => trigger("[TRIGGER]_LOAD_MORE"),
    useName: () => store.$name.use(),
    useLocation: () => store.$location.use(),
    useDateFrom: () => store.$dateFrom.use(),
    useDateTo: () => store.$dateTo.use(),
    useCategory: () => store.$category.use(),
    useSortBy: () => store.$sortBy.use(),
    useSortDir: () => store.$sortDir.use(),
    useResults: () => store.$results.use(),
    useStatus: () => store.$status.use(),
    useError: () => store.$error.use(),
    useHasMore: () => store.$hasMore.use(),
  };
};
