import { atom, computed } from "@/libs/react-kit/supa-store";
import { isCredentialsValid } from "../configuration/validation";

export const createStore = () => {
  const $email = atom("");
  const $password = atom("");
  const $isSubmitting = atom(false);
  const $error = atom<string | null>(null);

  return {
    $email,
    $password,
    $isSubmitting,
    $error,
    $isFormValid: computed(
      [$email, $password],
      (email, password) => isCredentialsValid(email, password),
    ),
  };
};

export type Store = ReturnType<typeof createStore>;
