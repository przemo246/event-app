"use client";

import { TextField } from "@/libs/ui/text-field";
import { useContext } from "../context";

export const SearchBar = () => {
  const ctx = useContext();
  const name = ctx.useName();

  return (
    <TextField
      label="Nazwa"
      value={name}
      onChange={ctx.setName}
      placeholder="Nazwa"
    />
  );
};
