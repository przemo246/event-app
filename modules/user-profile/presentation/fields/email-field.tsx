"use client";

import { TextField } from "@/libs/ui/text-field";

type EmailFieldProps = {
  value: string;
};

export const EmailField = ({ value }: EmailFieldProps) => {
  return (
    <TextField
      label="E-mail"
      type="email"
      autoComplete="email"
      showLabel
      value={value}
      onChange={() => {}}
      isReadOnly
    />
  );
};
