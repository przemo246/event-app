"use client";

import { useEffect } from "react";
import { Spinner } from "@/libs/ui/spinner";
import { useContext } from "./context";
import { UserProfileDetailsForm } from "./user-profile-details-form";
import { PasswordChangeForm } from "./password-change-form";
import { DeleteAccountSection } from "./delete-account-section";

export const Main = () => {
  const ctx = useContext();

  const isUserProfileLoading = ctx.useIsUserProfileLoading();

  useEffect(() => {
    ctx.loadUserProfile();
  }, [ctx]);

  return (
    <div className="mx-auto w-full max-w-130 px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        Ustawienia konta
      </h1>
      {isUserProfileLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              Dane konta
            </h2>
            <UserProfileDetailsForm />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              Zmiana hasła
            </h2>
            <PasswordChangeForm />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-destructive">
              Usuwanie konta
            </h2>
            <DeleteAccountSection />
          </section>
        </div>
      )}
    </div>
  );
};
