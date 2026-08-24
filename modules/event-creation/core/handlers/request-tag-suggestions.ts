import { catchError, debounceTime, EMPTY, from, switchMap, tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { fetchTagSuggestions } from "../../integration/repository";

export const requestTagSuggestions = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_REQUEST_TAG_SUGGESTIONS").pipe(
    debounceTime(300),
    switchMap((query) => {
      if (!query.trim()) {
        store.$tagSuggestions.set([]);
        store.$tagSuggestionsStatus.set("idle");
        return EMPTY;
      }

      store.$tagSuggestionsStatus.set("loading");

      return from(fetchTagSuggestions(query)).pipe(
        tap((suggestions) => {
          store.$tagSuggestions.set(suggestions);
          store.$tagSuggestionsStatus.set("idle");
        }),
        catchError(() => {
          store.$tagSuggestionsStatus.set("error");
          return EMPTY;
        }),
      );
    }),
  );
