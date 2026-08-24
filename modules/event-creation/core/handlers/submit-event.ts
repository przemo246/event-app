import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { createEvent } from "../../integration/repository";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const submitEvent = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SUBMIT_EVENT").pipe(
    switchMap((payload) => {
      store.$isSubmitting.set(true);
      store.$submitError.set(null);

      return from(createEvent(payload)).pipe(
        tap(() => {
          store.$isSubmitting.set(false);
          store.$submitSuccess.set(true);
        }),
        catchError(() => {
          store.$isSubmitting.set(false);
          store.$submitError.set(VALIDATION_ERROR_MAP.submitEventFailed);
          return EMPTY;
        }),
      );
    }),
  );
