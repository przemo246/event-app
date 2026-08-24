import type { CreateEventPayload } from "../domain/models";
import type { Registry } from "./registry";
import type { Store } from "./store";

export const createFacade = (store: Store, trigger: Registry["trigger"]) => {
  return {
    requestTagSuggestions: (query: string) =>
      trigger("[TRIGGER]_REQUEST_TAG_SUGGESTIONS", query),
    searchLocation: (query: string) => trigger("[TRIGGER]_SEARCH_LOCATION", query),
    clearLocationSuggestions: () => trigger("[TRIGGER]_CLEAR_LOCATION_SUGGESTIONS"),
    submitEvent: (payload: CreateEventPayload) =>
      trigger("[TRIGGER]_SUBMIT_EVENT", payload),
    useTagSuggestions: () => store.$tagSuggestions.use(),
    useTagSuggestionsStatus: () => store.$tagSuggestionsStatus.use(),
    useLocationSuggestions: () => store.$locationSuggestions.use(),
    useLocationStatus: () => store.$locationStatus.use(),
    useIsSubmitting: () => store.$isSubmitting.use(),
    useSubmitError: () => store.$submitError.use(),
    useSubmitSuccess: () => store.$submitSuccess.use(),
  };
};
