import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setNewPassword = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_NEW_PASSWORD").pipe(
    tap((newPassword) => {
      store.$newPassword.set(newPassword);
      store.$passwordError.set(null);
    }),
  );
