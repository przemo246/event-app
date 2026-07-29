import { createClient } from "@/libs/supabase/client";
import { OAUTH_CALLBACK_PATH } from "../configuration/constraints";
import type { Credentials, OAuthProvider } from "../domain/models";

export const signInWithPassword = async ({ email, password }: Credentials) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    redirect: "manual",
  });

  if (response.type !== "opaqueredirect") throw new Error("Failed to login.");
};

export const redirectToOAuthProvider = async (provider: OAuthProvider) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}${OAUTH_CALLBACK_PATH}` },
  });

  if (error) throw error;
};
