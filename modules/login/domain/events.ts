import { type TriggerEvent } from "@/libs/eda";
import type { OAuthProvider } from "./models";

export type Event =
  | TriggerEvent<"[TRIGGER]_SET_EMAIL", string>
  | TriggerEvent<"[TRIGGER]_SET_PASSWORD", string>
  | TriggerEvent<"[TRIGGER]_SUBMIT">
  | TriggerEvent<"[TRIGGER]_SIGN_IN_WITH_OAUTH", OAuthProvider>;
