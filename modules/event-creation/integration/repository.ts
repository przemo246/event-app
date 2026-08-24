import type { CreateEventPayload, LocationSuggestion } from "../domain/models";

export const fetchTagSuggestions = async (query: string): Promise<string[]> => {
  const response = await fetch(
    `/api/events/tag-suggestions?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tag suggestions.");
  }

  const { tags } = (await response.json()) as { tags: string[] };
  return tags;
};

export const geocodeLocation = async (
  query: string,
): Promise<LocationSuggestion[]> => {
  const response = await fetch(
    `/api/events/geocode?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search location.");
  }

  const { suggestions } = (await response.json()) as {
    suggestions: LocationSuggestion[];
  };
  return suggestions;
};

export const createEvent = async (payload: CreateEventPayload): Promise<void> => {
  const formData = new FormData();
  formData.set("title", payload.title);
  formData.set("description", payload.description);
  formData.set("dateTimeFrom", payload.dateTimeFrom);
  if (payload.dateTimeTo) formData.set("dateTimeTo", payload.dateTimeTo);
  formData.set("location", payload.location);
  formData.set("category", payload.category);
  formData.set("link", payload.link);
  formData.set("tags", JSON.stringify(payload.tags));
  if (payload.image) formData.set("image", payload.image);

  const response = await fetch("/api/events", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create event.");
  }
};
