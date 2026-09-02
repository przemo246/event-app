import { EVENT_CATEGORY_LABELS } from "@/shared/event-category/configuration/event-category-labels";
import type { EventCategory } from "@/shared/event-category/domain/models";
import { formatEventDateLabel } from "@/shared/event-card/configuration/format-event-date-label";
import type { SearchEvent, SearchResults } from "../domain/models";

type EventDto = {
  id: string;
  title: string;
  category: string;
  date_time_from: string;
  date_time_to: string | null;
  location: string;
  image: string | null;
  link: string | null;
  tags: string[] | null;
};

type SearchResultsDto = {
  events: EventDto[];
  nextCursor: string | null;
};

const mapEventDto = (dto: EventDto): SearchEvent => ({
  id: dto.id,
  title: dto.title,
  category: dto.category as EventCategory,
  dateTimeFrom: dto.date_time_from,
  dateTimeTo: dto.date_time_to,
  location: dto.location,
  image: dto.image,
  link: dto.link,
  tags: dto.tags ?? [],
});

export const mapSearchResultsDto = (dto: SearchResultsDto): SearchResults => ({
  events: dto.events.map(mapEventDto),
  nextCursor: dto.nextCursor,
});

export const toEventCardProps = (event: SearchEvent) => ({
  title: event.title,
  dateLabel: formatEventDateLabel(event.dateTimeFrom, event.dateTimeTo),
  location: event.location,
  categoryLabel: EVENT_CATEGORY_LABELS[event.category],
  imageUrl: event.image,
});
