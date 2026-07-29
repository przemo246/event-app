import { atom, computed } from "@/libs/react-kit/supa-store";
import { isAccountDetailsValid, isPasswordChangeValid } from "../configuration/validation";

export const createStore = () => {
  const $username = atom("");
  const $email = atom("");
  const $isAccountLoading = atom(true);
  const $isSavingDetails = atom(false);
  const $detailsError = atom<string | null>(null);

  const $currentPassword = atom("");
  const $newPassword = atom("");
  const $isChangingPassword = atom(false);
  const $passwordError = atom<string | null>(null);

  const $isDeletingAccount = atom(false);
  const $deleteError = atom<string | null>(null);

  return {
    $username,
    $email,
    $isAccountLoading,
    $isSavingDetails,
    $detailsError,
    $currentPassword,
    $newPassword,
    $isChangingPassword,
    $passwordError,
    $isDeletingAccount,
    $deleteError,
    $isAccountDetailsValid: computed($username, isAccountDetailsValid),
    $isPasswordChangeValid: computed(
      [$currentPassword, $newPassword],
      isPasswordChangeValid,
    ),
  };
};

export type Store = ReturnType<typeof createStore>;
