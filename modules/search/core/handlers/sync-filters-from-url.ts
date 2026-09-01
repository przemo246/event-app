import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { parseFiltersFromUrl } from "../../configuration/validation";

export const syncFiltersFromUrl = (store: Store, { ofType, emit }: Bus) =>
  ofType("[TRIGGER]_SYNC_FROM_URL").pipe(
    tap((params) => {
      const filters = parseFiltersFromUrl(params);

      store.$name.set(filters.name);
      store.$location.set(filters.location);
      store.$dateFrom.set(filters.dateFrom);
      store.$dateTo.set(filters.dateTo);
      store.$category.set(filters.category);
      store.$sortBy.set(filters.sortBy);
      store.$sortDir.set(filters.sortDir);

      emit("[TASK]_SEARCH", { filters, cursor: null, append: false });
    }),
  );
