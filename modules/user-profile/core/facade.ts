import type { Registry } from "./registry";
import type { Store } from "./store";

export const createFacade = (store: Store, trigger: Registry["trigger"]) => {
  return {
    loadAccount: () => trigger("[TRIGGER]_LOAD_ACCOUNT"),
    setUsername: (username: string) => trigger("[TRIGGER]_SET_USERNAME", username),
    saveAccountDetails: () => trigger("[TRIGGER]_SAVE_ACCOUNT_DETAILS"),
    setCurrentPassword: (currentPassword: string) =>
      trigger("[TRIGGER]_SET_CURRENT_PASSWORD", currentPassword),
    setNewPassword: (newPassword: string) =>
      trigger("[TRIGGER]_SET_NEW_PASSWORD", newPassword),
    changePassword: () => trigger("[TRIGGER]_CHANGE_PASSWORD"),
    deleteAccount: () => trigger("[TRIGGER]_DELETE_ACCOUNT"),
    useUsername: () => store.$username.use(),
    useEmail: () => store.$email.use(),
    useIsAccountLoading: () => store.$isAccountLoading.use(),
    useIsSavingDetails: () => store.$isSavingDetails.use(),
    useDetailsError: () => store.$detailsError.use(),
    useIsAccountDetailsValid: () => store.$isAccountDetailsValid.use(),
    useCurrentPassword: () => store.$currentPassword.use(),
    useNewPassword: () => store.$newPassword.use(),
    useIsChangingPassword: () => store.$isChangingPassword.use(),
    usePasswordError: () => store.$passwordError.use(),
    useIsPasswordChangeValid: () => store.$isPasswordChangeValid.use(),
    useIsDeletingAccount: () => store.$isDeletingAccount.use(),
    useDeleteError: () => store.$deleteError.use(),
  };
};
