import type { PromotedEvent } from "../domain/models";
import { mapPromotedEventDto } from "./mappers";

export const fetchPromotedEvents = async (): Promise<PromotedEvent[]> => {
  const response = await fetch("/api/events/promoted");

  if (!response.ok) {
    throw new Error("Failed to load promoted events.");
  }

  const { events } = await response.json();

  return events.map(mapPromotedEventDto);
};
