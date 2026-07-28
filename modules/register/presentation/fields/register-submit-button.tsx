"use client";

import { Button } from "@/libs/ui/button";

type RegisterSubmitButtonProps = {
  isDisabled?: boolean;
};

export const RegisterSubmitButton = ({
  isDisabled,
}: RegisterSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      isDisabled={isDisabled}
      className="w-full bg-primary text-primary-foreground hover:opacity-90"
    >
      Zarejestruj się
    </Button>
  );
};
