"use client";

import { TextField } from "@/libs/ui/text-field";

type NameFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const NameField = ({ value, onChange }: NameFieldProps) => {
  return (
    <TextField
      label="Nazwa wydarzenia"
      value={value}
      onChange={onChange}
      placeholder="Szukaj po nazwie wydarzenia..."
    />
  );
};
