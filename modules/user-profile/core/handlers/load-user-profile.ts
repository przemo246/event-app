import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { getUserProfile } from "../../integration/repository";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const loadUserProfile = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_LOAD_USER_PROFILE").pipe(
    switchMap(() => {
      store.$isUserProfileLoading.set(true);
      store.$detailsError.set(null);

      return from(getUserProfile()).pipe(
        tap((userProfile) => {
          store.$username.set(userProfile.username);
          store.$email.set(userProfile.email);
          store.$isUserProfileLoading.set(false);
        }),
        catchError(() => {
          store.$isUserProfileLoading.set(false);
          store.$detailsError.set(VALIDATION_ERROR_MAP.loadUserProfileFailed);
          return EMPTY;
        }),
      );
    }),
  );
