"use client";

import { I18nProvider } from "react-aria-components";
import type { ReactNode } from "react";

type LocaleProviderProps = {
  children: ReactNode;
};

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  return <I18nProvider locale="pl-PL">{children}</I18nProvider>;
};
