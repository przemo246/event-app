"use client";

import { useController, useForm } from "react-hook-form";
import { Button } from "@/libs/ui/button";
import { useContext } from "./context";
import { CategoryField } from "./fields/category-field";
import { DateTimeRangeField } from "./fields/date-time-range-field";
import { DescriptionField } from "./fields/description-field";
import { ImageField } from "./fields/image-field";
import { LinkField } from "./fields/link-field";
import { LocationField } from "./fields/location-field";
import { TagsField } from "./fields/tags-field";
import { TitleField } from "./fields/title-field";
import { isDateRangeValid, VALIDATION_ERROR_MAP } from "../configuration/validation";
import type { EventFormValues } from "../domain/models";

const DEFAULT_VALUES: EventFormValues = {
  title: "",
  description: "",
  dateTimeFrom: null,
  dateTimeTo: null,
  location: "",
  image: null,
  category: "",
  link: "",
  tags: [],
};

export const EventCreationForm = () => {
  const ctx = useContext();
  const { control, handleSubmit, watch } = useForm<EventFormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const tagSuggestions = ctx.useTagSuggestions();
  const locationSuggestions = ctx.useLocationSuggestions();
  const isSubmitting = ctx.useIsSubmitting();
  const submitError = ctx.useSubmitError();
  const submitSuccess = ctx.useSubmitSuccess();

  const dateTimeFrom = watch("dateTimeFrom");

  const title = useController({
    name: "title",
    control,
    rules: { required: VALIDATION_ERROR_MAP.titleRequired },
  });
  const category = useController({
    name: "category",
    control,
    rules: { required: VALIDATION_ERROR_MAP.categoryRequired },
  });
  const description = useController({
    name: "description",
    control,
    rules: { required: VALIDATION_ERROR_MAP.descriptionRequired },
  });
  const dateTimeFromField = useController({
    name: "dateTimeFrom",
    control,
    rules: { required: VALIDATION_ERROR_MAP.dateTimeFromRequired },
  });
  const dateTimeToField = useController({
    name: "dateTimeTo",
    control,
    rules: {
      validate: (value) =>
        isDateRangeValid(dateTimeFrom, value) || VALIDATION_ERROR_MAP.dateRangeInvalid,
    },
  });
  const location = useController({
    name: "location",
    control,
    rules: { required: VALIDATION_ERROR_MAP.locationRequired },
  });
  const image = useController({ name: "image", control });
  const link = useController({ name: "link", control });
  const tags = useController({ name: "tags", control });

  const onSubmit = handleSubmit((values) => {
    if (values.category === "") return;

    ctx.submitEvent({
      title: values.title,
      description: values.description,
      dateTimeFrom: values.dateTimeFrom as string,
      dateTimeTo: values.dateTimeTo,
      location: values.location,
      image: values.image,
      category: values.category,
      link: values.link,
      tags: values.tags,
    });
  });

  if (submitSuccess) {
    return (
      <p className="text-sm text-foreground">Wydarzenie zostało utworzone.</p>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <TitleField
        value={title.field.value}
        onChange={title.field.onChange}
        errorMessage={title.fieldState.error?.message}
      />

      <CategoryField
        value={category.field.value}
        onChange={category.field.onChange}
        errorMessage={category.fieldState.error?.message}
      />

      <DescriptionField
        value={description.field.value}
        onChange={description.field.onChange}
        errorMessage={description.fieldState.error?.message}
      />

      <DateTimeRangeField
        from={dateTimeFromField.field.value}
        to={dateTimeToField.field.value}
        onFromChange={dateTimeFromField.field.onChange}
        onToChange={dateTimeToField.field.onChange}
        fromErrorMessage={dateTimeFromField.fieldState.error?.message}
        toErrorMessage={dateTimeToField.fieldState.error?.message}
      />

      <LocationField
        value={location.field.value}
        onChange={(value) => {
          location.field.onChange(value);
          ctx.searchLocation(value);
        }}
        suggestions={locationSuggestions}
        onSelectSuggestion={(suggestion) => {
          location.field.onChange(suggestion.label);
          ctx.clearLocationSuggestions();
        }}
        errorMessage={location.fieldState.error?.message}
      />

      <ImageField value={image.field.value} onChange={image.field.onChange} />

      <LinkField value={link.field.value} onChange={link.field.onChange} />

      <TagsField
        value={tags.field.value}
        onChange={tags.field.onChange}
        suggestions={tagSuggestions}
        onQueryChange={ctx.requestTagSuggestions}
      />

      {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

      <Button type="submit" isDisabled={isSubmitting} className="w-fit">
        Utwórz wydarzenie
      </Button>
    </form>
  );
};
