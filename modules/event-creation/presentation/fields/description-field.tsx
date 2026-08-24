"use client";

import { TextareaField } from "@/libs/ui/textarea-field";

export type DescriptionFieldProps = {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
};

export const DescriptionField = ({
  value,
  onChange,
  errorMessage,
}: DescriptionFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <TextareaField
        label="Opis wydarzenia"
        showLabel
        value={value}
        onChange={onChange}
        placeholder="Opisz wydarzenie..."
      />
      {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
    </div>
  );
};
