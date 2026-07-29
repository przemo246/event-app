import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { updateAccountDetails } from "../../integration/account";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const saveAccountDetails = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SAVE_ACCOUNT_DETAILS").pipe(
    switchMap(() => {
      if (!store.$isAccountDetailsValid.get()) return EMPTY;

      store.$detailsError.set(null);
      store.$isSavingDetails.set(true);

      const details = {
        username: store.$username.get(),
      };

      return from(updateAccountDetails(details)).pipe(
        tap(() => {
          store.$isSavingDetails.set(false);
        }),
        catchError(() => {
          store.$isSavingDetails.set(false);
          store.$detailsError.set(VALIDATION_ERROR_MAP.saveAccountDetailsFailed);
          return EMPTY;
        }),
      );
    }),
  );
