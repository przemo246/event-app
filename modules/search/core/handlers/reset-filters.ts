import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const resetFilters = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_RESET_FILTERS").pipe(
    tap(() => {
      store.$name.reset();
      store.$location.reset();
      store.$dateFrom.reset();
      store.$dateTo.reset();
      store.$category.reset();
      store.$sortBy.reset();
      store.$sortDir.reset();
    }),
  );
