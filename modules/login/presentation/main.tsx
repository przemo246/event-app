"use client";

import type { ReactNode } from "react";
import { useContext } from "./context";
import { SocialSignInButtons } from "./social-sign-in-buttons";
import { ForgotPasswordLink } from "./forgot-password-link";
import { EmailField } from "./fields/email-field";
import { PasswordField } from "./fields/password-field";
import { LoginSubmitButton } from "./fields/login-submit-button";

type MainProps = {
  tabs: ReactNode;
};

export const Main = ({ tabs }: MainProps) => {
  const facade = useContext();

  const email = facade.useEmail();
  const password = facade.usePassword();
  const error = facade.useError();
  const isSubmitting = facade.useIsSubmitting();
  const isFormValid = facade.useIsFormValid();

  return (
    <>
      <SocialSignInButtons />

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Lub
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {tabs}

      <div className="mt-6 flex flex-col gap-4">
        <EmailField value={email} onChange={facade.setEmail} />
        <PasswordField value={password} onChange={facade.setPassword} />

        <ForgotPasswordLink />

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <LoginSubmitButton
          onPress={facade.submit}
          isDisabled={!isFormValid || isSubmitting}
        />
      </div>
    </>
  );
};
