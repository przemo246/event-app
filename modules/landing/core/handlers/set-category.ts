import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setCategory = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_CATEGORY").pipe(
    tap((category) => {
      store.$category.set(category);
    }),
  );
