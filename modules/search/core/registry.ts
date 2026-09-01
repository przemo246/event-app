import { type Store } from "./store";
import { syncFiltersFromUrl } from "./handlers/sync-filters-from-url";
import { setName } from "./handlers/set-name";
import { setLocation } from "./handlers/set-location";
import { setDateFrom } from "./handlers/set-date-from";
import { setDateTo } from "./handlers/set-date-to";
import { setCategory } from "./handlers/set-category";
import { setSort } from "./handlers/set-sort";
import { resetFilters } from "./handlers/reset-filters";
import { loadMore } from "./handlers/load-more";
import { searchEvents } from "./handlers/search-events";
import { createBus } from "./bus";

export const createRegistry = (store: Store) => {
  const bus = createBus();

  const register = bus.createRegistry(
    syncFiltersFromUrl(store, bus),
    setName(store, bus),
    setLocation(store, bus),
    setDateFrom(store, bus),
    setDateTo(store, bus),
    setCategory(store, bus),
    setSort(store, bus),
    resetFilters(store, bus),
    loadMore(store, bus),
    searchEvents(store, bus),
  );

  return { trigger: bus.trigger, register };
};

export type Registry = ReturnType<typeof createRegistry>;
