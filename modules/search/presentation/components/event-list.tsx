"use client";

import { CalendarSearch } from "lucide-react";

import { Spinner } from "@/libs/ui/spinner";
import { EventCard } from "@/shared/event-card/presentation/event-card";
import { toEventCardProps } from "../../integration/mappers";
import { useContext } from "../context";

export const EventList = () => {
  const ctx = useContext();
  const status = ctx.useStatus();
  const error = ctx.useError();
  const results = ctx.useResults();

  if (status === "loading" && results.length === 0) {
    return <Spinner />;
  }

  if (status === "error" && results.length === 0) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
        <CalendarSearch className="size-8" />
        <p>Brak wydarzeń spełniających kryteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {results.map((event) => (
        <EventCard key={event.id} {...toEventCardProps(event)} />
      ))}
    </div>
  );
};
