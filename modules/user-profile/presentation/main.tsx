"use client";

import { useEffect } from "react";
import { Spinner } from "@/libs/ui/spinner";
import { useContext } from "./context";
import { AccountDetailsForm } from "./account-details-form";
import { PasswordChangeForm } from "./password-change-form";
import { DeleteAccountSection } from "./delete-account-section";

export const Main = () => {
  const ctx = useContext();

  const isAccountLoading = ctx.useIsAccountLoading();

  useEffect(() => {
    ctx.loadAccount();
  }, [ctx]);

  if (isAccountLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Dane konta</h2>
        <AccountDetailsForm />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Zmiana hasła</h2>
        <PasswordChangeForm />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-destructive">
          Usuwanie konta
        </h2>
        <DeleteAccountSection />
      </section>
    </div>
  );
};
