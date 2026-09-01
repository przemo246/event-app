import { catchError, EMPTY, finalize, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { searchEvents as searchEventsRequest } from "../../integration/repository";
import { VALIDATION_ERROR_MAP } from "../../configuration/validation";

export const searchEvents = (store: Store, { ofType }: Bus) =>
  ofType("[TASK]_SEARCH").pipe(
    switchMap(({ filters, cursor, append }) => {
      store.$status.set(append ? "loading-more" : "loading");
      store.$error.set(null);

      const controller = new AbortController();

      return from(
        searchEventsRequest(filters, cursor, controller.signal),
      ).pipe(
        tap((results) => {
          store.$results.set(
            append ? [...store.$results.get(), ...results.events] : results.events,
          );
          store.$nextCursor.set(results.nextCursor);
          store.$status.set("ready");
        }),
        catchError(() => {
          store.$status.set("error");
          store.$error.set(VALIDATION_ERROR_MAP.searchFailed);
          return EMPTY;
        }),
        finalize(() => controller.abort()),
      );
    }),
  );
