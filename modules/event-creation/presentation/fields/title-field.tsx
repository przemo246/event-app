"use client";

import { TextField } from "@/libs/ui/text-field";

export type TitleFieldProps = {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
};

export const TitleField = ({ value, onChange, errorMessage }: TitleFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <TextField
        label="Tytuł wydarzenia"
        showLabel
        value={value}
        onChange={onChange}
        placeholder="Np. Koncert charytatywny"
      />
      {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
    </div>
  );
};
