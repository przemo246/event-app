"use client";

import { useEffect, useState } from "react";
import { FileTrigger } from "react-aria-components";

import { cn } from "@/libs/react-kit/cn";
import { Button } from "@/libs/ui/button";

export type ImageFieldProps = {
  label: string;
  value: File | null;
  onChange: (value: File | null) => void;
  className?: string;
};

export const ImageField = ({ label, value, onChange, className }: ImageFieldProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [value]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt=""
          className="h-40 w-full rounded-md border border-border object-cover"
        />
      ) : null}
      <div className="flex items-center gap-2">
        <FileTrigger
          acceptedFileTypes={["image/*"]}
          onSelect={(files) => onChange(files?.[0] ?? null)}
        >
          <Button type="button" variant="outline">
            {value ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
          </Button>
        </FileTrigger>
        {value ? (
          <Button type="button" variant="ghost" onPress={() => onChange(null)}>
            Usuń
          </Button>
        ) : null}
      </div>
    </div>
  );
};
