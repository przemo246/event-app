import type { EventCategory } from "@/shared/event-category/domain/models";

export type SearchFilters = {
  name: string;
  dateFrom: string | null;
  dateTo: string | null;
  location: string;
  category: EventCategory | null;
};

export type PromotedEvent = {
  id: string;
  title: string;
  dateLabel: string;
  location: string;
  category: EventCategory;
};
