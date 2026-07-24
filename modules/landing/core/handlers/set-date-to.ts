import { tap } from "rxjs";
import type { Store } from "../store";
import type { Bus } from "../bus";

export const setDateTo = (store: Store, { ofType }: Bus) =>
  ofType("[TRIGGER]_SET_DATE_TO").pipe(
    tap((dateTo) => {
      store.$dateTo.set(dateTo);
    }),
  );
