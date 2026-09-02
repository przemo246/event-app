"use client";

import { MapPin } from "lucide-react";

import { TextField } from "@/libs/ui/text-field";
import { useContext } from "../context";

export const LocationFilter = () => {
  const ctx = useContext();
  const location = ctx.useLocation();

  return (
    <TextField
      label="Lokalizacja"
      value={location}
      onChange={ctx.setLocation}
      placeholder="Lokalizacja"
      icon={<MapPin className="size-4 shrink-0 text-muted-foreground" />}
    />
  );
};
