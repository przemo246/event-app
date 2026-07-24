const pad = (value: number) => String(value).padStart(2, "0");

const toDateTimeString = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;

const startOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const endOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(23, 59, 0, 0);
  return copy;
};

const addDays = (date: Date, days: number) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

const isoWeekday = (date: Date) => ((date.getDay() + 6) % 7) + 1;

const mondayOfWeek = (date: Date) => addDays(date, -(isoWeekday(date) - 1));

const saturdayOfWeek = (date: Date) => addDays(mondayOfWeek(date), 5);

type DateRange = { from: string; to: string };

const toRange = (from: Date, to: Date): DateRange => ({
  from: toDateTimeString(startOfDay(from)),
  to: toDateTimeString(endOfDay(to)),
});

export type QuickDateRange = {
  label: string;
  getRange: () => DateRange;
};

export const QUICK_DATE_RANGES: QuickDateRange[] = [
  {
    label: "Dziś",
    getRange: () => {
      const today = new Date();
      return toRange(today, today);
    },
  },
  {
    label: "Jutro",
    getRange: () => {
      const tomorrow = addDays(new Date(), 1);
      return toRange(tomorrow, tomorrow);
    },
  },
  {
    label: "Ten tydzień",
    getRange: () => {
      const today = new Date();
      return toRange(today, addDays(mondayOfWeek(today), 6));
    },
  },
  {
    label: "Ten weekend",
    getRange: () => {
      const saturday = saturdayOfWeek(new Date());
      return toRange(saturday, addDays(saturday, 1));
    },
  },
  {
    label: "Następny weekend",
    getRange: () => {
      const nextSaturday = addDays(saturdayOfWeek(new Date()), 7);
      return toRange(nextSaturday, addDays(nextSaturday, 1));
    },
  },
];
