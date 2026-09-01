"use client";

import { TextField } from "@/libs/ui/text-field";
import { useContext } from "../context";

export const SearchBar = () => {
  const ctx = useContext();
  const name = ctx.useName();

  return (
    <TextField
      label="Nazwa wydarzenia"
      value={name}
      onChange={ctx.setName}
      placeholder="Szukaj po nazwie wydarzenia..."
    />
  );
};
