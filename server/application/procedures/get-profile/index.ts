import { schema } from "@/shared/server-contracts/schemas/get-profile";
import { InternalServer } from "../../core/error-handling";
import { withZodSchema } from "../../adapter/zod";
import { privateProcedure } from "../../core/procedure";

export const getProfile = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (_input, { db, user }) => {
    const { data: profile, error } = await db
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      throw new InternalServer(error.message);
    }

    return {
      code: 200,
      username: profile?.username ?? user.username,
      email: user.email,
    };
  },
});
