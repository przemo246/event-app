import type { EventCategory } from "@/shared/event-category/domain/models";
import type { Registry } from "./registry";
import type { Store } from "./store";

export const createFacade = (store: Store, trigger: Registry["trigger"]) => {
  return {
    setName: (name: string) => trigger("[TRIGGER]_SET_NAME", name),
    setDateFrom: (dateFrom: string | null) =>
      trigger("[TRIGGER]_SET_DATE_FROM", dateFrom),
    setDateTo: (dateTo: string | null) => trigger("[TRIGGER]_SET_DATE_TO", dateTo),
    setLocation: (location: string) => trigger("[TRIGGER]_SET_LOCATION", location),
    setCategory: (category: EventCategory | null) =>
      trigger("[TRIGGER]_SET_CATEGORY", category),
    submit: () => trigger("[TRIGGER]_SUBMIT"),
    loadPromotedEvents: () => trigger("[TRIGGER]_LOAD_PROMOTED_EVENTS"),
    useName: () => store.$name.use(),
    useDateFrom: () => store.$dateFrom.use(),
    useDateTo: () => store.$dateTo.use(),
    useLocation: () => store.$location.use(),
    useCategory: () => store.$category.use(),
    useDateRangeError: () => store.$dateRangeError.use(),
    usePromotedEvents: () => store.$promotedEvents.use(),
    useIsPromotedEventsLoading: () => store.$isPromotedEventsLoading.use(),
  };
};
