import { loginUser } from "@/server/application/procedures/login-user";
import { nextAdapter } from "@/server/application/adapter/next";

export const POST = nextAdapter(loginUser);
