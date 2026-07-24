import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "O afisz",
    links: ["O nas", "Jak to działa", "Kontakt"],
  },
  {
    title: "Dla organizatorów",
    links: ["Dodaj wydarzenie", "Cennik promocji", "Pomoc dla organizatorów"],
  },
  {
    title: "Pomoc",
    links: ["Centrum pomocy", "Regulamin", "Polityka prywatności"],
  },
];

export const SiteFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <span className="text-xl font-bold">afisz</span>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/60">
          © 2026 afisz. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
};
