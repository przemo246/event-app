import { type Store } from "./store";
import { setName } from "./handlers/set-name";
import { setDateFrom } from "./handlers/set-date-from";
import { setDateTo } from "./handlers/set-date-to";
import { setLocation } from "./handlers/set-location";
import { setCategory } from "./handlers/set-category";
import { submit } from "./handlers/submit";
import { loadPromotedEvents } from "./handlers/load-promoted-events";
import { createBus } from "./bus";

export const createRegistry = (store: Store) => {
  const bus = createBus();

  const register = bus.createRegistry(
    setName(store, bus),
    setDateFrom(store, bus),
    setDateTo(store, bus),
    setLocation(store, bus),
    setCategory(store, bus),
    submit(store, bus),
    loadPromotedEvents(store, bus),
  );

  return { trigger: bus.trigger, register };
};

export type Registry = ReturnType<typeof createRegistry>;
