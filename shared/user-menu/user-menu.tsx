import { ButtonLink } from "@/libs/ui/button";
import { createClient } from "@/libs/supabase/server";
import { UserMenuDropdown } from "./user-menu-dropdown";

export const UserMenuFallback = () => (
  <ButtonLink href="/auth/login" variant="solid" className="h-10 font-bold">
    Zaloguj się
  </ButtonLink>
);

export const UserMenu = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    return <UserMenuFallback />;
  }

  return (
    <>
      <UserMenuDropdown />
      <ButtonLink href="/add-event" variant="outline" className="h-10 font-bold">
        Dodaj wydarzenie
      </ButtonLink>
    </>
  );
};
