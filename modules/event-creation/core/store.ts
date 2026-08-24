import { atom } from "@/libs/react-kit/supa-store";
import type { LocationSuggestion } from "../domain/models";

export const createStore = () => {
  const $tagSuggestions = atom<string[]>([]);
  const $tagSuggestionsStatus = atom<"idle" | "loading" | "error">("idle");

  const $locationSuggestions = atom<LocationSuggestion[]>([]);
  const $locationStatus = atom<"idle" | "loading" | "error">("idle");

  const $isSubmitting = atom(false);
  const $submitError = atom<string | null>(null);
  const $submitSuccess = atom(false);

  return {
    $tagSuggestions,
    $tagSuggestionsStatus,
    $locationSuggestions,
    $locationStatus,
    $isSubmitting,
    $submitError,
    $submitSuccess,
  };
};

export type Store = ReturnType<typeof createStore>;
