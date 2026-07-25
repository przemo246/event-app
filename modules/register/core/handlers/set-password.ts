import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setPassword = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_PASSWORD").pipe(
    tap((password) => {
      store.$password.set(password);
      store.$error.set(null);
    }),
  );
