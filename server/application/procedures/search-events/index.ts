import { schema } from "@/shared/server-contracts/schemas/search-events";
import { InternalServer } from "../../core/error-handling";
import { withZodSchema } from "../../adapter/zod";
import { publicProcedure } from "../../core/procedure";

const PAGE_SIZE = 12;

export const searchEvents = publicProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (
    { name, location, dateFrom, dateTo, category, sortBy, sortDir, cursor },
    { db },
  ) => {
    const offset = cursor ? Number.parseInt(cursor, 10) || 0 : 0;

    let query = db
      .from("events")
      .select("id, title, category, date_time_from, date_time_to, location, image, link, tags");

    if (name) query = query.ilike("title", `%${name}%`);
    if (location) query = query.ilike("location", `%${location}%`);
    if (dateFrom) query = query.gte("date_time_from", dateFrom);
    if (dateTo) query = query.lte("date_time_from", dateTo);
    if (category) query = query.eq("category", category);

    const sortColumn = sortBy === "name" ? "title" : "date_time_from";

    const { data, error } = await query
      .order(sortColumn, { ascending: sortDir === "asc" })
      .range(offset, offset + PAGE_SIZE);

    if (error) {
      throw new InternalServer(error.message);
    }

    const events = data ?? [];
    const hasMore = events.length > PAGE_SIZE;
    const page = hasMore ? events.slice(0, PAGE_SIZE) : events;

    const eventsWithImageUrls = page.map((event) => ({
      ...event,
      image: event.image
        ? db.storage.from("event-images").getPublicUrl(event.image).data.publicUrl
        : null,
    }));

    return {
      code: 200 as const,
      events: eventsWithImageUrls,
      nextCursor: hasMore ? String(offset + PAGE_SIZE) : null,
    };
  },
});
