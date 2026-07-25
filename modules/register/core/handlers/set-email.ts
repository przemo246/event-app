import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setEmail = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_EMAIL").pipe(
    tap((email) => {
      store.$email.set(email);
      store.$error.set(null);
    }),
  );
