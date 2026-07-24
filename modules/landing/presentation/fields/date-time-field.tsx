"use client";

import { DatePickerField } from "@/libs/ui/date-picker";

type DateTimeFieldProps = {
  label: string;
  prefix: string;
  value: string | null;
  onChange: (value: string | null) => void;
  errorMessage?: string | null;
};

export const DateTimeField = (props: DateTimeFieldProps) => {
  return <DatePickerField {...props} />;
};
