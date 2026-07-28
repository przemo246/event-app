"use client";

import { Button } from "@/libs/ui/button";

type LoginSubmitButtonProps = {
  isDisabled?: boolean;
};

export const LoginSubmitButton = ({ isDisabled }: LoginSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      isDisabled={isDisabled}
      className="w-full bg-primary text-primary-foreground hover:opacity-90"
    >
      Zaloguj się
    </Button>
  );
};
