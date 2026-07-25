export const VALIDATION_ERROR_MAP = {
  registrationFailed: "Nie udało się utworzyć konta. Spróbuj ponownie.",
  genericError: "Coś poszło nie tak. Spróbuj ponownie.",
} as const;

export const isCredentialsValid = (email: string, password: string) =>
  email.trim().length > 0 && password.length > 0;
