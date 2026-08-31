"use client";

import { Suspense } from "react";

import { Spinner } from "@/libs/ui/spinner";
import { EventCreationForm } from "./event-creation-form";

export const Main = () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        Nowe wydarzenie
      </h1>
      <Suspense fallback={<Spinner />}>
        <div className="flex flex-col gap-6">
          <EventCreationForm />
        </div>
      </Suspense>
    </div>
  );
};
