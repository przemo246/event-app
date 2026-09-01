import type { EventCategory } from "../domain/models";

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  music_entertainment: "Muzyka i rozrywka",
  business_professional: "Biznes i profesjonaliści",
  food_drink: "Jedzenie i napoje",
  sports_wellness: "Sport i zdrowie",
  arts_culture: "Sztuka i kultura",
  community_hobbies: "Społeczność i hobby",
};

export const EVENT_CATEGORY_OPTIONS = (
  Object.keys(EVENT_CATEGORY_LABELS) as EventCategory[]
).map((value) => ({ value, label: EVENT_CATEGORY_LABELS[value] }));
