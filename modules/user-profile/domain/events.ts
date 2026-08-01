import { type TriggerEvent } from "@/libs/eda";

export type Event =
  | TriggerEvent<"[TRIGGER]_LOAD_USER_PROFILE">
  | TriggerEvent<"[TRIGGER]_SET_USERNAME", string>
  | TriggerEvent<"[TRIGGER]_SAVE_USER_PROFILE_DETAILS">
  | TriggerEvent<"[TRIGGER]_SET_CURRENT_PASSWORD", string>
  | TriggerEvent<"[TRIGGER]_SET_NEW_PASSWORD", string>
  | TriggerEvent<"[TRIGGER]_CHANGE_PASSWORD">
  | TriggerEvent<"[TRIGGER]_DELETE_ACCOUNT">;
