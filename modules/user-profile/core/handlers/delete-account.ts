import { catchError, EMPTY, from, switchMap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { deleteAccount as deleteAccountRequest } from "../../integration/account";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const deleteAccount = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_DELETE_ACCOUNT").pipe(
    switchMap(() => {
      store.$deleteError.set(null);
      store.$isDeletingAccount.set(true);

      return from(deleteAccountRequest()).pipe(
        catchError(() => {
          store.$isDeletingAccount.set(false);
          store.$deleteError.set(VALIDATION_ERROR_MAP.deleteAccountFailed);
          return EMPTY;
        }),
      );
    }),
  );
