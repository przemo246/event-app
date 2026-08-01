import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export const PageShell = ({ children }: PageShellProps) => {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        Ustawienia konta
      </h1>
      {children}
    </div>
  );
};
