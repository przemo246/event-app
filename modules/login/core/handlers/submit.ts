import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { login } from "../../integration/repository";
import { redirectTo } from "../../integration/navigation";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const submit = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SUBMIT").pipe(
    switchMap(() => {
      if (!store.$isFormValid.get()) return EMPTY;

      store.$error.set(null);
      store.$isSubmitting.set(true);

      const credentials = {
        email: store.$email.get(),
        password: store.$password.get(),
      };

      return from(login(credentials)).pipe(
        tap((location) => {
          store.$isSubmitting.set(false);
          redirectTo(location);
        }),
        catchError(() => {
          store.$isSubmitting.set(false);
          store.$error.set(VALIDATION_ERROR_MAP.invalidCredentials);
          return EMPTY;
        }),
      );
    }),
  );
