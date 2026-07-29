import { type Store } from "./store";
import { loadAccount } from "./handlers/load-account";
import { setUsername } from "./handlers/set-username";
import { saveAccountDetails } from "./handlers/save-account-details";
import { setCurrentPassword } from "./handlers/set-current-password";
import { setNewPassword } from "./handlers/set-new-password";
import { changePassword } from "./handlers/change-password";
import { deleteAccount } from "./handlers/delete-account";
import { createBus } from "./bus";

export const createRegistry = (store: Store) => {
  const bus = createBus();

  const register = bus.createRegistry(
    loadAccount(store, bus),
    setUsername(store, bus),
    saveAccountDetails(store, bus),
    setCurrentPassword(store, bus),
    setNewPassword(store, bus),
    changePassword(store, bus),
    deleteAccount(store, bus),
  );

  return { trigger: bus.trigger, register };
};

export type Registry = ReturnType<typeof createRegistry>;
