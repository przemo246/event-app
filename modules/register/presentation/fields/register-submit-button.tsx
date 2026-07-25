"use client";

import { Button } from "@/libs/ui/button";

type RegisterSubmitButtonProps = {
  isDisabled?: boolean;
  onPress: () => void;
};

export const RegisterSubmitButton = ({
  isDisabled,
  onPress,
}: RegisterSubmitButtonProps) => {
  return (
    <Button
      onPress={onPress}
      isDisabled={isDisabled}
      className="w-full bg-primary text-primary-foreground hover:opacity-90"
    >
      Zarejestruj się
    </Button>
  );
};
