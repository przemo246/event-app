import { Suspense } from "react";

import { ButtonLink } from "@/libs/ui/button";
import { ThemeToggle } from "@/shared/theme-toggle/theme-toggle";
import { UserMenu, UserMenuFallback } from "@/shared/user-menu/user-menu";
import { NavBarHeader } from "@/shared/nav-bar/nav-bar-header";

const NAV_LINKS: { href: string; label: string }[] = [];

export const NavBar = () => {
  return (
    <NavBarHeader>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <ButtonLink
          href="/"
          className="text-xl font-bold text-primary hover:no-underline"
        >
          afisz
        </ButtonLink>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary"
            >
              {link.label}
            </ButtonLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Suspense fallback={<UserMenuFallback />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </NavBarHeader>
  );
};
