"use client";

import { TextField } from "@/libs/ui/text-field";

type EmailFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const EmailField = ({ value, onChange }: EmailFieldProps) => {
  return (
    <TextField
      label="E-mail"
      type="email"
      autoComplete="email"
      showLabel
      value={value}
      onChange={onChange}
    />
  );
};
