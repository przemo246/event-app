import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { updateUserProfileDetails } from "../../integration/repository";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const saveUserProfileDetails = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SAVE_USER_PROFILE_DETAILS").pipe(
    switchMap(() => {
      if (!store.$isUserProfileDetailsValid.get()) return EMPTY;

      store.$detailsError.set(null);
      store.$isSavingDetails.set(true);

      const details = {
        username: store.$username.get(),
      };

      return from(updateUserProfileDetails(details)).pipe(
        tap(() => {
          store.$isSavingDetails.set(false);
        }),
        catchError(() => {
          store.$isSavingDetails.set(false);
          store.$detailsError.set(
            VALIDATION_ERROR_MAP.saveUserProfileDetailsFailed,
          );
          return EMPTY;
        }),
      );
    }),
  );
