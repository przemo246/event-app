"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/libs/ui/button";
import { TextField } from "@/libs/ui/text-field";

type CurrentPasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const CurrentPasswordField = ({
  value,
  onChange,
}: CurrentPasswordFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      label="Obecne hasło"
      type={isVisible ? "text" : "password"}
      autoComplete="current-password"
      showLabel
      value={value}
      onChange={onChange}
      endAdornment={
        <Button
          aria-label={isVisible ? "Ukryj hasło" : "Pokaż hasło"}
          variant="ghost"
          onPress={() => setIsVisible((prev) => !prev)}
          className="min-h-0 shrink-0 border-0 p-1"
        >
          {isVisible ? (
            <EyeOff className="size-4 text-muted-foreground" />
          ) : (
            <Eye className="size-4 text-muted-foreground" />
          )}
        </Button>
      }
    />
  );
};
