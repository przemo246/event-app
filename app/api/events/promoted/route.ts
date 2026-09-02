import { getPromotedEvents } from "@/server/application/procedures/get-promoted-events";
import { nextAdapter } from "@/server/application/adapter/next";

export const GET = nextAdapter(getPromotedEvents);
