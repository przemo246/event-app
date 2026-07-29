"use client";

import { Button } from "@/libs/ui/button";
import { useContext } from "./context";
import { CurrentPasswordField } from "./fields/current-password-field";
import { NewPasswordField } from "./fields/new-password-field";

export const PasswordChangeForm = () => {
  const ctx = useContext();

  const currentPassword = ctx.useCurrentPassword();
  const newPassword = ctx.useNewPassword();
  const error = ctx.usePasswordError();
  const isChanging = ctx.useIsChangingPassword();
  const isValid = ctx.useIsPasswordChangeValid();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        ctx.changePassword();
      }}
    >
      <CurrentPasswordField
        value={currentPassword}
        onChange={ctx.setCurrentPassword}
      />
      <NewPasswordField value={newPassword} onChange={ctx.setNewPassword} />

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button
        type="submit"
        isDisabled={!isValid || isChanging}
        className="w-fit"
      >
        Zmień hasło
      </Button>
    </form>
  );
};
