import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setName = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_NAME").pipe(
    tap((name) => {
      store.$name.set(name);
    }),
  );
