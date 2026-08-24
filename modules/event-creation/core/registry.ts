import { type Store } from "./store";
import { requestTagSuggestions } from "./handlers/request-tag-suggestions";
import { searchLocation } from "./handlers/search-location";
import { clearLocationSuggestions } from "./handlers/clear-location-suggestions";
import { submitEvent } from "./handlers/submit-event";
import { createBus } from "./bus";

export const createRegistry = (store: Store) => {
  const bus = createBus();

  const register = bus.createRegistry(
    requestTagSuggestions(store, bus),
    searchLocation(store, bus),
    clearLocationSuggestions(store, bus),
    submitEvent(store, bus),
  );

  return { trigger: bus.trigger, register };
};

export type Registry = ReturnType<typeof createRegistry>;
