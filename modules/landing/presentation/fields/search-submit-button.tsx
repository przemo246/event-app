"use client";

import { Search } from "lucide-react";

import { Button } from "@/libs/ui/button";

type SearchSubmitButtonProps = {
  onPress: () => void;
  isDisabled?: boolean;
};

export const SearchSubmitButton = ({
  onPress,
  isDisabled,
}: SearchSubmitButtonProps) => {
  return (
    <Button
      onPress={onPress}
      isDisabled={isDisabled}
      className="w-full self-end py-3"
    >
      <Search className="size-4" />
      Wyszukaj
    </Button>
  );
};
