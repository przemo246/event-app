"use client";

import { MapPin } from "lucide-react";

import { TextField } from "@/libs/ui/text-field";

type LocationFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const LocationField = ({ value, onChange }: LocationFieldProps) => {
  return (
    <TextField
      label="Lokalizacja"
      value={value}
      onChange={onChange}
      placeholder="Miasto lub region"
      icon={<MapPin className="size-4 shrink-0 text-muted-foreground" />}
    />
  );
};
