import z from "zod";

const categorySchema = z.enum([
  "music_entertainment",
  "business_professional",
  "food_drink",
  "sports_wellness",
  "arts_culture",
  "community_hobbies",
]);

const tagsSchema = z
  .string()
  .optional()
  .transform((value, ctx) => {
    if (!value) return [];

    try {
      const parsed = JSON.parse(value);

      if (!Array.isArray(parsed) || !parsed.every((tag) => typeof tag === "string")) {
        throw new Error("Invalid tags format.");
      }

      return parsed as string[];
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid tags format." });
      return z.NEVER;
    }
  });

export const schema = () =>
  z.object({
    in: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      dateTimeFrom: z.string().min(1),
      dateTimeTo: z.string().optional(),
      location: z.string().min(1),
      category: categorySchema,
      link: z.string().optional(),
      tags: tagsSchema,
      image: z.instanceof(File).optional(),
    }),
    out: z.union([
      z.object({
        code: z.literal(200),
      }),
      z.object({
        code: z.literal(400),
        type: z.literal("bad-request"),
        message: z.string(),
      }),
      z.object({
        code: z.literal(401),
        type: z.literal("unauthorized"),
        message: z.string(),
      }),
      z.object({
        code: z.literal(500),
        type: z.literal("internal-server"),
        message: z.string(),
      }),
    ]),
  });

export type Schema = z.infer<ReturnType<typeof schema>>;
