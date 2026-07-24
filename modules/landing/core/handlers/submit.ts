import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";
import { goToSearchResults } from "../../integration/navigation";

export const submit = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SUBMIT").pipe(
    tap(() => {
      if (store.$dateRangeError.get()) return;

      goToSearchResults({
        name: store.$name.get(),
        dateFrom: store.$dateFrom.get(),
        dateTo: store.$dateTo.get(),
        location: store.$location.get(),
        category: store.$category.get(),
      });
    }),
  );
