import { type TaskEvent, type TriggerEvent } from "@/libs/eda";
import type { EventCategory } from "@/shared/event-category/domain/models";
import type { SearchFilters, SortBy, SortDir } from "./models";

export type Event =
  | TriggerEvent<"[TRIGGER]_SYNC_FROM_URL", URLSearchParams>
  | TriggerEvent<"[TRIGGER]_SET_NAME", string>
  | TriggerEvent<"[TRIGGER]_SET_LOCATION", string>
  | TriggerEvent<"[TRIGGER]_SET_DATE_FROM", string | null>
  | TriggerEvent<"[TRIGGER]_SET_DATE_TO", string | null>
  | TriggerEvent<"[TRIGGER]_SET_CATEGORY", EventCategory | null>
  | TriggerEvent<"[TRIGGER]_SET_SORT", { sortBy: SortBy; sortDir: SortDir }>
  | TriggerEvent<"[TRIGGER]_RESET_FILTERS">
  | TriggerEvent<"[TRIGGER]_LOAD_MORE">
  | TaskEvent<
      "[TASK]_SEARCH",
      { filters: SearchFilters; cursor: string | null; append: boolean }
    >;
