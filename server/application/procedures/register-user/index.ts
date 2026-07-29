import type { Provider } from "@supabase/supabase-js";
import { schema } from "@/shared/server-contracts/schemas/register-user";
import { InternalServer } from "../../core/error-handling";
import { withZodSchema } from "../../adapter/zod";
import { publicProcedure } from "../../core/procedure";

export const registerUser = publicProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (input, { db }) => {
    if ("provider" in input) {
      const oauthResult = await db.auth.signInWithOAuth({
        provider: input.provider as Provider,
        options: {
          redirectTo: process.env.AUTH_CALLBACK_URL,
          queryParams: { prompt: "select_account" },
        },
      });

      if (oauthResult.error || !oauthResult.data.url) {
        throw new InternalServer(oauthResult.error?.message);
      }

      return {
        code: 200,
        location: oauthResult.data.url,
      };
    }

    const signUpResult = await db.auth.signUp({
      email: input.email,
      password: input.password,
    });

    if (signUpResult.error) {
      throw new InternalServer(signUpResult.error.message);
    }

    return {
      code: 200,
      location: "/",
    };
  },
});
