import { ButtonLink } from "@/libs/ui/button";

const NotFound = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
        Nie znaleziono strony
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Strona, której szukasz, nie istnieje lub została przeniesiona.
      </p>
      <ButtonLink href="/" variant="solid" className="mt-8">
        Wróć na stronę główną
      </ButtonLink>
    </div>
  );
};

export default NotFound;
