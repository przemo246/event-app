import type { OAuthProvider } from "../domain/models";
import type { Registry } from "./registry";
import type { Store } from "./store";

export const createFacade = (store: Store, trigger: Registry["trigger"]) => {
  return {
    setEmail: (email: string) => trigger("[TRIGGER]_SET_EMAIL", email),
    setPassword: (password: string) => trigger("[TRIGGER]_SET_PASSWORD", password),
    submit: () => trigger("[TRIGGER]_SUBMIT"),
    signInWithOAuth: (provider: OAuthProvider) =>
      trigger("[TRIGGER]_SIGN_IN_WITH_OAUTH", provider),
    useEmail: () => store.$email.use(),
    usePassword: () => store.$password.use(),
    useIsSubmitting: () => store.$isSubmitting.use(),
    useError: () => store.$error.use(),
    useIsFormValid: () => store.$isFormValid.use(),
  };
};
