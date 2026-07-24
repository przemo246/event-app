import { ButtonLink } from "@/libs/ui/button";
import { ThemeToggle } from "@/shared/theme-toggle/theme-toggle";

const NAV_LINKS = [
  { href: "/search", label: "Wydarzenia" },
  { href: "/#categories", label: "Kategorie" },
  { href: "/#cities", label: "Miasta" },
];

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
          <ButtonLink href="/login">Zaloguj się</ButtonLink>
          <ButtonLink href="/add-event" variant="ghost" className="h-10">
            Dodaj wydarzenie
          </ButtonLink>
        </div>
      </div>
    </header>
  );
};
