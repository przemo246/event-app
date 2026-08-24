import { type TriggerEvent } from "@/libs/eda";
import type { CreateEventPayload } from "./models";

export type Event =
  | TriggerEvent<"[TRIGGER]_REQUEST_TAG_SUGGESTIONS", string>
  | TriggerEvent<"[TRIGGER]_SEARCH_LOCATION", string>
  | TriggerEvent<"[TRIGGER]_CLEAR_LOCATION_SUGGESTIONS">
  | TriggerEvent<"[TRIGGER]_SUBMIT_EVENT", CreateEventPayload>;
