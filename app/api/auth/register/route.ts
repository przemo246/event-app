import { registerUser } from "@/server/application/procedures/register-user";
import { nextAdapter } from "@/server/application/adapter/next";

export const POST = nextAdapter(registerUser);
