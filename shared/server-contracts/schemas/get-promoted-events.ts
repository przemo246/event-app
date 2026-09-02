import z from "zod";

const categorySchema = z.enum([
  "music_entertainment",
  "business_professional",
  "food_drink",
  "sports_wellness",
  "arts_culture",
  "community_hobbies",
]);

const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: categorySchema,
  date_time_from: z.string(),
  date_time_to: z.string().nullable(),
  location: z.string(),
  image: z.string().nullable(),
});

export const schema = () =>
  z.object({
    in: z.object({}),
    out: z.union([
      z.object({
        code: z.literal(200),
        events: z.array(eventSchema),
      }),
      z.object({
        code: z.literal(500),
        type: z.literal("internal-server"),
        message: z.string(),
      }),
    ]),
  });

export type Schema = z.infer<ReturnType<typeof schema>>;
