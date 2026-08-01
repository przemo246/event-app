export const VALIDATION_ERROR_MAP = {
  loadUserProfileFailed: "Nie udało się wczytać danych konta. Spróbuj ponownie.",
  saveUserProfileDetailsFailed: "Nie udało się zapisać zmian. Spróbuj ponownie.",
  changePasswordFailed:
    "Nie udało się zmienić hasła. Sprawdź obecne hasło i spróbuj ponownie.",
  deleteAccountFailed: "Nie udało się usunąć konta. Spróbuj ponownie.",
} as const;

export const isUserProfileDetailsValid = (username: string) =>
  username.trim().length > 0;

export const isPasswordChangeValid = (
  currentPassword: string,
  newPassword: string,
) => currentPassword.length > 0 && newPassword.length > 0;
