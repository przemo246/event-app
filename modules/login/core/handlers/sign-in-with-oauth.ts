import { catchError, EMPTY, from, switchMap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { redirectToOAuthProvider } from "../../integration/repository";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const signInWithOAuth = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SIGN_IN_WITH_OAUTH").pipe(
    switchMap((provider) =>
      from(redirectToOAuthProvider(provider)).pipe(
        catchError(() => {
          store.$error.set(VALIDATION_ERROR_MAP.genericError);
          return EMPTY;
        }),
      ),
    ),
  );
