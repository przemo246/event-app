"use client";

import { Button } from "@/libs/ui/button";

type LoginSubmitButtonProps = {
  isDisabled?: boolean;
  onPress: () => void;
};

export const LoginSubmitButton = ({
  isDisabled,
  onPress,
}: LoginSubmitButtonProps) => {
  return (
    <Button
      onPress={onPress}
      isDisabled={isDisabled}
      className="w-full bg-primary text-primary-foreground hover:opacity-90"
    >
      Zaloguj się
    </Button>
  );
};
