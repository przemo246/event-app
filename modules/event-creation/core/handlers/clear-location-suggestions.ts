import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const clearLocationSuggestions = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_CLEAR_LOCATION_SUGGESTIONS").pipe(
    tap(() => store.$locationSuggestions.set([])),
  );
