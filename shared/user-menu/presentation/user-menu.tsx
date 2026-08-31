import { ButtonLink } from "@/libs/ui/button";
import { supabaseServer } from "@/libs/supabase/server";
import { UserMenuDropdown } from "./user-menu-dropdown";
import { FavoriteEventsLink } from "./favorite-events-link";

export const UserMenuFallback = () => (
  <ButtonLink href="/login" variant="solid" className="h-10 font-bold">
    Zaloguj się
  </ButtonLink>
);

export const UserMenu = async () => {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    return <UserMenuFallback />;
  }

  return (
    <>
      <FavoriteEventsLink />
      <UserMenuDropdown />
      <ButtonLink
        href="/events/new"
        variant="outline"
        className="h-10 font-bold"
      >
        Dodaj wydarzenie
      </ButtonLink>
    </>
  );
};
