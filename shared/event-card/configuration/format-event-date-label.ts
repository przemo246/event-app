const WEEKDAY_LABELS = ["Ndz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];
const MONTH_LABELS = [
  "sty",
  "lut",
  "mar",
  "kwi",
  "maj",
  "cze",
  "lip",
  "sie",
  "wrz",
  "paź",
  "lis",
  "gru",
];

const formatShortDate = (date: Date): string => `${date.getDate()} ${MONTH_LABELS[date.getMonth()]}`;

const formatTime = (date: Date): string =>
  `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

export const formatEventDateLabel = (dateTimeFrom: string, dateTimeTo: string | null): string => {
  const from = new Date(dateTimeFrom);
  const weekday = WEEKDAY_LABELS[from.getDay()];

  if (dateTimeTo) {
    return `${weekday}, ${formatShortDate(from)} – ${formatShortDate(new Date(dateTimeTo))}`;
  }

  return `${weekday}, ${formatShortDate(from)} o ${formatTime(from)}`;
};
