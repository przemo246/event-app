import { getProfile } from "@/server/application/procedures/get-profile";
import { updateProfile } from "@/server/application/procedures/update-profile";
import { nextAdapter } from "@/server/application/adapter/next";

export const GET = nextAdapter(getProfile);
export const POST = nextAdapter(updateProfile);
