import type { PromotedEvent } from "../domain/models";

export const MOCK_PROMOTED_EVENTS: PromotedEvent[] = [
  {
    id: "1",
    title: "Letni Festiwal Muzyczny Open'er",
    dateLabel: "3-6 lipca 2026",
    location: "Gdynia",
    category: "music_entertainment",
  },
  {
    id: "2",
    title: "Konferencja Branży IT: Code Europe",
    dateLabel: "12 sierpnia 2026",
    location: "Warszawa",
    category: "business_professional",
  },
  {
    id: "3",
    title: "Festiwal Smaków Ulicznych",
    dateLabel: "20 lipca 2026",
    location: "Kraków",
    category: "food_drink",
  },
  {
    id: "4",
    title: "Bieg Uliczny Wrocław Night Run",
    dateLabel: "15 sierpnia 2026",
    location: "Wrocław",
    category: "sports_wellness",
  },
];
