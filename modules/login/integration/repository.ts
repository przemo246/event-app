import type { Credentials, OAuthProvider } from "../domain/models";

export const login = async (
  input: Credentials | { provider: OAuthProvider },
) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to login.");
  }

  const { location } = (await response.json()) as { location: string };

  return location;
};
