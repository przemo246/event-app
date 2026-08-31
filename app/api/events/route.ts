import { createEvent } from "@/server/application/procedures/create-event";
import { nextAdapter } from "@/server/application/adapter/next";

export const POST = nextAdapter(createEvent);
