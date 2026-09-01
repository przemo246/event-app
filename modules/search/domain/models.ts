import type { EventCategory } from "@/shared/event-category/domain/models";

export type SortBy = "date" | "name";
export type SortDir = "asc" | "desc";

export type SearchFilters = {
  name: string;
  location: string;
  dateFrom: string | null;
  dateTo: string | null;
  category: EventCategory | null;
  sortBy: SortBy;
  sortDir: SortDir;
};

export type SearchEvent = {
  id: string;
  title: string;
  category: EventCategory;
  dateTimeFrom: string;
  dateTimeTo: string | null;
  location: string;
  image: string | null;
  link: string | null;
  tags: string[];
};

export type SearchResults = {
  events: SearchEvent[];
  nextCursor: string | null;
};
