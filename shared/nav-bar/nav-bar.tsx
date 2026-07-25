import { User } from "lucide-react";
import { Suspense } from "react";

import { ButtonLink } from "@/libs/ui/button";
import { ThemeToggle } from "@/shared/theme-toggle/theme-toggle";
import { AccountLink } from "./account-link";

const NAV_LINKS = [
  { href: "/search", label: "Wydarzenia" },
  { href: "/#categories", label: "Kategorie" },
  { href: "/#cities", label: "Miasta" },
];

const AccountLinkFallback = () => (
  <ButtonLink href="/auth/login" variant="ghost" className="h-10 text-sm px-3">
    <User className="size-5" />
    Moje konto
  </ButtonLink>
);

export const NavBar = () => {
  return (
    <header className="bg-background">
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
          <Suspense fallback={<AccountLinkFallback />}>
            <AccountLink />
          </Suspense>
          <ButtonLink
            href="/add-event"
            variant="outline"
            className="h-10 font-bold"
          >
            Dodaj wydarzenie
          </ButtonLink>
        </div>
      </div>
    </header>
  );
};
