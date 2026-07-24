export const VALIDATION_ERROR_MAP = {
  dateRange: 'Data "do" nie może być wcześniejsza niż data "od"',
} as const;

export const isDateRangeValid = (
  dateFrom: string | null,
  dateTo: string | null,
) => {
  if (!dateFrom || !dateTo) return true;

  return new Date(dateTo).getTime() >= new Date(dateFrom).getTime();
};
