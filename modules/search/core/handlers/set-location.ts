import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setLocation = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_LOCATION").pipe(
    tap((location) => {
      store.$location.set(location);
    }),
  );
