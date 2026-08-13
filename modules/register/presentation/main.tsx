"use client";

import { AuthModeTabs } from "@/shared/auth-mode-tabs/presentation/auth-mode-tabs";
import { useContext } from "./context";
import { SocialSignInButtons } from "./social-sign-in-buttons";
import { EmailField } from "./fields/email-field";
import { PasswordField } from "./fields/password-field";
import { RegisterSubmitButton } from "./fields/register-submit-button";

export const Main = () => {
  const ctx = useContext();

  const email = ctx.useEmail();
  const password = ctx.usePassword();
  const error = ctx.useError();
  const isSubmitting = ctx.useIsSubmitting();
  const isFormValid = ctx.useIsFormValid();

  return (
    <div className="flex items-center justify-center px-6 py-12 min-h-full">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg sm:p-8">
        <SocialSignInButtons />

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold uppercase text-muted-foreground">
            Lub
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <AuthModeTabs />

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            ctx.submit();
          }}
        >
          <EmailField value={email} onChange={ctx.setEmail} />
          <PasswordField value={password} onChange={ctx.setPassword} />

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <RegisterSubmitButton isDisabled={!isFormValid || isSubmitting} />
        </form>
      </div>
    </div>
  );
};
