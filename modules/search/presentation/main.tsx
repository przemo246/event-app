"use client";

import { Suspense } from "react";

import { Spinner } from "@/libs/ui/spinner";
import { SearchPage } from "./search-page";

export const Main = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        Wyszukaj wydarzenia
      </h1>
      <Suspense fallback={<Spinner />}>
        <SearchPage />
      </Suspense>
    </div>
  );
};
