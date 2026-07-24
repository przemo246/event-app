import type { Brand } from "@/libs/type-beast/brand";

export type CategoryValue = Brand<string, "CategoryValue">;

export type CategoryOption = {
  value: CategoryValue;
  label: string;
};

export type SearchFilters = {
  name: string;
  dateFrom: string | null;
  dateTo: string | null;
  location: string;
  category: CategoryValue | null;
};

export type PromotedEvent = {
  id: string;
  title: string;
  dateLabel: string;
  location: string;
  category: CategoryValue;
};
