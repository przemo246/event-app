import type { Credentials, OAuthProvider } from "../domain/models";

export const register = async (
  input: Credentials | { provider: OAuthProvider },
) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to register.");
  }

  const { location } = (await response.json()) as { location: string };

  return location;
};
