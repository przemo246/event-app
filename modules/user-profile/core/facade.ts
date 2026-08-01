import type { Registry } from "./registry";
import type { Store } from "./store";

export const createFacade = (store: Store, trigger: Registry["trigger"]) => {
  return {
    loadUserProfile: () => trigger("[TRIGGER]_LOAD_USER_PROFILE"),
    setUsername: (username: string) => trigger("[TRIGGER]_SET_USERNAME", username),
    saveUserProfileDetails: () => trigger("[TRIGGER]_SAVE_USER_PROFILE_DETAILS"),
    setCurrentPassword: (currentPassword: string) =>
      trigger("[TRIGGER]_SET_CURRENT_PASSWORD", currentPassword),
    setNewPassword: (newPassword: string) =>
      trigger("[TRIGGER]_SET_NEW_PASSWORD", newPassword),
    changePassword: () => trigger("[TRIGGER]_CHANGE_PASSWORD"),
    deleteAccount: () => trigger("[TRIGGER]_DELETE_ACCOUNT"),
    useUsername: () => store.$username.use(),
    useEmail: () => store.$email.use(),
    useIsUserProfileLoading: () => store.$isUserProfileLoading.use(),
    useIsSavingDetails: () => store.$isSavingDetails.use(),
    useDetailsError: () => store.$detailsError.use(),
    useIsUserProfileDetailsValid: () => store.$isUserProfileDetailsValid.use(),
    useCurrentPassword: () => store.$currentPassword.use(),
    useNewPassword: () => store.$newPassword.use(),
    useIsChangingPassword: () => store.$isChangingPassword.use(),
    usePasswordError: () => store.$passwordError.use(),
    useIsPasswordChangeValid: () => store.$isPasswordChangeValid.use(),
    useIsDeletingAccount: () => store.$isDeletingAccount.use(),
    useDeleteError: () => store.$deleteError.use(),
  };
};
