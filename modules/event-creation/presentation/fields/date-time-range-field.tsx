"use client";

import { DatePickerField } from "@/libs/ui/date-picker";

export type DateTimeRangeFieldProps = {
  from: string | null;
  to: string | null;
  onFromChange: (value: string | null) => void;
  onToChange: (value: string | null) => void;
  fromErrorMessage?: string;
  toErrorMessage?: string;
};

export const DateTimeRangeField = ({
  from,
  to,
  onFromChange,
  onToChange,
  fromErrorMessage,
  toErrorMessage,
}: DateTimeRangeFieldProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <DatePickerField
        label="Data i godzina rozpoczęcia"
        prefix="Od"
        value={from}
        onChange={onFromChange}
        errorMessage={fromErrorMessage}
      />
      <DatePickerField
        label="Data i godzina zakończenia"
        prefix="Do"
        value={to}
        onChange={onToChange}
        errorMessage={toErrorMessage}
      />
    </div>
  );
};
