import { type Store } from "./store";
import { loadUserProfile } from "./handlers/load-user-profile";
import { setUsername } from "./handlers/set-username";
import { saveUserProfileDetails } from "./handlers/save-user-profile-details";
import { setCurrentPassword } from "./handlers/set-current-password";
import { setNewPassword } from "./handlers/set-new-password";
import { changePassword } from "./handlers/change-password";
import { deleteAccount } from "./handlers/delete-account";
import { createBus } from "./bus";

export const createRegistry = (store: Store) => {
  const bus = createBus();

  const register = bus.createRegistry(
    loadUserProfile(store, bus),
    setUsername(store, bus),
    saveUserProfileDetails(store, bus),
    setCurrentPassword(store, bus),
    setNewPassword(store, bus),
    changePassword(store, bus),
    deleteAccount(store, bus),
  );

  return { trigger: bus.trigger, register };
};

export type Registry = ReturnType<typeof createRegistry>;
