"use client";

import { TextField } from "@/libs/ui/text-field";
import type { LocationSuggestion } from "../../domain/models";

export type LocationFieldProps = {
  value: string;
  onChange: (value: string) => void;
  suggestions: LocationSuggestion[];
  onSelectSuggestion: (suggestion: LocationSuggestion) => void;
  errorMessage?: string;
};

export const LocationField = ({
  value,
  onChange,
  suggestions,
  onSelectSuggestion,
  errorMessage,
}: LocationFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <TextField
        label="Lokalizacja"
        showLabel
        value={value}
        onChange={onChange}
        placeholder="Wpisz adres lub miejsce"
      />
      {suggestions.length > 0 ? (
        <ul className="flex flex-col gap-1 rounded-md border border-border bg-card p-1 shadow-sm">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button
                type="button"
                onClick={() => onSelectSuggestion(suggestion)}
                className="w-full rounded-sm px-3 py-2 text-left text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
    </div>
  );
};
