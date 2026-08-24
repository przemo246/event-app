export const VALIDATION_ERROR_MAP = {
  titleRequired: "Podaj tytuł wydarzenia.",
  categoryRequired: "Wybierz kategorię.",
  descriptionRequired: "Podaj opis wydarzenia.",
  dateTimeFromRequired: "Podaj datę i godzinę rozpoczęcia.",
  locationRequired: "Podaj lokalizację.",
  dateRangeInvalid:
    "Data i godzina zakończenia muszą być późniejsze niż rozpoczęcia.",
  submitEventFailed: "Nie udało się utworzyć wydarzenia. Spróbuj ponownie.",
} as const;

export const isDateRangeValid = (
  dateTimeFrom: string | null,
  dateTimeTo: string | null,
) => {
  if (!dateTimeFrom || !dateTimeTo) return true;
  return dateTimeFrom < dateTimeTo;
};
