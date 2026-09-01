import type { EventCategory } from "@/shared/event-category/domain/models";

export type { EventCategory };

export type EventFormValues = {
  title: string;
  description: string;
  dateTimeFrom: string | null;
  dateTimeTo: string | null;
  location: string;
  image: File | null;
  category: EventCategory | "";
  link: string;
  tags: string[];
};

export type CreateEventPayload = {
  title: string;
  description: string;
  dateTimeFrom: string;
  dateTimeTo: string | null;
  location: string;
  image: File | null;
  category: EventCategory;
  link: string;
  tags: string[];
};

export type LocationSuggestion = {
  id: string;
  label: string;
};
