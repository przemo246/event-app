import { type TriggerEvent } from "@/libs/eda";
import type { CategoryValue } from "./models";

export type Event =
  | TriggerEvent<"[TRIGGER]_SET_NAME", string>
  | TriggerEvent<"[TRIGGER]_SET_DATE_FROM", string | null>
  | TriggerEvent<"[TRIGGER]_SET_DATE_TO", string | null>
  | TriggerEvent<"[TRIGGER]_SET_LOCATION", string>
  | TriggerEvent<"[TRIGGER]_SET_CATEGORY", CategoryValue | null>
  | TriggerEvent<"[TRIGGER]_SUBMIT">;
