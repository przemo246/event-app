import { schema } from "@/shared/server-contracts/schemas/create-event";
import { InternalServer } from "../../core/error-handling";
import { withZodSchema } from "../../adapter/zod";
import { privateProcedure } from "../../core/procedure";

export const createEvent = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (
    { title, description, dateTimeFrom, dateTimeTo, location, category, link, tags, image },
    { db, user },
  ) => {
    const { data: event, error: insertError } = await db
      .from("events")
      .insert({
        user_id: user.id,
        title,
        description,
        date_time_from: dateTimeFrom,
        date_time_to: dateTimeTo || null,
        location,
        category,
        link: link || null,
        tags,
      })
      .select("id")
      .single();

    if (insertError || !event) {
      throw new InternalServer(insertError?.message);
    }

    if (image) {
      const path = `${user.id}/${event.id}/${image.name}`;

      const { error: uploadError } = await db.storage
        .from("event-images")
        .upload(path, image, { contentType: image.type });

      if (uploadError) {
        throw new InternalServer(uploadError.message);
      }

      const { error: updateError } = await db
        .from("events")
        .update({ image: path })
        .eq("id", event.id);

      if (updateError) {
        throw new InternalServer(updateError.message);
      }
    }

    return { code: 200 };
  },
});
