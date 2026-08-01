import { createClient } from "@/libs/supabase/client";
import type {
  UserProfile,
  UserProfileDetails,
  PasswordChange,
} from "../domain/models";

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch("/api/config/profile");

  if (!response.ok) {
    throw new Error("Failed to load account.");
  }

  const { username, email } = (await response.json()) as UserProfile;

  return { username, email };
};

export const updateUserProfileDetails = async ({
  username,
}: UserProfileDetails): Promise<void> => {
  const response = await fetch("/api/config/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error("Failed to update account.");
  }
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
