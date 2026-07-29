"use client";

import { TextField } from "@/libs/ui/text-field";

type UsernameFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const UsernameField = ({ value, onChange }: UsernameFieldProps) => {
  return (
    <TextField
      label="Nazwa użytkownika"
      type="text"
      autoComplete="username"
      showLabel
      value={value}
      onChange={onChange}
    />
  );
};
