import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { changeAccountPassword } from "../../integration/account";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const changePassword = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_CHANGE_PASSWORD").pipe(
    switchMap(() => {
      if (!store.$isPasswordChangeValid.get()) return EMPTY;

      store.$passwordError.set(null);
      store.$isChangingPassword.set(true);

      const change = {
        currentPassword: store.$currentPassword.get(),
        newPassword: store.$newPassword.get(),
      };

      return from(changeAccountPassword(change)).pipe(
        tap(() => {
          store.$isChangingPassword.set(false);
          store.$currentPassword.reset();
          store.$newPassword.reset();
        }),
        catchError(() => {
          store.$isChangingPassword.set(false);
          store.$passwordError.set(VALIDATION_ERROR_MAP.changePasswordFailed);
          return EMPTY;
        }),
      );
    }),
  );
