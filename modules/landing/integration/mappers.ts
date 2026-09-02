import { formatEventDateLabel } from "@/shared/event-card/configuration/format-event-date-label";
import type { EventCategory } from "@/shared/event-category/domain/models";
import type { PromotedEvent } from "../domain/models";

type PromotedEventDto = {
  id: string;
  title: string;
  category: string;
  date_time_from: string;
  date_time_to: string | null;
  location: string;
  image: string | null;
};

export const mapPromotedEventDto = (dto: PromotedEventDto): PromotedEvent => ({
  id: dto.id,
  title: dto.title,
  dateLabel: formatEventDateLabel(dto.date_time_from, dto.date_time_to),
  location: dto.location,
  category: dto.category as EventCategory,
  image: dto.image,
});
