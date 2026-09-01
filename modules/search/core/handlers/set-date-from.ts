import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setDateFrom = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_DATE_FROM").pipe(
    tap((dateFrom) => {
      store.$dateFrom.set(dateFrom);
    }),
  );
