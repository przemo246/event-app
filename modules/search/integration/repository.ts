import type { SearchFilters, SearchResults } from "../domain/models";
import { mapSearchResultsDto } from "./mappers";

export const searchEvents = async (
  filters: SearchFilters,
  cursor: string | null,
  signal: AbortSignal,
): Promise<SearchResults> => {
  const params = new URLSearchParams();

  if (filters.name) params.set("name", filters.name);
  if (filters.location) params.set("location", filters.location);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  if (filters.category) params.set("category", filters.category);
  params.set("sortBy", filters.sortBy);
  params.set("sortDir", filters.sortDir);
  if (cursor) params.set("cursor", cursor);

  const response = await fetch(`/api/events/search?${params.toString()}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to search events.");
  }

  return mapSearchResultsDto(await response.json());
};
