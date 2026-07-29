"use client";

import { Button } from "@/libs/ui/button";
import { useContext } from "./context";
import { UsernameField } from "./fields/username-field";
import { EmailField } from "./fields/email-field";

export const AccountDetailsForm = () => {
  const ctx = useContext();

  const username = ctx.useUsername();
  const email = ctx.useEmail();
  const error = ctx.useDetailsError();
  const isSaving = ctx.useIsSavingDetails();
  const isValid = ctx.useIsAccountDetailsValid();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        ctx.saveAccountDetails();
      }}
    >
      <UsernameField value={username} onChange={ctx.setUsername} />
      <EmailField value={email} />

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button
        type="submit"
        isDisabled={!isValid || isSaving}
        className="w-fit"
      >
        Zapisz zmiany
      </Button>
    </form>
  );
};
