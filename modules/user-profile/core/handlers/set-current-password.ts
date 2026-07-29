import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setCurrentPassword = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_CURRENT_PASSWORD").pipe(
    tap((currentPassword) => {
      store.$currentPassword.set(currentPassword);
      store.$passwordError.set(null);
    }),
  );
