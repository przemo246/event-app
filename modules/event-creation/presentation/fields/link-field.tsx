"use client";

import { TextField } from "@/libs/ui/text-field";

export type LinkFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const LinkField = ({ value, onChange }: LinkFieldProps) => {
  return (
    <TextField
      label="Link"
      showLabel
      value={value}
      onChange={onChange}
      placeholder="https://..."
    />
  );
};
