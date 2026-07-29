import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { register } from "../../integration/repository";
import { redirectTo } from "../../integration/navigation";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const signInWithOAuth = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SIGN_IN_WITH_OAUTH").pipe(
    switchMap((provider) =>
      from(register({ provider })).pipe(
        tap(redirectTo),
        catchError(() => {
          store.$error.set(VALIDATION_ERROR_MAP.genericError);
          return EMPTY;
        }),
      ),
    ),
  );
