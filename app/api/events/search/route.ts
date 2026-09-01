import { searchEvents } from "@/server/application/procedures/search-events";
import { nextAdapter } from "@/server/application/adapter/next";

export const GET = nextAdapter(searchEvents);
