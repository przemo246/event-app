import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { readFilters } from "../store";

export const loadMore = (store: Store, { ofType, emit }: Bus) =>
  ofType("[TRIGGER]_LOAD_MORE").pipe(
    tap(() => {
      const cursor = store.$nextCursor.get();
      if (!cursor) return;

      emit("[TASK]_SEARCH", {
        filters: readFilters(store),
        cursor,
        append: true,
      });
    }),
  );
