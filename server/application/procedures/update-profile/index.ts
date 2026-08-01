import { schema } from "@/shared/server-contracts/schemas/update-profile";
import { InternalServer } from "../../core/error-handling";
import { withZodSchema } from "../../adapter/zod";
import { privateProcedure } from "../../core/procedure";

export const updateProfile = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async ({ username }, { db, user }) => {
    const { error } = await db
      .from("profiles")
      .upsert({ id: user.id, username });

    if (error) {
      throw new InternalServer(error.message);
    }

    return { code: 200 };
  },
});
