import { schema } from "@/shared/server-contracts/schemas/get-promoted-events";
import { InternalServer } from "../../core/error-handling";
import { withZodSchema } from "../../adapter/zod";
import { publicProcedure } from "../../core/procedure";

const PROMOTED_EVENTS_LIMIT = 4;

export const getPromotedEvents = publicProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (_input, { db }) => {
    const { data, error } = await db
      .from("events")
      .select("id, title, category, date_time_from, date_time_to, location, image")
      .eq("is_featured", true)
      .gte("date_time_from", new Date().toISOString())
      .order("date_time_from", { ascending: true })
      .limit(PROMOTED_EVENTS_LIMIT);

    if (error) {
      throw new InternalServer(error.message);
    }

    const events = (data ?? []).map((event) => ({
      ...event,
      image: event.image
        ? db.storage.from("event-images").getPublicUrl(event.image).data.publicUrl
        : null,
    }));

    return {
      code: 200 as const,
      events,
    };
  },
});
