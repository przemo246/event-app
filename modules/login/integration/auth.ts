import { createClient } from "@/libs/supabase/client";
import { OAUTH_CALLBACK_PATH } from "../configuration/constraints";
import type { Credentials, OAuthProvider } from "../domain/models";

export const signInWithPassword = async ({ email, password }: Credentials) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;
};

export const redirectToOAuthProvider = async (provider: OAuthProvider) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}${OAUTH_CALLBACK_PATH}` },
  });

  if (error) throw error;
};
