import { catchError, debounceTime, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { geocodeLocation } from "../../integration/repository";

export const searchLocation = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SEARCH_LOCATION").pipe(
    debounceTime(300),
    switchMap((query) => {
      if (!query.trim()) {
        store.$locationSuggestions.set([]);
        store.$locationStatus.set("idle");
        return EMPTY;
      }

      store.$locationStatus.set("loading");

      return from(geocodeLocation(query)).pipe(
        tap((suggestions) => {
          store.$locationSuggestions.set(suggestions);
          store.$locationStatus.set("idle");
        }),
        catchError(() => {
          store.$locationStatus.set("error");
          return EMPTY;
        }),
      );
    }),
  );
