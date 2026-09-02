import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { fetchPromotedEvents } from "../../integration/repository";

export const loadPromotedEvents = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_LOAD_PROMOTED_EVENTS").pipe(
    switchMap(() => {
      store.$isPromotedEventsLoading.set(true);

      return from(fetchPromotedEvents()).pipe(
        tap((events) => {
          store.$promotedEvents.set(events);
          store.$isPromotedEventsLoading.set(false);
        }),
        catchError(() => {
          store.$isPromotedEventsLoading.set(false);
          return EMPTY;
        }),
      );
    }),
  );
