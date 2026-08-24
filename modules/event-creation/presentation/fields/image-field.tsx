"use client";

import { ImageField as ImageFieldPrimitive } from "@/libs/ui/image-field";

export type ImageFieldProps = {
  value: File | null;
  onChange: (value: File | null) => void;
};

export const ImageField = ({ value, onChange }: ImageFieldProps) => {
  return (
    <ImageFieldPrimitive label="Zdjęcie wydarzenia" value={value} onChange={onChange} />
  );
};
