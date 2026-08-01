import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { getAccount } from "../../integration/repository";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const loadAccount = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_LOAD_ACCOUNT").pipe(
    switchMap(() => {
      store.$isAccountLoading.set(true);
      store.$detailsError.set(null);

      return from(getAccount()).pipe(
        tap((account) => {
          store.$username.set(account.username);
          store.$email.set(account.email);
          store.$isAccountLoading.set(false);
        }),
        catchError(() => {
          store.$isAccountLoading.set(false);
          store.$detailsError.set(VALIDATION_ERROR_MAP.loadAccountFailed);
          return EMPTY;
        }),
      );
    }),
  );
