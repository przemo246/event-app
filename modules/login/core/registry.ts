import { type Store } from "./store";
import { setEmail } from "./handlers/set-email";
import { setPassword } from "./handlers/set-password";
import { submit } from "./handlers/submit";
import { signInWithOAuth } from "./handlers/sign-in-with-oauth";
import { createBus } from "./bus";

export const createRegistry = (store: Store) => {
  const bus = createBus();

  const register = bus.createRegistry(
    setEmail(store, bus),
    setPassword(store, bus),
    submit(store, bus),
    signInWithOAuth(store, bus),
  );

  return { trigger: bus.trigger, register };
};

export type Registry = ReturnType<typeof createRegistry>;
