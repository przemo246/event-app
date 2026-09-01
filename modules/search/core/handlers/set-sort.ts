import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setSort = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_SORT").pipe(
    tap(({ sortBy, sortDir }) => {
      store.$sortBy.set(sortBy);
      store.$sortDir.set(sortDir);
    }),
  );
