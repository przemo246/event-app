import { User } from "lucide-react";

import { ButtonLink } from "@/libs/ui/button";
import { createClient } from "@/libs/supabase/server";

export const AccountLink = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const href = data?.claims ? "/account" : "/auth/login";

  return (
    <ButtonLink href={href} variant="ghost" className="h-10 text-sm px-3">
      <User className="size-5" />
      Moje konto
    </ButtonLink>
  );
};
