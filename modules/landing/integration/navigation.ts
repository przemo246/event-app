import { SEARCH_RESULTS_PATH } from "../configuration/constraints";
import type { SearchFilters } from "../domain/models";

export const goToSearchResults = (filters: SearchFilters) => {
  const params = new URLSearchParams();

  if (filters.name) params.set("name", filters.name);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  if (filters.location) params.set("location", filters.location);
  if (filters.category) params.set("category", filters.category);

  const query = params.toString();
  window.location.assign(query ? `${SEARCH_RESULTS_PATH}?${query}` : SEARCH_RESULTS_PATH);
};
