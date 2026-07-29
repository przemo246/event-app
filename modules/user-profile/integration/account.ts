import { createClient } from "@/libs/supabase/client";
import type { Account, AccountDetails, PasswordChange } from "../domain/models";

export const getAccount = async (): Promise<Account> => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userData.user.id)
    .maybeSingle();
  if (profileError) throw profileError;

  return {
    username: profile?.username ?? "",
    email: userData.user.email ?? "",
  };
};

export const updateAccountDetails = async ({
  username,
}: AccountDetails): Promise<void> => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({ id: userData.user.id, username });
  if (profileError) throw profileError;
};

export const changeAccountPassword = async ({
  currentPassword,
  newPassword,
}: PasswordChange): Promise<void> => {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const email = userData.user.email;
  if (!email) throw new Error("Missing account email.");

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (reauthError) throw reauthError;

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (updateError) throw updateError;
};

export const deleteAccount = async (): Promise<void> => {
  // Backend not wired yet: the browser client can't self-delete an auth
  // user (requires the service-role key or an RPC). Replace once one exists.
  throw new Error("Account deletion is not implemented yet.");
};
