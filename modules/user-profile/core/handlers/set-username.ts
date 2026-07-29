import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setUsername = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_USERNAME").pipe(
    tap((username) => {
      store.$username.set(username);
      store.$detailsError.set(null);
    }),
  );
